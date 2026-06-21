import { RotateCcw, RotateCw, SkipBack } from 'lucide-react';

type GameHeaderProps = {
  status: string;
  canUndo: boolean;
  onUndo: () => void;
  onFlipBoard: () => void;
  onReset: () => void;
};

export function GameHeader({ status, canUndo, onUndo, onFlipBoard, onReset }: GameHeaderProps) {
  return (
    <div className="board-header">
      <div>
        <p className="eyebrow">Chess 2.0</p>
        <h1>{status}</h1>
      </div>
      <div className="toolbar" aria-label="Game controls">
        <button type="button" onClick={onUndo} disabled={!canUndo} title="Undo last move">
          <SkipBack size={18} />
        </button>
        <button type="button" onClick={onFlipBoard} title="Flip board">
          <RotateCw size={18} />
        </button>
        <button type="button" onClick={onReset} title="Reset game">
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
}
