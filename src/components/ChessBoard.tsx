import type { Square } from 'chess.js';
import { formatSide, pieceGlyphs, type BoardSquareState } from '../game/chessLogic';

type ChessBoardProps = {
  squares: BoardSquareState[];
  onSquareClick: (square: Square) => void;
};

export function ChessBoard({ squares, onSquareClick }: ChessBoardProps) {
  return (
    <div className="grid min-h-0 place-items-center">
      <div
        className="grid aspect-square w-[min(82vh,100%)] max-w-[760px] grid-cols-8 grid-rows-[repeat(8,minmax(0,1fr))] overflow-hidden rounded-lg border-[10px] border-[#263542] shadow-[0_22px_45px_rgb(32_38_46_/_18%)] max-[920px]:w-[min(92vw,680px)] max-[560px]:border-[6px]"
        role="grid"
        aria-label="Chess board"
      >
        {squares.map(({ square, piece, isLight, isSelected, isTarget, coordinate }) => (
          <button
            key={square}
            type="button"
            className={[
              'relative grid min-h-0 min-w-0 cursor-pointer place-items-center border-0 p-0 hover:shadow-[inset_0_0_0_4px_rgb(255_255_255_/_38%)]',
              isLight ? 'bg-[#eee5d3]' : 'bg-[#527c69]',
              isSelected
                ? 'shadow-[inset_0_0_0_5px_#f1c84b] hover:shadow-[inset_0_0_0_5px_#f1c84b]'
                : '',
              isTarget
                ? "after:absolute after:aspect-square after:w-[28%] after:rounded-full after:bg-[rgb(19_29_36_/_30%)] after:content-['']"
                : '',
              isTarget && piece
                ? 'after:w-[82%] after:border-[5px] after:border-[rgb(19_29_36_/_30%)] after:bg-transparent'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onSquareClick(square)}
            role="gridcell"
            aria-label={`${square}${piece ? ` ${formatSide(piece.color)} ${piece.type}` : ''}`}
          >
            <span className="relative z-10 grid size-full place-items-center font-['Times_New_Roman',Georgia,serif] text-[clamp(2.2rem,8vw,5.2rem)] leading-none text-[#111820] [text-shadow:0_2px_0_rgb(255_255_255_/_45%)]">
              {piece ? pieceGlyphs[piece.color][piece.type] : ''}
            </span>
            {coordinate && (
              <span className="absolute right-1.5 bottom-1 text-[clamp(0.62rem,1.6vw,0.82rem)] font-extrabold text-[rgb(20_28_35_/_58%)]">
                {coordinate}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
