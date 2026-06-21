import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ChessBoard } from './components/ChessBoard';
import { GameDetails } from './components/GameDetails';
import { GameHeader } from './components/GameHeader';
import { useChessGame } from './game/useChessGame';

type View = 'game' | 'rules';

const ruleSections = [
  {
    title: 'Goal',
    body: 'Win by checkmating the opposing king. A king is checkmated when it is attacked and has no legal move, block, or capture that can remove the threat.',
  },
  {
    title: 'Turns',
    body: 'White moves first, then players alternate one move at a time. A move is legal only if it does not leave that player\'s king in check.',
  },
  {
    title: 'Piece Movement',
    body: 'Pawns move forward one square and capture diagonally. Knights jump in an L shape. Bishops move diagonally, rooks move straight, queens combine rook and bishop movement, and kings move one square.',
  },
  {
    title: 'Special Moves',
    body: 'Castling moves the king two squares toward a rook when neither piece has moved and the path is safe. En passant lets a pawn capture a pawn that just advanced two squares beside it. Pawns promote when they reach the last rank.',
  },
  {
    title: 'Draws',
    body: 'A game can draw by stalemate, threefold repetition, insufficient material, the fifty-move rule, or mutual agreement. This board detects common automatic draw conditions through chess.js.',
  },
  {
    title: 'Using This Board',
    body: 'Select one of your pieces to reveal legal targets, then select a highlighted square to move. Use the controls to undo, flip the board, reset, or return to this rules page.',
  },
];

function RulesPage({ onBack }: { onBack: () => void }) {
  return (
    <main className="min-h-screen min-w-[320px] bg-[var(--surface-app)] p-[clamp(16px,3vw,40px)] text-[var(--text-primary)] antialiased max-[560px]:p-[var(--space-3)]">
      <div className="mx-auto grid w-full max-w-6xl gap-[var(--space-6)]">
        <header className="flex items-start justify-between gap-[var(--space-5)] max-[640px]:flex-col max-[640px]:items-stretch">
          <div>
            <p className="mb-[var(--space-2)] text-[0.82rem] leading-[1.2] font-extrabold text-[var(--text-secondary)] uppercase">
              Rogue Chess
            </p>
            <h1 className="m-0 max-w-[820px] text-[clamp(2.35rem,7vw,5rem)] leading-[0.95] font-bold text-[var(--color-ink)]">
              Rules
            </h1>
          </div>
          <button
            type="button"
            className="inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-[var(--space-4)] text-[0.95rem] leading-[1.35] font-bold text-[var(--color-iron)] transition-[background-color,border-color,transform] duration-[var(--motion-fast)] hover:border-[var(--color-candle)] hover:bg-[rgb(241_200_75_/_16%)] active:translate-y-px max-[640px]:w-full"
            onClick={onBack}
          >
            <ArrowLeft size={18} />
            Back to board
          </button>
        </header>

        <section
          className="grid grid-cols-[minmax(0,1fr)_minmax(260px,340px)] gap-[var(--space-5)] max-[860px]:grid-cols-1"
          aria-label="Chess rules"
        >
          <div className="grid gap-[var(--space-4)]">
            {ruleSections.map((section) => (
              <article
                key={section.title}
                className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--surface-panel)] p-[18px] shadow-[var(--shadow-panel)]"
              >
                <h2 className="mb-[var(--space-2)] text-[1.08rem] leading-[1.25] font-bold text-[var(--color-iron)]">
                  {section.title}
                </h2>
                <p className="m-0 text-[0.98rem] leading-7 text-[var(--text-secondary)]">{section.body}</p>
              </article>
            ))}
          </div>

          <aside className="self-start rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--surface-panel)] p-[18px] shadow-[var(--shadow-panel)]">
            <h2 className="mb-[var(--space-4)] text-[0.98rem] leading-[1.25] font-bold text-[var(--color-iron)]">
              Notation Guide
            </h2>
            <dl className="grid gap-3 text-[0.95rem]">
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--color-ink)]">K</dt>
                <dd className="m-0 text-[var(--text-secondary)]">King</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--color-ink)]">Q</dt>
                <dd className="m-0 text-[var(--text-secondary)]">Queen</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--color-ink)]">R</dt>
                <dd className="m-0 text-[var(--text-secondary)]">Rook</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--color-ink)]">B</dt>
                <dd className="m-0 text-[var(--text-secondary)]">Bishop</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--color-ink)]">N</dt>
                <dd className="m-0 text-[var(--text-secondary)]">Knight</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--color-ink)]">O-O</dt>
                <dd className="m-0 text-[var(--text-secondary)]">Castle kingside</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--color-ink)]">+</dt>
                <dd className="m-0 text-[var(--text-secondary)]">Check</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--color-ink)]">#</dt>
                <dd className="m-0 text-[var(--text-secondary)]">Checkmate</dd>
              </div>
            </dl>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState<View>('game');
  const chessGame = useChessGame();

  if (view === 'rules') {
    return <RulesPage onBack={() => setView('game')} />;
  }

  return (
    <main className="grid min-h-screen min-w-[320px] grid-cols-[minmax(0,1fr)_minmax(300px,380px)] gap-[var(--space-6)] bg-[var(--surface-app)] p-[clamp(16px,3vw,40px)] text-[var(--text-primary)] antialiased max-[1040px]:grid-cols-1 max-[560px]:gap-[var(--space-5)] max-[560px]:p-[var(--space-3)]">
      <section className="grid min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-[var(--space-4)]" aria-label="Chess game">
        <GameHeader
          status={chessGame.status}
          currentTurn={chessGame.currentTurn}
          isGameOver={chessGame.isGameOver}
          canUndo={chessGame.canUndo}
          onOpenRules={() => setView('rules')}
          onUndo={chessGame.undoMove}
          onFlipBoard={chessGame.toggleBoard}
          onReset={chessGame.resetGame}
        />
        <ChessBoard squares={chessGame.boardSquares} onSquareClick={chessGame.handleSquareClick} />
      </section>

      <GameDetails
        currentTurn={chessGame.currentTurn}
        isGameOver={chessGame.isGameOver}
        captured={chessGame.captured}
        whiteMaterial={chessGame.whiteMaterial}
        blackMaterial={chessGame.blackMaterial}
        moveHistory={chessGame.moveHistory}
        selectedPiece={chessGame.selectedPiece}
        selectedSquare={chessGame.selectedSquare}
        legalMoveCount={chessGame.legalMoveCount}
      />
    </main>
  );
}
