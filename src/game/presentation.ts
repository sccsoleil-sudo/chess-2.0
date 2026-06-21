import { Chess, type Color, type PieceSymbol } from 'chess.js';
import type { CapturedPiece, CapturedPieces, GameMove, GameState } from './types';

export const pieceGlyphs: Record<Color, Record<PieceSymbol, string>> = {
  w: { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕', k: '♔' },
  b: { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' },
};

const pieceValues: Record<PieceSymbol, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
const pieceOrder: PieceSymbol[] = ['q', 'r', 'b', 'n', 'p'];

export function formatSide(color: Color) {
  return color === 'w' ? 'White' : 'Black';
}

export function sortCapturedPieces(pieces: CapturedPiece[]) {
  return [...pieces].sort((a, b) => pieceOrder.indexOf(a.type) - pieceOrder.indexOf(b.type));
}

export function materialScore(pieces: CapturedPiece[]) {
  return pieces.reduce((score, piece) => score + pieceValues[piece.type], 0);
}

export function getCapturedPieces(history: GameMove[]): CapturedPieces {
  return history.reduce<CapturedPieces>(
    (captured, move) => {
      if (move.captured) {
        captured[move.color].push({
          color: move.color === 'w' ? 'b' : 'w',
          type: move.captured,
        });
      }

      return captured;
    },
    { w: [], b: [] },
  );
}

export function getGameMessage(state: GameState) {
  if (state.phase === 'room-complete') return 'Room complete';
  if (state.phase === 'run-over') return 'Run over';
  if (state.phase === 'choosing-mutation') return 'Choose a mutation';

  const game = new Chess(state.fen);

  if (game.isCheckmate()) {
    return `${formatSide(game.turn() === 'w' ? 'b' : 'w')} wins by checkmate`;
  }

  if (game.isDraw()) {
    if (game.isStalemate()) return 'Draw by stalemate';
    if (game.isThreefoldRepetition()) return 'Draw by repetition';
    if (game.isInsufficientMaterial()) return 'Draw by insufficient material';
    return 'Draw';
  }

  return `${formatSide(game.turn())} to move${game.inCheck() ? ' - check' : ''}`;
}
