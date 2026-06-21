import { ChessBoard } from './components/ChessBoard';
import { GameDetails } from './components/GameDetails';
import { GameHeader } from './components/GameHeader';
import { useChessGame } from './game/useChessGame';

export default function App() {
  const chessGame = useChessGame();

  return (
    <main className="grid min-h-screen min-w-[320px] grid-cols-[minmax(0,1fr)_minmax(300px,380px)] gap-[var(--space-6)] bg-[var(--surface-app)] p-[clamp(16px,3vw,40px)] text-[var(--text-primary)] antialiased max-[1040px]:grid-cols-1 max-[560px]:gap-[var(--space-5)] max-[560px]:p-[var(--space-3)]">
      <section className="grid min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-[var(--space-4)]" aria-label="Chess game">
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
        selectedPiece={chessGame.selectedPiece}
        selectedSquare={chessGame.selectedSquare}
        legalMoveCount={chessGame.legalMoveCount}
      />
    </main>
  );
}
