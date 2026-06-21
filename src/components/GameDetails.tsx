import type { Color, Move } from 'chess.js';
import {
  formatSide,
  pieceGlyphs,
  sortCapturedPieces,
  type CapturedPieces,
  type CapturedPiece,
} from '../game/chessLogic';

type GameDetailsProps = {
  currentTurn: Color;
  isGameOver: boolean;
  captured: CapturedPieces;
  whiteMaterial: number;
  blackMaterial: number;
  moveHistory: Move[];
};

function CapturedRow({ label, pieces, advantage }: { label: string; pieces: CapturedPiece[]; advantage: number }) {
  const sortedPieces = sortCapturedPieces(pieces);

  return (
    <div className="grid min-h-[34px] grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-2.5 text-[0.92rem]">
      <span>{label}</span>
      <div
        className="flex min-w-0 flex-wrap gap-0.5 font-['Times_New_Roman',Georgia,serif] text-[1.45rem] leading-none"
        aria-label={`${label} captured pieces`}
      >
        {sortedPieces.length === 0 ? (
          <span className="text-[0.9rem] text-[#7a858d]">None</span>
        ) : (
          sortedPieces.map((piece, index) => (
            <span key={`${piece.type}-${index}`}>{pieceGlyphs[piece.color][piece.type]}</span>
          ))
        )}
      </div>
      {advantage > 0 && <strong>+{advantage}</strong>}
    </div>
  );
}

function TurnRow({ color, currentTurn, showActive }: { color: Color; currentTurn: Color; showActive: boolean }) {
  const active = showActive && color === currentTurn;

  return (
    <div
      className={[
        'flex min-h-10 items-center justify-between gap-3 rounded-lg border px-3 py-2',
        active ? 'border-[#263542] bg-[#263542] text-white' : 'border-[#d6dddf] bg-[#f7f4eb] text-[#68727d]',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-current={active ? 'true' : undefined}
    >
      <span className="inline-flex items-center gap-2 text-[0.92rem] font-extrabold">
        <span
          className={[
            'size-2.5 rounded-full border',
            color === 'w' ? 'border-[#9da7ad] bg-white' : 'border-[#111820] bg-[#111820]',
            active ? 'ring-2 ring-[#f1c84b]' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        />
        {formatSide(color)}
      </span>
      {active && <span className="text-[0.72rem] font-extrabold uppercase text-[#f1c84b]">To move</span>}
    </div>
  );
}

export function GameDetails({
  currentTurn,
  isGameOver,
  captured,
  whiteMaterial,
  blackMaterial,
  moveHistory,
}: GameDetailsProps) {
  const activeLabel = isGameOver ? 'Game over' : `${formatSide(currentTurn)} to move`;

  return (
    <aside className="flex min-w-0 flex-col gap-4 self-start max-[920px]:self-stretch" aria-label="Game details">
      <div className="rounded-lg border border-[#d6dddf] bg-[#fffdfa] p-[18px] shadow-[0_10px_22px_rgb(32_38_46_/_8%)]">
        <h2 className="mb-3 text-[0.98rem] font-bold text-[#24303b]">Players</h2>
        <div className="grid gap-2" aria-label={activeLabel}>
          <TurnRow color="w" currentTurn={currentTurn} showActive={!isGameOver} />
          <TurnRow color="b" currentTurn={currentTurn} showActive={!isGameOver} />
        </div>
      </div>

      <div className="rounded-lg border border-[#d6dddf] bg-[#fffdfa] p-[18px] shadow-[0_10px_22px_rgb(32_38_46_/_8%)]">
        <h2 className="mb-4 text-[0.98rem] font-bold text-[#24303b]">Captured</h2>
        <div className="space-y-2.5">
          <CapturedRow label="White" pieces={captured.w} advantage={whiteMaterial - blackMaterial} />
          <CapturedRow label="Black" pieces={captured.b} advantage={blackMaterial - whiteMaterial} />
        </div>
      </div>

      <div className="max-h-[min(52vh,520px)] overflow-auto rounded-lg border border-[#d6dddf] bg-[#fffdfa] p-[18px] shadow-[0_10px_22px_rgb(32_38_46_/_8%)]">
        <h2 className="mb-4 text-[0.98rem] font-bold text-[#24303b]">Moves</h2>
        <ol className="m-0 grid list-none grid-cols-2 gap-2 p-0 max-[560px]:grid-cols-1">
          {moveHistory.length === 0 ? (
            <li className="flex min-h-[34px] items-center gap-2 rounded-md bg-[#eef5f2] px-[9px] py-[7px] text-[0.9rem] text-[#7a858d]">
              Start the game
            </li>
          ) : (
            moveHistory.map((move, index) => (
              <li
                key={`${move.from}-${move.to}-${index}`}
                className="flex min-h-[34px] items-center gap-2 rounded-md bg-[#eef5f2] px-[9px] py-[7px]"
              >
                <span className="text-[0.78rem] font-extrabold text-[#64717a]">
                  {Math.floor(index / 2) + 1}
                  {index % 2 === 0 ? '.' : '...'}
                </span>
                <strong className="text-[0.95rem] text-[#1c2a34]">{move.san}</strong>
              </li>
            ))
          )}
        </ol>
      </div>
    </aside>
  );
}
