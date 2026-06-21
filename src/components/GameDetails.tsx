import { Crosshair, ScrollText, Shield, Swords, Users } from 'lucide-react';
import type { Color, Move, Piece, Square } from 'chess.js';
import type { ReactNode } from 'react';
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
  selectedPiece: Piece | null;
  selectedSquare: Square | null;
  legalMoveCount: number;
};

function CapturedRow({ label, pieces, advantage }: { label: string; pieces: CapturedPiece[]; advantage: number }) {
  const sortedPieces = sortCapturedPieces(pieces);

  return (
    <div className="grid min-h-[36px] grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-[var(--space-2)] text-[0.92rem] leading-[1.35]">
      <span className="font-bold text-[var(--color-iron)]">{label}</span>
      <div
        className="flex min-w-0 flex-wrap gap-0.5 font-['Times_New_Roman',Georgia,serif] text-[1.45rem] leading-none text-[var(--color-ink)]"
        aria-label={`${label} captured pieces`}
      >
        {sortedPieces.length === 0 ? (
          <span className="font-sans text-[0.9rem] leading-[1.35] text-[var(--text-secondary)]">None</span>
        ) : (
          sortedPieces.map((piece, index) => (
            <span key={`${piece.type}-${index}`}>{pieceGlyphs[piece.color][piece.type]}</span>
          ))
        )}
      </div>
      {advantage > 0 && (
        <strong className="rounded-[var(--radius-sm)] bg-[rgb(184_137_46_/_14%)] px-[var(--space-2)] py-[var(--space-1)] text-[0.82rem] text-[var(--color-relic-gold)]">
          +{advantage}
        </strong>
      )}
    </div>
  );
}

function Panel({
  children,
  title,
  icon,
}: {
  children: ReactNode;
  title: string;
  icon: ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--surface-panel)] p-[18px] shadow-[var(--shadow-panel)]">
      <div className="mb-[var(--space-4)] flex items-center gap-[var(--space-2)] text-[var(--color-iron)]">
        <span className="grid size-8 place-items-center rounded-[var(--radius-md)] border border-[rgb(38_53_66_/_14%)] bg-[rgb(38_53_66_/_6%)]">
          {icon}
        </span>
        <h2 className="m-0 text-[1rem] leading-[1.25] font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TraitChip({ tone, children }: { tone: 'gold' | 'moss' | 'arcane' | 'blood'; children: ReactNode }) {
  const toneClass = {
    gold: 'border-[rgb(184_137_46_/_32%)] bg-[rgb(241_200_75_/_13%)] text-[var(--color-relic-gold)]',
    moss: 'border-[rgb(47_93_80_/_30%)] bg-[rgb(47_93_80_/_10%)] text-[var(--color-moss)]',
    arcane: 'border-[rgb(107_74_143_/_28%)] bg-[rgb(107_74_143_/_10%)] text-[var(--color-arcane)]',
    blood: 'border-[rgb(143_45_45_/_28%)] bg-[rgb(143_45_45_/_10%)] text-[var(--color-blood)]',
  }[tone];

  return (
    <span
      className={`inline-flex min-h-[28px] items-center rounded-[var(--radius-md)] border px-[var(--space-2)] py-[var(--space-1)] text-[0.78rem] leading-[1.2] font-bold ${toneClass}`}
    >
      {children}
    </span>
  );
}

function TurnRow({ color, currentTurn, showActive }: { color: Color; currentTurn: Color; showActive: boolean }) {
  const active = showActive && color === currentTurn;

  return (
    <div
      className={[
        'flex min-h-10 items-center justify-between gap-[var(--space-3)] rounded-[var(--radius-md)] border px-[var(--space-3)] py-[var(--space-2)]',
        active
          ? 'border-[var(--color-iron)] bg-[var(--color-iron)] text-[var(--color-candle)]'
          : 'border-[var(--border-soft)] bg-[var(--surface-raised)] text-[var(--text-secondary)]',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-current={active ? 'true' : undefined}
    >
      <span className="inline-flex items-center gap-[var(--space-2)] text-[0.92rem] leading-[1.2] font-extrabold">
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
      {active && (
        <span className="text-[0.72rem] leading-[1.2] font-extrabold text-[var(--color-candle)] uppercase">
          To move
        </span>
      )}
    </div>
  );
}

function pieceName(piece: Piece | null) {
  if (!piece) return 'No piece selected';

  const names = {
    p: 'Pawn',
    n: 'Knight',
    b: 'Bishop',
    r: 'Rook',
    q: 'Queen',
    k: 'King',
  };

  return `${formatSide(piece.color)} ${names[piece.type]}`;
}

export function GameDetails({
  currentTurn,
  isGameOver,
  captured,
  whiteMaterial,
  blackMaterial,
  moveHistory,
  selectedPiece,
  selectedSquare,
  legalMoveCount,
}: GameDetailsProps) {
  const activeLabel = isGameOver ? 'Game over' : `${formatSide(currentTurn)} to move`;

  return (
    <aside className="flex min-w-0 flex-col gap-[var(--space-4)] self-start max-[1040px]:self-stretch" aria-label="Game details">
      <Panel title="Players" icon={<Users size={17} />}>
        <div className="grid gap-[var(--space-2)]" aria-label={activeLabel}>
          <TurnRow color="w" currentTurn={currentTurn} showActive={!isGameOver} />
          <TurnRow color="b" currentTurn={currentTurn} showActive={!isGameOver} />
        </div>
      </Panel>

      <Panel title="Objective" icon={<Crosshair size={17} />}>
        <p className="m-0 text-[1rem] leading-[1.45] font-bold text-[var(--color-ink)]">Break the opposing king.</p>
        <div className="mt-[var(--space-3)] flex flex-wrap gap-[var(--space-2)]">
          <TraitChip tone="gold">Checkmate</TraitChip>
          <TraitChip tone="moss">Legal moves only</TraitChip>
        </div>
      </Panel>

      <Panel title="Selected Piece" icon={<Shield size={17} />}>
        <div className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-[var(--space-3)]">
          <span className="grid size-12 place-items-center rounded-[var(--radius-md)] border border-[rgb(38_53_66_/_16%)] bg-[var(--surface-raised)] font-['Times_New_Roman',Georgia,serif] text-[2.1rem] leading-none text-[var(--color-ink)]">
            {selectedPiece ? pieceGlyphs[selectedPiece.color][selectedPiece.type] : '·'}
          </span>
          <div className="min-w-0">
            <strong className="block text-[1rem] leading-[1.25] text-[var(--color-ink)]">{pieceName(selectedPiece)}</strong>
            <span className="mt-[var(--space-1)] block text-[0.875rem] leading-[1.35] text-[var(--text-secondary)]">
              {selectedSquare ? `${selectedSquare} - ${legalMoveCount} legal moves` : 'Choose a piece to inspect its options.'}
            </span>
          </div>
        </div>
        <div className="mt-[var(--space-3)] flex flex-wrap gap-[var(--space-2)]">
          {selectedPiece ? (
            <>
              <TraitChip tone="arcane">Unmutated</TraitChip>
              <TraitChip tone="blood">Unwounded</TraitChip>
            </>
          ) : (
            <TraitChip tone="gold">Awaiting command</TraitChip>
          )}
        </div>
      </Panel>

      <Panel title="Captured" icon={<Swords size={17} />}>
        <div className="space-y-[var(--space-2)]">
          <CapturedRow label="White" pieces={captured.w} advantage={whiteMaterial - blackMaterial} />
          <CapturedRow label="Black" pieces={captured.b} advantage={blackMaterial - whiteMaterial} />
        </div>
      </Panel>

      <Panel title="Room Log" icon={<ScrollText size={17} />}>
        <ol className="m-0 grid max-h-[min(34vh,360px)] list-none grid-cols-2 gap-[var(--space-2)] overflow-auto p-0 max-[560px]:grid-cols-1">
          {moveHistory.length === 0 ? (
            <li className="flex min-h-[34px] items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[rgb(82_124_105_/_20%)] bg-[rgb(82_124_105_/_10%)] px-[9px] py-[7px] text-[0.9rem] leading-[1.35] text-[var(--text-secondary)]">
              Await first move
            </li>
          ) : (
            moveHistory.map((move, index) => (
              <li
                key={`${move.from}-${move.to}-${index}`}
                className="flex min-h-[34px] items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[rgb(82_124_105_/_18%)] bg-[rgb(82_124_105_/_10%)] px-[9px] py-[7px]"
              >
                <span className="text-[0.78rem] leading-[1.2] font-extrabold text-[var(--text-secondary)]">
                  {Math.floor(index / 2) + 1}
                  {index % 2 === 0 ? '.' : '...'}
                </span>
                <strong className="text-[0.95rem] leading-[1.35] text-[var(--color-ink)]">{move.san}</strong>
              </li>
            ))
          )}
        </ol>
      </Panel>
    </aside>
  );
}
