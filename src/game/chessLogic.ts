import { Chess, type Color, type Move, type PieceSymbol, type Square } from 'chess.js';

export type Piece = {
  color: Color;
  type: PieceSymbol;
};

export type CapturedPiece = Piece;
export type CapturedPieces = Record<Color, CapturedPiece[]>;

export type BoardSquareState = {
  square: Square;
  piece: Piece | null;
  isLight: boolean;
  isSelected: boolean;
  isTarget: boolean;
  coordinate: string;
};

export const pieceGlyphs: Record<Color, Record<PieceSymbol, string>> = {
  w: { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕', k: '♔' },
  b: { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' },
};

export const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;

const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;
const pieceValues: Record<PieceSymbol, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
const pieceOrder: PieceSymbol[] = ['q', 'r', 'b', 'n', 'p'];

export function buildSquares(flipped: boolean): Square[] {
  const visibleRanks = flipped ? ranks : [...ranks].reverse();
  const visibleFiles = flipped ? [...files].reverse() : files;

  return visibleRanks.flatMap((rank) =>
    visibleFiles.map((file) => `${file}${rank}` as Square),
  );
}

export function formatSide(color: Color) {
  return color === 'w' ? 'White' : 'Black';
}

export function sortCapturedPieces(pieces: CapturedPiece[]) {
  return [...pieces].sort((a, b) => pieceOrder.indexOf(a.type) - pieceOrder.indexOf(b.type));
}

export function materialScore(pieces: CapturedPiece[]) {
  return pieces.reduce((score, piece) => score + pieceValues[piece.type], 0);
}

export function getCapturedPieces(history: Move[]): CapturedPieces {
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

export function getGameMessage(game: Chess) {
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

export function getLegalTargets(game: Chess, selectedSquare: Square | null) {
  if (!selectedSquare) return new Set<Square>();

  const legalMoves = game.moves({ square: selectedSquare, verbose: true }) as Move[];

  return new Set(legalMoves.map((move) => move.to));
}

export function getBoardSquares(
  game: Chess,
  flipped: boolean,
  selectedSquare: Square | null,
  legalTargets: ReadonlySet<Square>,
): BoardSquareState[] {
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

export function getNextFenAfterMove(fen: string, from: Square, to: Square) {
  const nextGame = new Chess(fen);

  nextGame.move({ from, to, promotion: 'q' });

  return nextGame.fen();
}

export function getNextFenAfterUndo(fen: string) {
  const nextGame = new Chess(fen);

  nextGame.undo();

  return nextGame.fen();
}

function getCoordinate(square: Square, flipped: boolean) {
  const showRank = square[0] === (flipped ? 'h' : 'a');
  const showFile = square[1] === (flipped ? '8' : '1');

  return `${showRank ? square[1] : ''}${showFile ? square[0] : ''}`;
}
