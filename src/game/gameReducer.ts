import { Chess, type Color, type Move, type PieceSymbol, type Square } from 'chess.js';
import { defaultRules, runAfterMoveRules, runBeforeMoveRules, runObjectiveRules, type GameRule } from './rules';
import type { GameSnapshot, GameState, PieceId, RoguePieceState, RoomState } from './types';

type MoveInput = {
  from: Square;
  to: Square;
  promotion?: Exclude<PieceSymbol, 'p' | 'k'>;
};

export type MoveAttempt = {
  state: GameState;
  move: Move | null;
  blockedReason?: string;
};

const defaultRoom: RoomState = {
  objective: { kind: 'checkmate' },
  completed: false,
};

export function createInitialGameState(fen = new Chess().fen(), room = defaultRoom): GameState {
  const game = new Chess(fen);

  return {
    fen,
    moveHistory: [],
    room,
    pieces: createPieceRegistry(game),
    pendingDraft: null,
    phase: 'playing',
    past: [],
  };
}

export function resetGameState() {
  return createInitialGameState();
}

export function undoGameState(state: GameState): GameState {
  const previous = state.past.at(-1);
  if (!previous) return state;

  return {
    ...previous,
    past: state.past.slice(0, -1),
  };
}

export function attemptMove(state: GameState, input: MoveInput, rules: GameRule[] = defaultRules): MoveAttempt {
  if (state.phase !== 'playing') {
    return { state, move: null, blockedReason: 'Game is not accepting moves.' };
  }

  const game = new Chess(state.fen);
  const move = safelyMove(game, input);

  if (!move) {
    return { state, move: null, blockedReason: 'Illegal move.' };
  }

  const beforeMove = runBeforeMoveRules(state, move, new Chess(state.fen), rules);
  if (beforeMove.blockedReason) {
    return { state: beforeMove.state, move: null, blockedReason: beforeMove.blockedReason };
  }

  const committed = pushSnapshot(beforeMove.state, {
    ...beforeMove.state,
    fen: game.fen(),
    moveHistory: [...beforeMove.state.moveHistory, move],
    pieces: applyMoveToPieceRegistry(beforeMove.state.pieces, move),
  });
  const afterMove = runAfterMoveRules(committed, move, game, rules);
  const afterObjective = runObjectiveRules(afterMove, game, rules);

  return { state: afterObjective, move };
}

function pushSnapshot(previousState: GameState, nextState: GameState): GameState {
  return {
    ...nextState,
    past: [...previousState.past, snapshot(previousState)],
  };
}

function snapshot(state: GameState): GameSnapshot {
  return {
    fen: state.fen,
    moveHistory: state.moveHistory,
    room: state.room,
    pieces: state.pieces,
    pendingDraft: state.pendingDraft,
    phase: state.phase,
  };
}

function createPieceRegistry(game: Chess) {
  const pieces: Record<PieceId, RoguePieceState> = {};

  for (const rank of ['1', '2', '3', '4', '5', '6', '7', '8'] as const) {
    for (const file of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const) {
      const square = `${file}${rank}` as Square;
      const piece = game.get(square);

      if (piece) {
        const id = createPieceId(piece.color, piece.type, square);
        pieces[id] = {
          id,
          color: piece.color,
          type: piece.type,
          square,
          bloodMarks: 0,
          mutations: [],
        };
      }
    }
  }

  return pieces;
}

function applyMoveToPieceRegistry(pieces: Record<PieceId, RoguePieceState>, move: Move) {
  const nextPieces = clonePieces(pieces);
  const movingPiece = findPieceAt(nextPieces, move.from);

  if (!movingPiece) return nextPieces;

  const capturedSquare = getCapturedPieceSquare(move);
  const capturedPiece = capturedSquare ? findPieceAt(nextPieces, capturedSquare) : null;
  if (capturedPiece) {
    nextPieces[capturedPiece.id] = { ...capturedPiece, square: null };
  }

  nextPieces[movingPiece.id] = {
    ...movingPiece,
    square: move.to,
    type: move.promotion ?? movingPiece.type,
  };

  moveCastlingRook(nextPieces, move);

  return nextPieces;
}

function getCapturedPieceSquare(move: Move) {
  if (!move.captured) return null;
  if (move.flags.includes('e')) return `${move.to[0]}${move.from[1]}` as Square;
  return move.to;
}

function moveCastlingRook(pieces: Record<PieceId, RoguePieceState>, move: Move) {
  if (!move.flags.includes('k') && !move.flags.includes('q')) return;

  const rookMove =
    move.to === 'g1'
      ? { from: 'h1', to: 'f1' }
      : move.to === 'c1'
        ? { from: 'a1', to: 'd1' }
        : move.to === 'g8'
          ? { from: 'h8', to: 'f8' }
          : move.to === 'c8'
            ? { from: 'a8', to: 'd8' }
            : null;

  if (!rookMove) return;

  const rook = findPieceAt(pieces, rookMove.from as Square);
  if (rook) {
    pieces[rook.id] = { ...rook, square: rookMove.to as Square };
  }
}

function clonePieces(pieces: Record<PieceId, RoguePieceState>) {
  return Object.fromEntries(
    Object.entries(pieces).map(([id, piece]) => [id, { ...piece, mutations: [...piece.mutations] }]),
  );
}

function findPieceAt(pieces: Record<PieceId, RoguePieceState>, square: Square) {
  return Object.values(pieces).find((piece) => piece.square === square);
}

function createPieceId(color: Color, type: PieceSymbol, square: Square) {
  return `${color}:${type}:${square}`;
}

function safelyMove(game: Chess, input: MoveInput) {
  try {
    return game.move({ ...input, promotion: input.promotion ?? 'q' });
  } catch {
    return null;
  }
}
