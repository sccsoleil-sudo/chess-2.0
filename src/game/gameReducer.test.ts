import { describe, expect, it } from 'vitest';
import { Chess } from 'chess.js';
import { attemptMove, createInitialGameState, undoGameState } from './gameReducer';
import { getCapturedPieces } from './presentation';

describe('game reducer', () => {
  it('commits legal moves into state history', () => {
    const state = createInitialGameState();
    const attempt = attemptMove(state, { from: 'e2', to: 'e4' });

    expect(attempt.blockedReason).toBeUndefined();
    expect(attempt.move?.san).toBe('e4');
    expect(attempt.state.moveHistory).toHaveLength(1);
    expect(attempt.state.past).toHaveLength(1);
    expect(new Chess(attempt.state.fen).get('e4')).toMatchObject({ color: 'w', type: 'p' });
  });

  it('rejects illegal moves without mutating state', () => {
    const state = createInitialGameState();
    const attempt = attemptMove(state, { from: 'e2', to: 'e5' });

    expect(attempt.move).toBeNull();
    expect(attempt.blockedReason).toBe('Illegal move.');
    expect(attempt.state).toBe(state);
  });

  it('tracks captures independently from FEN history', () => {
    const afterE4 = attemptMove(createInitialGameState(), { from: 'e2', to: 'e4' }).state;
    const afterD5 = attemptMove(afterE4, { from: 'd7', to: 'd5' }).state;
    const afterCapture = attemptMove(afterD5, { from: 'e4', to: 'd5' }).state;

    expect(afterCapture.moveHistory.at(-1)?.captured).toBe('p');
    expect(getCapturedPieces(afterCapture.moveHistory).w).toEqual([{ color: 'b', type: 'p' }]);
  });

  it('undoes to the previous snapshot', () => {
    const start = createInitialGameState();
    const afterE4 = attemptMove(start, { from: 'e2', to: 'e4' }).state;
    const undone = undoGameState(afterE4);

    expect(undone.fen).toBe(start.fen);
    expect(undone.moveHistory).toHaveLength(0);
    expect(undone.past).toHaveLength(0);
  });

  it('runs room objective rules after checkmate', () => {
    const afterF3 = attemptMove(createInitialGameState(), { from: 'f2', to: 'f3' }).state;
    const afterE5 = attemptMove(afterF3, { from: 'e7', to: 'e5' }).state;
    const afterG4 = attemptMove(afterE5, { from: 'g2', to: 'g4' }).state;
    const afterMate = attemptMove(afterG4, { from: 'd8', to: 'h4' }).state;

    expect(afterMate.phase).toBe('room-complete');
    expect(afterMate.room.completed).toBe(true);
  });
});
