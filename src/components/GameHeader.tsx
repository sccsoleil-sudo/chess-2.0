import type { Color } from 'chess.js';
import { BookOpen, RotateCcw, RotateCw, SkipBack } from 'lucide-react';
import { formatSide } from '../game/chessLogic';

type GameHeaderProps = {
  status: string;
  currentTurn: Color;
  isGameOver: boolean;
  canUndo: boolean;
  onOpenRules: () => void;
  onUndo: () => void;
  onFlipBoard: () => void;
  onReset: () => void;
};

function PlayerPill({ color, currentTurn, showActive }: { color: Color; currentTurn: Color; showActive: boolean }) {
  const active = showActive && color === currentTurn;

  return (
    <span
      className={[
        'inline-flex h-9 min-w-[94px] items-center justify-center gap-2 rounded-lg border px-3 text-[0.88rem] font-extrabold transition-colors',
        active
          ? 'border-[#263542] bg-[#263542] text-white shadow-[0_8px_18px_rgb(32_38_46_/_16%)]'
          : 'border-[#cdd5d8] bg-[#fffdfa] text-[#68727d]',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-current={active ? 'true' : undefined}
    >
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
  );
}

export function GameHeader({
  status,
  currentTurn,
  isGameOver,
  canUndo,
  onOpenRules,
  onUndo,
  onFlipBoard,
  onReset,
}: GameHeaderProps) {
  const showTurn = !isGameOver;
  const isCheck = status.includes('check');

  return (
    <div className="mb-5 flex items-start justify-between gap-5 max-[560px]:flex-col max-[560px]:items-stretch max-[560px]:gap-3.5">
      <div>
        <h1 className="mb-3 text-[clamp(1.55rem,4vw,2.35rem)] leading-none font-bold text-[#16202a]">Chess 2.0</h1>
        <div className="flex flex-wrap items-center gap-2" role="status" aria-label={status}>
          {showTurn ? (
            <>
              <span className="mr-1 text-[0.78rem] font-extrabold uppercase text-[#68727d]">To move</span>
              <PlayerPill color="w" currentTurn={currentTurn} showActive={showTurn} />
              <PlayerPill color="b" currentTurn={currentTurn} showActive={showTurn} />
              {isCheck && (
                <span className="inline-flex h-9 items-center rounded-lg border border-[#9f2d24] bg-[#fff1ed] px-3 text-[0.82rem] font-extrabold uppercase text-[#9f2d24]">
                  Check
                </span>
              )}
            </>
          ) : (
            <span className="inline-flex min-h-9 items-center rounded-lg border border-[#263542] bg-[#fffdfa] px-3 text-[0.95rem] font-extrabold text-[#16202a]">
              {status}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2" aria-label="Game controls">
        <button
          type="button"
          className="grid size-[42px] cursor-pointer place-items-center rounded-lg border border-[#cdd5d8] bg-white text-[#23313d] hover:enabled:bg-[#e7f2f1] disabled:cursor-not-allowed disabled:text-[#a9b1b7] max-[560px]:size-10"
          onClick={onOpenRules}
          title="Open rules"
        >
          <BookOpen size={18} />
        </button>
        <button
          type="button"
          className="grid size-[42px] cursor-pointer place-items-center rounded-lg border border-[#cdd5d8] bg-white text-[#23313d] hover:enabled:bg-[#e7f2f1] disabled:cursor-not-allowed disabled:text-[#a9b1b7] max-[560px]:size-10"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo last move"
        >
          <SkipBack size={18} />
        </button>
        <button
          type="button"
          className="grid size-[42px] cursor-pointer place-items-center rounded-lg border border-[#cdd5d8] bg-white text-[#23313d] hover:enabled:bg-[#e7f2f1] disabled:cursor-not-allowed disabled:text-[#a9b1b7] max-[560px]:size-10"
          onClick={onFlipBoard}
          title="Flip board"
        >
          <RotateCw size={18} />
        </button>
        <button
          type="button"
          className="grid size-[42px] cursor-pointer place-items-center rounded-lg border border-[#cdd5d8] bg-white text-[#23313d] hover:enabled:bg-[#e7f2f1] disabled:cursor-not-allowed disabled:text-[#a9b1b7] max-[560px]:size-10"
          onClick={onReset}
          title="Reset game"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
}
