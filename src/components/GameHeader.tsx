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
        'inline-flex h-9 min-w-[94px] items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-md)] border px-[var(--space-3)] text-[0.88rem] leading-[1.2] font-extrabold transition-[background-color,border-color,color,box-shadow] duration-[var(--motion-fast)]',
        active
          ? 'border-[var(--color-iron)] bg-[var(--color-iron)] text-[var(--color-candle)] shadow-[0_8px_18px_rgb(32_38_46_/_16%)]'
          : 'border-[var(--border-soft)] bg-[var(--surface-raised)] text-[var(--text-secondary)]',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-current={active ? 'true' : undefined}
    >
      <span
        className={[
          'size-2.5 rounded-full border',
          color === 'w' ? 'border-[var(--color-fog)] bg-white' : 'border-[var(--color-ink)] bg-[var(--color-ink)]',
          active ? 'ring-2 ring-[var(--color-candle)]' : '',
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
  const isWarning = status.toLowerCase().includes('check');
  const showTurn = !isGameOver;
  const controlButtonClass =
    'grid size-[42px] cursor-pointer place-items-center rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--surface-raised)] text-[var(--color-iron)] transition-[background-color,border-color,color,transform] duration-[var(--motion-fast)] hover:enabled:border-[var(--color-candle)] hover:enabled:bg-[rgb(241_200_75_/_16%)] active:enabled:translate-y-px disabled:cursor-not-allowed disabled:text-[var(--color-fog)] max-[560px]:size-10';

  return (
    <div className="flex items-start justify-between gap-[var(--space-5)] max-[560px]:flex-col max-[560px]:items-stretch max-[560px]:gap-[var(--space-3)]">
      <div className="min-w-0">
        <div className="mb-[var(--space-2)] flex flex-wrap items-center gap-[var(--space-2)]">
          <p className="m-0 text-[0.82rem] leading-[1.2] font-extrabold text-[var(--text-secondary)] uppercase">
            Rogue Chess
          </p>
          <span
            className={[
              'rounded-[var(--radius-sm)] border px-[var(--space-2)] py-[var(--space-1)] text-[0.75rem] leading-[1.2] font-bold',
              isWarning
                ? 'border-[rgb(143_45_45_/_32%)] bg-[rgb(196_68_61_/_10%)] text-[var(--color-blood)]'
                : 'border-[rgb(184_137_46_/_34%)] bg-[rgb(241_200_75_/_15%)] text-[var(--color-iron)]',
            ].join(' ')}
          >
            Room 1
          </span>
        </div>
        <h1 className="m-0 mb-[var(--space-3)] max-w-[760px] text-[clamp(1.55rem,4vw,2.35rem)] leading-none font-bold text-[var(--color-ink)]">
          Rogue Chess
        </h1>
        <div className="flex flex-wrap items-center gap-[var(--space-2)]" role="status" aria-label={status}>
          {showTurn ? (
            <>
              <span className="mr-[var(--space-1)] text-[0.78rem] leading-[1.2] font-extrabold text-[var(--text-secondary)] uppercase">
                To move
              </span>
              <PlayerPill color="w" currentTurn={currentTurn} showActive={showTurn} />
              <PlayerPill color="b" currentTurn={currentTurn} showActive={showTurn} />
              {isWarning && (
                <span className="inline-flex h-9 items-center rounded-[var(--radius-md)] border border-[rgb(143_45_45_/_32%)] bg-[rgb(196_68_61_/_10%)] px-[var(--space-3)] text-[0.82rem] leading-[1.2] font-extrabold text-[var(--color-blood)] uppercase">
                  Check
                </span>
              )}
            </>
          ) : (
            <span className="inline-flex min-h-9 items-center rounded-[var(--radius-md)] border border-[var(--color-iron)] bg-[var(--surface-raised)] px-[var(--space-3)] text-[0.95rem] leading-[1.35] font-extrabold text-[var(--color-ink)]">
              {status}
            </span>
          )}
        </div>
      </div>
      <div className="flex shrink-0 gap-[var(--space-2)]" aria-label="Game controls">
        <button
          type="button"
          className={controlButtonClass}
          onClick={onOpenRules}
          title="Open rules"
          aria-label="Open rules"
        >
          <BookOpen size={18} />
        </button>
        <button
          type="button"
          className={controlButtonClass}
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo last move"
          aria-label="Undo last move"
        >
          <SkipBack size={18} />
        </button>
        <button
          type="button"
          className={controlButtonClass}
          onClick={onFlipBoard}
          title="Flip board"
          aria-label="Flip board"
        >
          <RotateCw size={18} />
        </button>
        <button
          type="button"
          className={controlButtonClass}
          onClick={onReset}
          title="Reset game"
          aria-label="Reset game"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
}
