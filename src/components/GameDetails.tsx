import { Trophy } from 'lucide-react';
import type { Color, Move } from 'chess.js';
import {
  formatSide,
  sortCapturedPieces,
  type CapturedPieces,
  type CapturedPiece,
} from '../game/chessLogic';
import { PieceIcon } from './PieceIcon';

type GameDetailsProps = {
  currentTurn: Color;
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
        className="flex min-w-0 flex-wrap gap-1"
        aria-label={`${label} captured pieces`}
      >
        {sortedPieces.length === 0 ? (
          <span className="text-[0.9rem] text-[#7a858d]">None</span>
        ) : (
          sortedPieces.map((piece, index) => (
            <PieceIcon
              key={`${piece.type}-${index}`}
              piece={piece}
              className="size-7 object-contain"
              decorative
            />
          ))
        )}
      </div>
      {advantage > 0 && <strong>+{advantage}</strong>}
    </div>
  );
}

export function GameDetails({ currentTurn, captured, whiteMaterial, blackMaterial, moveHistory }: GameDetailsProps) {
  return (
    <aside className="flex min-w-0 flex-col gap-4 self-start max-[920px]:self-stretch" aria-label="Game details">
      <div className="flex items-center gap-3 rounded-lg border border-[#d6dddf] bg-[#fffdfa] p-[18px] shadow-[0_10px_22px_rgb(32_38_46_/_8%)]">
        <Trophy size={20} />
        <div>
          <span className="block text-[0.82rem] font-bold text-[#68727d]">Current turn</span>
          <strong className="block text-[1.35rem] text-[#111820]">{formatSide(currentTurn)}</strong>
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
