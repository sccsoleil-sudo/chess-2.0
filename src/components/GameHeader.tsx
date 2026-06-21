import { RotateCcw, RotateCw, SkipBack } from 'lucide-react';

type GameHeaderProps = {
  status: string;
  canUndo: boolean;
  onUndo: () => void;
  onFlipBoard: () => void;
  onReset: () => void;
};

export function GameHeader({ status, canUndo, onUndo, onFlipBoard, onReset }: GameHeaderProps) {
  const isWarning = status.toLowerCase().includes('check');

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
        <h1 className="m-0 max-w-[760px] text-[clamp(2rem,6vw,4.25rem)] leading-[0.95] font-bold text-[var(--color-ink)]">
          {status}
        </h1>
      </div>
      <div className="flex shrink-0 gap-[var(--space-2)]" aria-label="Game controls">
        <button
          type="button"
          className="grid size-[42px] cursor-pointer place-items-center rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--surface-raised)] text-[var(--color-iron)] transition-[background-color,border-color,color,transform] duration-[var(--motion-fast)] hover:enabled:border-[var(--color-candle)] hover:enabled:bg-[rgb(241_200_75_/_16%)] active:enabled:translate-y-px disabled:cursor-not-allowed disabled:text-[var(--color-fog)] max-[560px]:size-10"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo last move"
          aria-label="Undo last move"
        >
          <SkipBack size={18} />
        </button>
        <button
          type="button"
          className="grid size-[42px] cursor-pointer place-items-center rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--surface-raised)] text-[var(--color-iron)] transition-[background-color,border-color,color,transform] duration-[var(--motion-fast)] hover:enabled:border-[var(--color-candle)] hover:enabled:bg-[rgb(241_200_75_/_16%)] active:enabled:translate-y-px disabled:cursor-not-allowed disabled:text-[var(--color-fog)] max-[560px]:size-10"
          onClick={onFlipBoard}
          title="Flip board"
          aria-label="Flip board"
        >
          <RotateCw size={18} />
        </button>
        <button
          type="button"
          className="grid size-[42px] cursor-pointer place-items-center rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--surface-raised)] text-[var(--color-iron)] transition-[background-color,border-color,color,transform] duration-[var(--motion-fast)] hover:enabled:border-[var(--color-candle)] hover:enabled:bg-[rgb(241_200_75_/_16%)] active:enabled:translate-y-px disabled:cursor-not-allowed disabled:text-[var(--color-fog)] max-[560px]:size-10"
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
