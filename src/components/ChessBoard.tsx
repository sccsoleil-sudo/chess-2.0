import type { Square } from 'chess.js';
import { formatSide, pieceGlyphs, type BoardSquareState } from '../game/chessLogic';

type ChessBoardProps = {
  squares: BoardSquareState[];
  onSquareClick: (square: Square) => void;
};

export function ChessBoard({ squares, onSquareClick }: ChessBoardProps) {
  return (
    <div className="board-wrap">
      <div className="board" role="grid" aria-label="Chess board">
        {squares.map(({ square, piece, isLight, isSelected, isTarget, coordinate }) => (
          <button
            key={square}
            type="button"
            className={[
              'square',
              isLight ? 'light' : 'dark',
              isSelected ? 'selected' : '',
              isTarget ? 'target' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onSquareClick(square)}
            role="gridcell"
            aria-label={`${square}${piece ? ` ${formatSide(piece.color)} ${piece.type}` : ''}`}
          >
            <span className="piece">{piece ? pieceGlyphs[piece.color][piece.type] : ''}</span>
            {coordinate && <span className="coordinate">{coordinate}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
