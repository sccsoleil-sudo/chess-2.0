import type { AriaRole, CSSProperties } from 'react';

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

type PieceIconProps = {
  piece: PieceIconInput;
  color?: PieceSide | string;
  strokeColor?: string;
  accentColor?: string;
  alt?: string;
  decorative?: boolean;
  className?: string;
  id?: string;
  role?: AriaRole;
  style?: CSSProperties;
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

function getBossPaint(type: BossPieceType, color: PieceSide | string | undefined, strokeColor?: string, accentColor?: string) {
  const bossPaint = bossColors[type];

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
  const side = normalizeSide(normalized.side);

  return {
    src: `/pieces/${side}-${pieceName}.png`,
    label: `${side === 'white' ? 'White' : 'Black'} ${pieceName}`,
  };
}

function getStandardPieceSrc(piece: NormalizedPiece, color: PieceSide | string | undefined) {
  const pieceName = normalizeStandardType(piece.type as StandardPieceType);
  const side = normalizeSide(isSideColor(color) ? color : piece.side);

  return `/pieces/${side}-${pieceName}.png`;
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

export function PieceIcon({
  piece,
  color,
  strokeColor,
  accentColor,
  alt,
  decorative = false,
  role,
  ...iconProps
}: PieceIconProps) {
  const normalized = normalizePiece(piece);

  if (!isBossPiece(normalized.type)) {
    const side = normalizeSide(isSideColor(color) ? color : normalized.side);
    const pieceName = normalizeStandardType(normalized.type as StandardPieceType);
    const standardTitle = alt ?? `${side === 'white' ? 'White' : 'Black'} ${pieceName}`;

    return (
      <img
        {...iconProps}
        src={getStandardPieceSrc(normalized, color)}
        alt={decorative ? '' : standardTitle}
        aria-hidden={decorative ? true : undefined}
        role={decorative ? undefined : role}
        draggable={false}
      />
    );
  }

  const details = getPieceIconDetails(piece);
  const paint = getBossPaint(normalized.type, color, strokeColor, accentColor);
  const title = alt ?? details.label;

  return (
    <svg
      {...iconProps}
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
