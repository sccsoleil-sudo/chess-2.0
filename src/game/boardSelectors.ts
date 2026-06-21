import { Chess, type Move, type Square } from 'chess.js';
import type { BoardSquareState, GameState, Piece } from './types';

export const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;

const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

export function buildSquares(flipped: boolean): Square[] {
  const visibleRanks = flipped ? ranks : [...ranks].reverse();
  const visibleFiles = flipped ? [...files].reverse() : files;

  return visibleRanks.flatMap((rank) =>
    visibleFiles.map((file) => `${file}${rank}` as Square),
  );
}

export function getLegalTargets(state: GameState, selectedSquare: Square | null) {
  if (!selectedSquare || state.phase !== 'playing') return new Set<Square>();

  const game = new Chess(state.fen);
  const legalMoves = game.moves({ square: selectedSquare, verbose: true }) as Move[];

  return new Set(legalMoves.map((move) => move.to));
}

export function getBoardSquares(
  state: GameState,
  flipped: boolean,
  selectedSquare: Square | null,
  legalTargets: ReadonlySet<Square>,
): BoardSquareState[] {
  const game = new Chess(state.fen);

  return buildSquares(flipped).map((square) => {
    const rank = Number(square[1]);
    const fileIndex = files.indexOf(square[0] as (typeof files)[number]);

    return {
      square,
      piece: game.get(square) as Piece | null,
      isLight: (rank + fileIndex) % 2 === 1,
      isSelected: selectedSquare === square,
      isTarget: legalTargets.has(square),
      coordinate: getCoordinate(square, flipped),
    };
  });
}

function getCoordinate(square: Square, flipped: boolean) {
  const showRank = square[0] === (flipped ? 'h' : 'a');
  const showFile = square[1] === (flipped ? '8' : '1');

  return `${showRank ? square[1] : ''}${showFile ? square[0] : ''}`;
}
