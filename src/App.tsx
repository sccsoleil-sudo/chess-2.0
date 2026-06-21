import { useMemo, useState } from 'react';
import { Chess, type Color, type Move, type PieceSymbol, type Square } from 'chess.js';
import { RotateCcw, RotateCw, SkipBack, Trophy } from 'lucide-react';

type Piece = {
  color: Color;
  type: PieceSymbol;
};

type CapturedPiece = Piece;
type CapturedPieces = Record<Color, CapturedPiece[]>;

const pieceGlyphs: Record<Color, Record<PieceSymbol, string>> = {
  w: { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕', k: '♔' },
  b: { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' },
};

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;
const pieceValues: Record<PieceSymbol, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
const pieceOrder: PieceSymbol[] = ['q', 'r', 'b', 'n', 'p'];

function buildSquares(flipped: boolean): Square[] {
  const visibleRanks = flipped ? ranks : [...ranks].reverse();
  const visibleFiles = flipped ? [...files].reverse() : files;

  return visibleRanks.flatMap((rank) =>
    visibleFiles.map((file) => `${file}${rank}` as Square),
  );
}

function formatSide(color: Color) {
  return color === 'w' ? 'White' : 'Black';
}

function materialScore(pieces: CapturedPiece[]) {
  return pieces.reduce((score, piece) => score + pieceValues[piece.type], 0);
}

function getCapturedPieces(history: Move[]): CapturedPieces {
  return history.reduce<CapturedPieces>(
    (captured, move) => {
      if (move.captured) {
        captured[move.color].push({
          color: move.color === 'w' ? 'b' : 'w',
          type: move.captured,
        });
      }

      return captured;
    },
    { w: [], b: [] },
  );
}

function getGameMessage(game: Chess) {
  if (game.isCheckmate()) {
    return `${formatSide(game.turn() === 'w' ? 'b' : 'w')} wins by checkmate`;
  }

  if (game.isDraw()) {
    if (game.isStalemate()) return 'Draw by stalemate';
    if (game.isThreefoldRepetition()) return 'Draw by repetition';
    if (game.isInsufficientMaterial()) return 'Draw by insufficient material';
    return 'Draw';
  }

  return `${formatSide(game.turn())} to move${game.inCheck() ? ' - check' : ''}`;
}

function CapturedRow({ label, pieces, advantage }: { label: string; pieces: CapturedPiece[]; advantage: number }) {
  const sortedPieces = [...pieces].sort((a, b) => pieceOrder.indexOf(a.type) - pieceOrder.indexOf(b.type));

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

export default function App() {
  const [fen, setFen] = useState(new Chess().fen());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [flipped, setFlipped] = useState(false);

  const game = useMemo(() => new Chess(fen), [fen]);
  const visibleSquares = useMemo(() => buildSquares(flipped), [flipped]);
  const moveHistory = game.history({ verbose: true }) as Move[];
  const legalMoves = selectedSquare ? game.moves({ square: selectedSquare, verbose: true }) : [];
  const legalTargets = new Set(legalMoves.map((move) => move.to));
  const captured = getCapturedPieces(moveHistory);
  const whiteMaterial = materialScore(captured.w);
  const blackMaterial = materialScore(captured.b);
  const status = getGameMessage(game);

  function commitMove(nextGame: Chess) {
    setFen(nextGame.fen());
    setSelectedSquare(null);
  }

  function resetGame() {
    commitMove(new Chess());
  }

  function undoMove() {
    const nextGame = new Chess(fen);
    nextGame.undo();
    commitMove(nextGame);
  }

  function handleSquareClick(square: Square) {
    if (game.isGameOver()) return;

    const piece = game.get(square) as Piece | null;

    if (selectedSquare && legalTargets.has(square)) {
      const nextGame = new Chess(fen);
      nextGame.move({ from: selectedSquare, to: square, promotion: 'q' });
      commitMove(nextGame);
      return;
    }

    if (piece?.color === game.turn()) {
      setSelectedSquare(square);
      return;
    }

    setSelectedSquare(null);
  }

  return (
    <main className="app-shell">
      <section className="game-area" aria-label="Chess game">
        <div className="board-header">
          <div>
            <p className="eyebrow">Chess 2.0</p>
            <h1>{status}</h1>
          </div>
          <div className="toolbar" aria-label="Game controls">
            <button type="button" onClick={undoMove} disabled={moveHistory.length === 0} title="Undo last move">
              <SkipBack size={18} />
            </button>
            <button type="button" onClick={() => setFlipped((value) => !value)} title="Flip board">
              <RotateCw size={18} />
            </button>
            <button type="button" onClick={resetGame} title="Reset game">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        <div className="board-wrap">
          <div className="board" role="grid" aria-label="Chess board">
            {visibleSquares.map((square) => {
              const rank = Number(square[1]);
              const fileIndex = files.indexOf(square[0] as (typeof files)[number]);
              const isLight = (rank + fileIndex) % 2 === 1;
              const piece = game.get(square) as Piece | null;
              const isSelected = selectedSquare === square;
              const isTarget = legalTargets.has(square);

              return (
                <button
                  key={square}
                  type="button"
                  className={[
                    'square',
                    isLight ? 'light' : 'dark',
                    isSelected ? 'selected' : '',
                    isTarget ? 'target' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleSquareClick(square)}
                  role="gridcell"
                  aria-label={`${square}${piece ? ` ${formatSide(piece.color)} ${piece.type}` : ''}`}
                >
                  <span className="piece">{piece ? pieceGlyphs[piece.color][piece.type] : ''}</span>
                  {(square[0] === (flipped ? 'h' : 'a') || square[1] === (flipped ? '8' : '1')) && (
                    <span className="coordinate">
                      {square[0] === (flipped ? 'h' : 'a') ? square[1] : ''}
                      {square[1] === (flipped ? '8' : '1') ? square[0] : ''}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <aside className="side-panel" aria-label="Game details">
        <div className="panel-section current-player">
          <Trophy size={20} />
          <div>
            <span>Current turn</span>
            <strong>{formatSide(game.turn())}</strong>
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
    </main>
  );
}
