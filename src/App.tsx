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
    <main className="min-h-screen min-w-[320px] bg-[#f4f1e8] p-[clamp(16px,3vw,40px)] font-sans text-[#1f2933] antialiased max-[560px]:p-3.5">
      <div className="mx-auto grid w-full max-w-6xl gap-8">
        <header className="flex items-start justify-between gap-5 max-[640px]:flex-col max-[640px]:items-stretch">
          <div>
            <p className="mb-1.5 text-[0.82rem] font-extrabold uppercase text-[#68727d]">Chess 2.0</p>
            <h1 className="max-w-[820px] text-[clamp(2.35rem,7vw,5rem)] leading-[0.95] font-bold text-[#16202a]">
              Rules
            </h1>
          </div>
          <button
            type="button"
            className="inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#cdd5d8] bg-white px-4 text-[0.95rem] font-bold text-[#23313d] hover:bg-[#e7f2f1] max-[640px]:w-full"
            onClick={onBack}
          >
            <ArrowLeft size={18} />
            Back to board
          </button>
        </header>

        <section className="grid grid-cols-[minmax(0,1fr)_minmax(260px,340px)] gap-6 max-[860px]:grid-cols-1" aria-label="Chess rules">
          <div className="grid gap-4">
            {ruleSections.map((section) => (
              <article
                key={section.title}
                className="rounded-lg border border-[#d6dddf] bg-[#fffdfa] p-[18px] shadow-[0_10px_22px_rgb(32_38_46_/_8%)]"
              >
                <h2 className="mb-2 text-[1.08rem] font-bold text-[#24303b]">{section.title}</h2>
                <p className="text-[0.98rem] leading-7 text-[#46545e]">{section.body}</p>
              </article>
            ))}
          </div>

          <aside className="self-start rounded-lg border border-[#d6dddf] bg-[#fffdfa] p-[18px] shadow-[0_10px_22px_rgb(32_38_46_/_8%)]">
            <h2 className="mb-4 text-[0.98rem] font-bold text-[#24303b]">Notation Guide</h2>
            <dl className="grid gap-3 text-[0.95rem]">
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[#16202a]">K</dt>
                <dd className="text-[#46545e]">King</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[#16202a]">Q</dt>
                <dd className="text-[#46545e]">Queen</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[#16202a]">R</dt>
                <dd className="text-[#46545e]">Rook</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[#16202a]">B</dt>
                <dd className="text-[#46545e]">Bishop</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[#16202a]">N</dt>
                <dd className="text-[#46545e]">Knight</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[#16202a]">O-O</dt>
                <dd className="text-[#46545e]">Castle kingside</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[#16202a]">+</dt>
                <dd className="text-[#46545e]">Check</dd>
              </div>
              <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[#16202a]">#</dt>
                <dd className="text-[#46545e]">Checkmate</dd>
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
    <main className="grid min-h-screen min-w-[320px] grid-cols-[minmax(0,1fr)_minmax(280px,360px)] gap-8 bg-[#f4f1e8] p-[clamp(16px,3vw,40px)] font-sans text-[#1f2933] antialiased max-[920px]:grid-cols-1 max-[560px]:gap-5 max-[560px]:p-3.5">
      <section className="grid min-w-0 grid-rows-[auto_minmax(0,1fr)]" aria-label="Chess game">
        <GameHeader
          status={chessGame.status}
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
        captured={chessGame.captured}
        whiteMaterial={chessGame.whiteMaterial}
        blackMaterial={chessGame.blackMaterial}
        moveHistory={chessGame.moveHistory}
      />
    </main>
  );
}
