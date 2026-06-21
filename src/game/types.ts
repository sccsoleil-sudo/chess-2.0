import type { Color, Move, PieceSymbol, Square } from 'chess.js';

export type Piece = {
  color: Color;
  type: PieceSymbol;
};

export type CapturedPiece = Piece;
export type CapturedPieces = Record<Color, CapturedPiece[]>;

export type BoardSquareState = {
  square: Square;
  piece: Piece | null;
  isLight: boolean;
  isSelected: boolean;
  isTarget: boolean;
  coordinate: string;
};

export type GameMove = Move;
export type PieceId = string;
export type MutationId = string;

export type RoguePieceState = {
  id: PieceId;
  color: Color;
  type: PieceSymbol;
  square: Square | null;
  bloodMarks: number;
  mutations: MutationId[];
};

export type RoomObjective =
  | { kind: 'checkmate' }
  | { kind: 'rout'; enemy: Color }
  | { kind: 'survive'; pliesRemaining: number }
  | { kind: 'escape'; pieceId: PieceId; exits: Square[] }
  | { kind: 'assassinate'; targetPieceId: PieceId }
  | { kind: 'protect'; targetPieceId: PieceId; until: RoomObjective };

export type RoomState = {
  objective: RoomObjective;
  completed: boolean;
};

export type MutationDraft = {
  pieceId: PieceId;
  options: MutationId[];
};

export type GamePhase = 'playing' | 'choosing-mutation' | 'room-complete' | 'run-over';

export type GameSnapshot = {
  fen: string;
  moveHistory: GameMove[];
  room: RoomState;
  pieces: Record<PieceId, RoguePieceState>;
  pendingDraft: MutationDraft | null;
  phase: GamePhase;
};

export type GameState = GameSnapshot & {
  past: GameSnapshot[];
};
