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
        className="relative grid aspect-square w-[min(78vh,100%)] max-w-[760px] grid-cols-8 grid-rows-[repeat(8,minmax(0,1fr))] overflow-hidden rounded-[var(--radius-lg)] border-[10px] border-[var(--border-strong)] bg-[var(--color-iron)] shadow-[var(--shadow-board)] outline outline-1 outline-[rgb(255_253_247_/_45%)] max-[1040px]:w-[min(92vw,680px)] max-[560px]:border-[6px]"
        role="grid"
        aria-label="Chess board"
      >
        {squares.map(({ square, piece, isLight, isSelected, isTarget, coordinate }) => (
          <button
            key={square}
            type="button"
            className={[
              'relative grid min-h-0 min-w-0 cursor-pointer place-items-center border-0 p-0 transition-[box-shadow,filter] duration-[var(--motion-fast)] hover:shadow-[inset_0_0_0_4px_rgb(255_253_247_/_38%)] focus-visible:z-20 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--color-candle)]',
              isLight ? 'bg-[var(--color-aged-ivory)]' : 'bg-[var(--color-verdigris)]',
              isSelected
                ? 'shadow-[inset_0_0_0_5px_var(--color-candle)] hover:shadow-[inset_0_0_0_5px_var(--color-candle)]'
                : '',
              isTarget
                ? "after:absolute after:z-0 after:aspect-square after:w-[28%] after:rounded-full after:bg-[rgb(18_23_26_/_30%)] after:content-['']"
                : '',
              isTarget && piece
                ? 'after:w-[82%] after:border-[5px] after:border-[rgb(143_45_45_/_42%)] after:bg-transparent'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onSquareClick(square)}
            role="gridcell"
            aria-label={`${square}${piece ? ` ${formatSide(piece.color)} ${piece.type}` : ''}`}
          >
            <span
              className={[
                "relative z-10 grid size-full place-items-center font-['Times_New_Roman',Georgia,serif] text-[clamp(2.2rem,8vw,5.2rem)] leading-none [text-shadow:0_2px_0_rgb(255_253_247_/_46%)]",
                piece?.color === 'b' ? 'text-[var(--color-ink)]' : 'text-[rgb(255_253_247)]',
                piece?.color === 'w' ? '[text-shadow:0_2px_0_rgb(18_23_26_/_50%)]' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {piece ? pieceGlyphs[piece.color][piece.type] : ''}
            </span>
            {coordinate && (
              <span className="absolute right-1.5 bottom-1 z-10 text-[clamp(0.62rem,1.6vw,0.82rem)] leading-[1.2] font-extrabold text-[rgb(18_23_26_/_58%)]">
                {coordinate}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
