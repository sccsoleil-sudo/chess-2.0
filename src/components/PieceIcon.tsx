import type { SVGProps } from 'react';

export type PieceSide = 'w' | 'b' | 'white' | 'black';
export type StandardPieceType =
  | 'p'
  | 'n'
  | 'b'
  | 'r'
  | 'q'
  | 'k'
  | 'pawn'
  | 'knight'
  | 'bishop'
  | 'rook'
  | 'queen'
  | 'king';
export type BossPieceType = 'iron-rook' | 'hydra-queen' | 'lich-king';
export type PieceIconType = StandardPieceType | BossPieceType;
export type PieceIconInput = PieceIconType | { type: PieceIconType; color?: PieceSide };

type PieceIconDetails = {
  src: string;
  label: string;
};

type PieceIconProps = Omit<SVGProps<SVGSVGElement>, 'color'> & {
  piece: PieceIconInput;
  color?: PieceSide | string;
  strokeColor?: string;
  accentColor?: string;
  alt?: string;
  decorative?: boolean;
};

type NormalizedPiece = {
  type: PieceIconType;
  side?: PieceSide;
};

const standardPieceNames: Record<Exclude<StandardPieceType, 'p' | 'n' | 'b' | 'r' | 'q' | 'k'>, string> = {
  pawn: 'pawn',
  knight: 'knight',
  bishop: 'bishop',
  rook: 'rook',
  queen: 'queen',
  king: 'king',
};

const pieceSymbols: Record<'p' | 'n' | 'b' | 'r' | 'q' | 'k', keyof typeof standardPieceNames> = {
  p: 'pawn',
  n: 'knight',
  b: 'bishop',
  r: 'rook',
  q: 'queen',
  k: 'king',
};

const bossPieceLabels: Record<BossPieceType, string> = {
  'iron-rook': 'The Iron Rook',
  'hydra-queen': 'The Hydra Queen',
  'lich-king': 'The Lich King',
};

const sideColors: Record<'white' | 'black', { fill: string; stroke: string }> = {
  white: { fill: '#FFFDF7', stroke: '#12171A' },
  black: { fill: '#12171A', stroke: '#F4F1E8' },
};

const bossColors: Record<BossPieceType, { fill: string; stroke: string; accent: string }> = {
  'iron-rook': { fill: '#263542', stroke: '#F4F1E8', accent: '#B8892E' },
  'hydra-queen': { fill: '#12171A', stroke: '#F4F1E8', accent: '#6B4A8F' },
  'lich-king': { fill: '#12171A', stroke: '#F4F1E8', accent: '#8F2D2D' },
};

function normalizePiece(piece: PieceIconInput): NormalizedPiece {
  if (typeof piece === 'string') {
    return { type: piece };
  }

  return { type: piece.type, side: piece.color };
}

function isSideColor(color: PieceSide | string | undefined): color is PieceSide {
  return color === 'w' || color === 'b' || color === 'white' || color === 'black';
}

function normalizeSide(side: PieceSide | undefined) {
  return side === 'b' || side === 'black' ? 'black' : 'white';
}

function normalizeStandardType(type: StandardPieceType) {
  if (type in pieceSymbols) {
    return pieceSymbols[type as keyof typeof pieceSymbols];
  }

  return standardPieceNames[type as keyof typeof standardPieceNames];
}

function isBossPiece(type: PieceIconType): type is BossPieceType {
  return type === 'iron-rook' || type === 'hydra-queen' || type === 'lich-king';
}

function getPaint(piece: NormalizedPiece, color: PieceSide | string | undefined, strokeColor?: string, accentColor?: string) {
  if (isBossPiece(piece.type)) {
    const bossPaint = bossColors[piece.type];

    if (color && !isSideColor(color)) {
      return {
        fill: color,
        stroke: strokeColor ?? bossPaint.stroke,
        accent: accentColor ?? bossPaint.accent,
      };
    }

    return {
      fill: bossPaint.fill,
      stroke: strokeColor ?? bossPaint.stroke,
      accent: accentColor ?? bossPaint.accent,
    };
  }

  if (color && !isSideColor(color)) {
    return {
      fill: color,
      stroke: strokeColor ?? '#12171A',
      accent: accentColor ?? '#B8892E',
    };
  }

  const side = normalizeSide(isSideColor(color) ? color : piece.side);
  const sidePaint = sideColors[side];

  return {
    fill: sidePaint.fill,
    stroke: strokeColor ?? sidePaint.stroke,
    accent: accentColor ?? '#B8892E',
  };
}

export function getPieceIconSrc(piece: PieceIconInput) {
  return getPieceIconDetails(piece).src;
}

export function getPieceIconDetails(piece: PieceIconInput): PieceIconDetails {
  const normalized = normalizePiece(piece);

  if (isBossPiece(normalized.type)) {
    return {
      src: `/svg/boss-${normalized.type}.svg`,
      label: bossPieceLabels[normalized.type],
    };
  }

  const pieceName = normalizeStandardType(normalized.type);
  const colorLabel = normalized.side ? `${normalizeSide(normalized.side) === 'white' ? 'White' : 'Black'} ` : '';

  return {
    src: `/svg/${pieceName}.svg`,
    label: `${colorLabel}${pieceName}`,
  };
}

function PawnIcon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <g fill={fill} stroke={stroke} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="16" r="8.5" />
      <path d="M24.5 27.5h15l3.8 17h-22.6z" />
      <path d="M19.5 44.5h25" />
      <path d="M15.5 53.5c4.6-4.2 28.4-4.2 33 0z" />
      <path d="M13 56.5h38" />
    </g>
  );
}

function KnightIcon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <g fill={fill} stroke={stroke} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 53.5h31" />
      <path d="M22 46.5h25" />
      <path d="M27.5 46.5c.2-7.2 2.5-12.1 7-16.5l-8.8 1.8c-2.6.5-4.8-.4-6.6-2.6l-3.8-4.8 4.5-2.8 5.2 2.8 2.4-8.7c.8-2.9 3.4-4.9 6.4-4.9h7.8l-2.2 7.4 6.4 6.5c4.3 4.4 5.8 10 4.4 16.6l-1.1 5.2z" />
      <path d="M37 18.2l-5.2 4.9" />
      <path d="M32 13.2l-2.5 5.1" />
      <circle cx="39.5" cy="24.5" r="1.7" fill={stroke} stroke="none" />
    </g>
  );
}

function BishopIcon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <g fill={fill} stroke={stroke} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="10.5" r="3.8" />
      <path d="M21.5 32c0-8.2 5.5-13.2 10.5-17.4 5 4.2 10.5 9.2 10.5 17.4 0 5.3-4.7 9.8-10.5 9.8S21.5 37.3 21.5 32z" />
      <path d="M39.5 22.5 27 35" />
      <path d="M24 42h16l3.5 7.5h-23z" />
      <path d="M17 53.5h30" />
      <path d="M14 57h36" />
    </g>
  );
}

function RookIcon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <g fill={fill} stroke={stroke} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 13h8v6h10v-6h8v16H19z" />
      <path d="M22.5 29h19l2.5 18H20z" />
      <path d="M20 47h24" />
      <path d="M16 54.5h32" />
      <path d="M13 58h38" />
    </g>
  );
}

function QueenIcon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <g fill={fill} stroke={stroke} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="16" r="4" />
      <circle cx="32" cy="10" r="4" />
      <circle cx="50" cy="16" r="4" />
      <path d="m14 20 8.5 20 9.5-26 9.5 26L50 20l-5.5 28h-25z" />
      <path d="M19.5 48h25" />
      <path d="M16 55h32" />
      <path d="M13 58.5h38" />
    </g>
  );
}

function KingIcon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <g fill={fill} stroke={stroke} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 7v14" />
      <path d="M25.5 13.5h13" />
      <path d="M23 29c0-5.4 4-9.5 9-9.5s9 4.1 9 9.5c0 4.4-2.5 7.1-5 9.5h-8c-2.5-2.4-5-5.1-5-9.5z" />
      <path d="M23.5 38.5h17l3.8 10h-24.6z" />
      <path d="M18 54h28" />
      <path d="M14 58h36" />
    </g>
  );
}

function BossIcon({ type, fill, stroke, accent }: { type: BossPieceType; fill: string; stroke: string; accent: string }) {
  if (type === 'iron-rook') {
    return (
      <>
        <g fill={fill} stroke={stroke} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 11h8v7h6v-7h2v7h6v-7h8v18H17z" />
          <path d="M21 29h22l3 19H18z" />
          <path d="M18 48h28" />
          <path d="M14 55h36" />
          <path d="M11 59h42" />
        </g>
        <g fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M26 34h12" />
          <path d="M25 40h14" />
          <path d="M32 30v16" />
        </g>
      </>
    );
  }

  if (type === 'hydra-queen') {
    return (
      <>
        <QueenIcon fill={fill} stroke={stroke} />
        <g fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 23c-7 2-10 6-10 12" />
          <path d="M42 23c7 2 10 6 10 12" />
          <path d="M32 17v19" />
        </g>
      </>
    );
  }

  return (
    <>
      <KingIcon fill={fill} stroke={stroke} />
      <g fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M27.5 30h.1" />
        <path d="M36.5 30h.1" />
        <path d="M29 36c2 1.4 4 1.4 6 0" />
        <path d="M48 25c4 5 4 10 0 15" />
      </g>
    </>
  );
}

function StandardIcon({ type, fill, stroke }: { type: StandardPieceType; fill: string; stroke: string }) {
  const pieceName = normalizeStandardType(type);

  if (pieceName === 'pawn') return <PawnIcon fill={fill} stroke={stroke} />;
  if (pieceName === 'knight') return <KnightIcon fill={fill} stroke={stroke} />;
  if (pieceName === 'bishop') return <BishopIcon fill={fill} stroke={stroke} />;
  if (pieceName === 'rook') return <RookIcon fill={fill} stroke={stroke} />;
  if (pieceName === 'queen') return <QueenIcon fill={fill} stroke={stroke} />;

  return <KingIcon fill={fill} stroke={stroke} />;
}

export function PieceIcon({
  piece,
  color,
  strokeColor,
  accentColor,
  alt,
  decorative = false,
  role,
  ...svgProps
}: PieceIconProps) {
  const normalized = normalizePiece(piece);
  const details = getPieceIconDetails(piece);
  const paint = getPaint(normalized, color, strokeColor, accentColor);
  const title = alt ?? details.label;

  return (
    <svg
      {...svgProps}
      viewBox="0 0 64 64"
      role={decorative ? undefined : (role ?? 'img')}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      {isBossPiece(normalized.type) ? (
        <BossIcon type={normalized.type} fill={paint.fill} stroke={paint.stroke} accent={paint.accent} />
      ) : (
        <StandardIcon type={normalized.type} fill={paint.fill} stroke={paint.stroke} />
      )}
    </svg>
  );
}
