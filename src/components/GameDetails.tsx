import { Trophy } from 'lucide-react';
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
  captured: CapturedPieces;
  whiteMaterial: number;
  blackMaterial: number;
  moveHistory: Move[];
};

function CapturedRow({ label, pieces, advantage }: { label: string; pieces: CapturedPiece[]; advantage: number }) {
  const sortedPieces = sortCapturedPieces(pieces);

  return (
    <div className="captured-row">
      <span>{label}</span>
      <div className="captured-pieces" aria-label={`${label} captured pieces`}>
        {sortedPieces.length === 0 ? (
          <span className="muted">None</span>
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

export function GameDetails({ currentTurn, captured, whiteMaterial, blackMaterial, moveHistory }: GameDetailsProps) {
  return (
    <aside className="side-panel" aria-label="Game details">
      <div className="panel-section current-player">
        <Trophy size={20} />
        <div>
          <span>Current turn</span>
          <strong>{formatSide(currentTurn)}</strong>
        </div>
      </div>

      <div className="panel-section">
        <h2>Captured</h2>
        <CapturedRow label="White" pieces={captured.w} advantage={whiteMaterial - blackMaterial} />
        <CapturedRow label="Black" pieces={captured.b} advantage={blackMaterial - whiteMaterial} />
      </div>

      <div className="panel-section move-list-section">
        <h2>Moves</h2>
        <ol className="move-list">
          {moveHistory.length === 0 ? (
            <li className="muted">Start the game</li>
          ) : (
            moveHistory.map((move, index) => (
              <li key={`${move.from}-${move.to}-${index}`}>
                <span>{Math.floor(index / 2) + 1}{index % 2 === 0 ? '.' : '...'}</span>
                <strong>{move.san}</strong>
              </li>
            ))
          )}
        </ol>
      </div>
    </aside>
  );
}
