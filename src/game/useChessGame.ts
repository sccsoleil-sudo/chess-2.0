import { useMemo, useState } from 'react';
import { Chess, type Color, type Square } from 'chess.js';
import {
  attemptMove,
  createInitialGameState,
  getBoardSquares,
  getCapturedPieces,
  getGameMessage,
  getLegalTargets,
  type GameState,
  materialScore,
  resetGameState,
  undoGameState,
} from './chessLogic';

export function useChessGame() {
  const [gameState, setGameState] = useState(createInitialGameState);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [flipped, setFlipped] = useState(false);

  const game = useMemo(() => new Chess(gameState.fen), [gameState.fen]);
  const moveHistory = gameState.moveHistory;
  const legalTargets = useMemo(() => getLegalTargets(gameState, selectedSquare), [gameState, selectedSquare]);
  const boardSquares = useMemo(
    () => getBoardSquares(gameState, flipped, selectedSquare, legalTargets),
    [flipped, gameState, legalTargets, selectedSquare],
  );
  const captured = useMemo(() => getCapturedPieces(moveHistory), [moveHistory]);
  const whiteMaterial = useMemo(() => materialScore(captured.w), [captured]);
  const blackMaterial = useMemo(() => materialScore(captured.b), [captured]);
  const selectedPiece = selectedSquare ? (game.get(selectedSquare) ?? null) : null;

  function commitGameState(nextState: GameState) {
    setGameState(nextState);
    setSelectedSquare(null);
  }

  function resetGame() {
    commitGameState(resetGameState());
  }

  function undoMove() {
    commitGameState(undoGameState(gameState));
  }

  function toggleBoard() {
    setFlipped((value) => !value);
  }

  function handleSquareClick(square: Square) {
    if (game.isGameOver() || gameState.phase !== 'playing') return;

    const piece = game.get(square);

    if (selectedSquare && legalTargets.has(square)) {
      const attempt = attemptMove(gameState, { from: selectedSquare, to: square });

      commitGameState(attempt.state);
      return;
    }

    if (piece?.color === game.turn()) {
      setSelectedSquare(square);
      return;
    }

    setSelectedSquare(null);
  }

  return {
    blackMaterial,
    boardSquares,
    canUndo: gameState.past.length > 0,
    captured,
    currentTurn: game.turn() as Color,
    isGameOver: game.isGameOver() || gameState.phase !== 'playing',
    legalMoveCount: legalTargets.size,
    moveHistory,
    resetGame,
    selectedPiece,
    selectedSquare,
    status: getGameMessage(gameState),
    toggleBoard,
    undoMove,
    whiteMaterial,
    handleSquareClick,
  };
}
