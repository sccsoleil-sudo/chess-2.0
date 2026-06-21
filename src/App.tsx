import { ChessBoard } from './components/ChessBoard';
import { GameDetails } from './components/GameDetails';
import { GameHeader } from './components/GameHeader';
import { useChessGame } from './game/useChessGame';

export default function App() {
  const chessGame = useChessGame();

  return (
    <main className="app-shell">
      <section className="game-area" aria-label="Chess game">
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
