import { ChessBoard } from './components/ChessBoard';
import { GameDetails } from './components/GameDetails';
import { GameHeader } from './components/GameHeader';
import { useChessGame } from './game/useChessGame';

export default function App() {
  const chessGame = useChessGame();

  return (
    <main className="grid min-h-screen min-w-[320px] grid-cols-[minmax(0,1fr)_minmax(280px,360px)] gap-8 bg-[#f4f1e8] p-[clamp(16px,3vw,40px)] font-sans text-[#1f2933] antialiased max-[920px]:grid-cols-1 max-[560px]:gap-5 max-[560px]:p-3.5">
      <section className="grid min-w-0 grid-rows-[auto_minmax(0,1fr)]" aria-label="Chess game">
        <GameHeader
          status={chessGame.status}
          canUndo={chessGame.canUndo}
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
