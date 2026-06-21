import { useMemo, useState } from 'react';
import { Chess, type Color, type Move, type Square } from 'chess.js';
import {
  getBoardSquares,
  getCapturedPieces,
  getGameMessage,
  getLegalTargets,
  getNextFenAfterMove,
  getNextFenAfterUndo,
  materialScore,
} from './chessLogic';

export function useChessGame() {
  const [fen, setFen] = useState(new Chess().fen());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [flipped, setFlipped] = useState(false);

  const game = useMemo(() => new Chess(fen), [fen]);
  const moveHistory = useMemo(() => game.history({ verbose: true }) as Move[], [game]);
  const legalTargets = useMemo(() => getLegalTargets(game, selectedSquare), [game, selectedSquare]);
  const boardSquares = useMemo(
    () => getBoardSquares(game, flipped, selectedSquare, legalTargets),
    [flipped, game, legalTargets, selectedSquare],
  );
  const captured = useMemo(() => getCapturedPieces(moveHistory), [moveHistory]);
  const whiteMaterial = useMemo(() => materialScore(captured.w), [captured]);
  const blackMaterial = useMemo(() => materialScore(captured.b), [captured]);

  function commitFen(nextFen: string) {
    setFen(nextFen);
    setSelectedSquare(null);
  }

  function resetGame() {
    commitFen(new Chess().fen());
  }

  function undoMove() {
    commitFen(getNextFenAfterUndo(fen));
  }

  function toggleBoard() {
    setFlipped((value) => !value);
  }

  function handleSquareClick(square: Square) {
    if (game.isGameOver()) return;

    const piece = game.get(square);

    if (selectedSquare && legalTargets.has(square)) {
      commitFen(getNextFenAfterMove(fen, selectedSquare, square));
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
    canUndo: moveHistory.length > 0,
    captured,
    currentTurn: game.turn() as Color,
    isGameOver: game.isGameOver(),
    moveHistory,
    resetGame,
    status: getGameMessage(game),
    toggleBoard,
    undoMove,
    whiteMaterial,
    handleSquareClick,
  };
}
