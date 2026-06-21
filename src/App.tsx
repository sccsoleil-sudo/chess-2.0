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
    <div className="grid min-h-[34px] grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-2.5 text-[0.92rem]">
      <span>{label}</span>
      <div
        className="flex min-w-0 flex-wrap gap-0.5 font-['Times_New_Roman',Georgia,serif] text-[1.45rem] leading-none"
        aria-label={`${label} captured pieces`}
      >
        {sortedPieces.length === 0 ? (
          <span className="text-[0.9rem] text-[#7a858d]">None</span>
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
    <main className="grid min-h-screen min-w-[320px] grid-cols-[minmax(0,1fr)_minmax(280px,360px)] gap-8 bg-[#f4f1e8] p-[clamp(16px,3vw,40px)] font-sans text-[#1f2933] antialiased max-[920px]:grid-cols-1 max-[560px]:gap-5 max-[560px]:p-3.5">
      <section className="grid min-w-0 grid-rows-[auto_minmax(0,1fr)]" aria-label="Chess game">
        <div className="mb-5 flex items-start justify-between gap-5 max-[560px]:flex-col max-[560px]:items-stretch max-[560px]:gap-3.5">
          <div>
            <p className="mb-1.5 text-[0.82rem] font-extrabold uppercase text-[#68727d]">Chess 2.0</p>
            <h1 className="max-w-[760px] text-[clamp(2rem,6vw,4.25rem)] leading-[0.95] font-bold text-[#16202a]">
              {status}
            </h1>
          </div>
          <div className="flex gap-2" aria-label="Game controls">
            <button
              type="button"
              className="grid size-[42px] cursor-pointer place-items-center rounded-lg border border-[#cdd5d8] bg-white text-[#23313d] hover:enabled:bg-[#e7f2f1] disabled:cursor-not-allowed disabled:text-[#a9b1b7] max-[560px]:size-10"
              onClick={undoMove}
              disabled={moveHistory.length === 0}
              title="Undo last move"
            >
              <SkipBack size={18} />
            </button>
            <button
              type="button"
              className="grid size-[42px] cursor-pointer place-items-center rounded-lg border border-[#cdd5d8] bg-white text-[#23313d] hover:enabled:bg-[#e7f2f1] disabled:cursor-not-allowed disabled:text-[#a9b1b7] max-[560px]:size-10"
              onClick={() => setFlipped((value) => !value)}
              title="Flip board"
            >
              <RotateCw size={18} />
            </button>
            <button
              type="button"
              className="grid size-[42px] cursor-pointer place-items-center rounded-lg border border-[#cdd5d8] bg-white text-[#23313d] hover:enabled:bg-[#e7f2f1] disabled:cursor-not-allowed disabled:text-[#a9b1b7] max-[560px]:size-10"
              onClick={resetGame}
              title="Reset game"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        <div className="grid min-h-0 place-items-center">
          <div
            className="grid aspect-square w-[min(82vh,100%)] max-w-[760px] grid-cols-8 grid-rows-[repeat(8,minmax(0,1fr))] overflow-hidden rounded-lg border-[10px] border-[#263542] shadow-[0_22px_45px_rgb(32_38_46_/_18%)] max-[920px]:w-[min(92vw,680px)] max-[560px]:border-[6px]"
            role="grid"
            aria-label="Chess board"
          >
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
                    'relative grid min-h-0 min-w-0 cursor-pointer place-items-center border-0 p-0 hover:shadow-[inset_0_0_0_4px_rgb(255_255_255_/_38%)]',
                    isLight ? 'bg-[#eee5d3]' : 'bg-[#527c69]',
                    isSelected
                      ? 'shadow-[inset_0_0_0_5px_#f1c84b] hover:shadow-[inset_0_0_0_5px_#f1c84b]'
                      : '',
                    isTarget
                      ? "after:absolute after:aspect-square after:w-[28%] after:rounded-full after:bg-[rgb(19_29_36_/_30%)] after:content-['']"
                      : '',
                    isTarget && piece
                      ? 'after:w-[82%] after:border-[5px] after:border-[rgb(19_29_36_/_30%)] after:bg-transparent'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleSquareClick(square)}
                  role="gridcell"
                  aria-label={`${square}${piece ? ` ${formatSide(piece.color)} ${piece.type}` : ''}`}
                >
                  <span className="relative z-10 grid size-full place-items-center font-['Times_New_Roman',Georgia,serif] text-[clamp(2.2rem,8vw,5.2rem)] leading-none text-[#111820] [text-shadow:0_2px_0_rgb(255_255_255_/_45%)]">
                    {piece ? pieceGlyphs[piece.color][piece.type] : ''}
                  </span>
                  {(square[0] === (flipped ? 'h' : 'a') || square[1] === (flipped ? '8' : '1')) && (
                    <span className="absolute right-1.5 bottom-1 text-[clamp(0.62rem,1.6vw,0.82rem)] font-extrabold text-[rgb(20_28_35_/_58%)]">
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

      <aside className="flex min-w-0 flex-col gap-4 self-start max-[920px]:self-stretch" aria-label="Game details">
        <div className="flex items-center gap-3 rounded-lg border border-[#d6dddf] bg-[#fffdfa] p-[18px] shadow-[0_10px_22px_rgb(32_38_46_/_8%)]">
          <Trophy size={20} />
          <div>
            <span className="block text-[0.82rem] font-bold text-[#68727d]">Current turn</span>
            <strong className="block text-[1.35rem] text-[#111820]">{formatSide(game.turn())}</strong>
          </div>
        </div>

        <div className="rounded-lg border border-[#d6dddf] bg-[#fffdfa] p-[18px] shadow-[0_10px_22px_rgb(32_38_46_/_8%)]">
          <h2 className="mb-4 text-[0.98rem] font-bold text-[#24303b]">Captured</h2>
          <div className="space-y-2.5">
            <CapturedRow label="White" pieces={captured.w} advantage={whiteMaterial - blackMaterial} />
            <CapturedRow label="Black" pieces={captured.b} advantage={blackMaterial - whiteMaterial} />
          </div>
        </div>

        <div className="max-h-[min(52vh,520px)] overflow-auto rounded-lg border border-[#d6dddf] bg-[#fffdfa] p-[18px] shadow-[0_10px_22px_rgb(32_38_46_/_8%)]">
          <h2 className="mb-4 text-[0.98rem] font-bold text-[#24303b]">Moves</h2>
          <ol className="m-0 grid list-none grid-cols-2 gap-2 p-0 max-[560px]:grid-cols-1">
            {moveHistory.length === 0 ? (
              <li className="flex min-h-[34px] items-center gap-2 rounded-md bg-[#eef5f2] px-[9px] py-[7px] text-[0.9rem] text-[#7a858d]">
                Start the game
              </li>
            ) : (
              moveHistory.map((move, index) => (
                <li
                  key={`${move.from}-${move.to}-${index}`}
                  className="flex min-h-[34px] items-center gap-2 rounded-md bg-[#eef5f2] px-[9px] py-[7px]"
                >
                  <span className="text-[0.78rem] font-extrabold text-[#64717a]">
                    {Math.floor(index / 2) + 1}
                    {index % 2 === 0 ? '.' : '...'}
                  </span>
                  <strong className="text-[0.95rem] text-[#1c2a34]">{move.san}</strong>
                </li>
              ))
            )}
          </ol>
        </div>
      </aside>
    </main>
  );
}
