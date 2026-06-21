import { BookOpen, RotateCcw, RotateCw, SkipBack } from 'lucide-react';

type GameHeaderProps = {
  status: string;
  canUndo: boolean;
  onOpenRules: () => void;
  onUndo: () => void;
  onFlipBoard: () => void;
  onReset: () => void;
};

export function GameHeader({ status, canUndo, onOpenRules, onUndo, onFlipBoard, onReset }: GameHeaderProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-5 max-[560px]:flex-col max-[560px]:items-stretch max-[560px]:gap-3.5">
      <div>
        <p className="mb-1.5 text-[0.82rem] font-extrabold uppercase text-[#68727d]">Chess 2.0</p>
        <h1 className="max-w-[760px] text-[clamp(2rem,6vw,4.25rem)] leading-[0.95] font-bold text-[#16202a]">
          {status}
        </h1>
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
