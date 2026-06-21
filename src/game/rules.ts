import { Chess, type Move } from 'chess.js';
import type { GameState, RoguePieceState, RoomObjective } from './types';

export type RuleContext = {
  game: Chess;
};

export type RuleResult = {
  state: GameState;
  blockedReason?: string;
};

export type GameRule = {
  id: string;
  beforeMove?: (state: GameState, move: Move, context: RuleContext) => RuleResult;
  afterMove?: (state: GameState, move: Move, context: RuleContext) => GameState;
  checkObjective?: (state: GameState, context: RuleContext) => GameState;
};

const mutationThresholds: Partial<Record<RoguePieceState['type'], number>> = {
  p: 1,
  n: 2,
  b: 2,
  r: 2,
  q: 3,
};

export const bloodMarkRule: GameRule = {
  id: 'blood-mark',
  afterMove(state, move) {
    if (!move.captured || move.color !== 'w') return state;

    const piece = findPieceBySquare(state, move.to);
    if (!piece) return state;

    return updatePiece(state, piece.id, {
      bloodMarks: piece.bloodMarks + 1,
    });
  },
};

export const roomObjectiveRule: GameRule = {
  id: 'room-objective',
  checkObjective(state, { game }) {
    const objectiveState = evaluateObjective(state, state.room.objective, game);

    if (objectiveState === 'complete') {
      return {
        ...state,
        phase: 'room-complete',
        room: { ...state.room, completed: true },
      };
    }

    if (objectiveState === 'failed') {
      return { ...state, phase: 'run-over' };
    }

    return state;
  },
};

export const defaultRules: GameRule[] = [bloodMarkRule, roomObjectiveRule];

export function runBeforeMoveRules(state: GameState, move: Move, game: Chess, rules = defaultRules): RuleResult {
  return rules.reduce<RuleResult>(
    (result, rule) => {
      if (result.blockedReason || !rule.beforeMove) return result;
      return rule.beforeMove(result.state, move, { game });
    },
    { state },
  );
}

export function runAfterMoveRules(state: GameState, move: Move, game: Chess, rules = defaultRules) {
  return rules.reduce((nextState, rule) => {
    if (!rule.afterMove) return nextState;
    return rule.afterMove(nextState, move, { game });
  }, state);
}

export function runObjectiveRules(state: GameState, game: Chess, rules = defaultRules) {
  return rules.reduce((nextState, rule) => {
    if (!rule.checkObjective) return nextState;
    return rule.checkObjective(nextState, { game });
  }, state);
}

export function pieceNeedsMutationDraft(piece: RoguePieceState) {
  const threshold = mutationThresholds[piece.type];

  return Boolean(threshold && piece.bloodMarks >= threshold && piece.mutations.length < 3);
}

function evaluateObjective(state: GameState, objective: RoomObjective, game: Chess) {
  switch (objective.kind) {
    case 'checkmate':
      return game.isCheckmate() ? 'complete' : 'active';
    case 'rout':
      return Object.values(state.pieces).some(
        (piece) => piece.color === objective.enemy && piece.type !== 'k' && piece.square,
      )
        ? 'active'
        : 'complete';
    case 'survive':
      return objective.pliesRemaining <= 0 ? 'complete' : 'active';
    case 'escape': {
      const piece = state.pieces[objective.pieceId];
      return piece?.square && objective.exits.includes(piece.square) ? 'complete' : 'active';
    }
    case 'assassinate':
      return state.pieces[objective.targetPieceId]?.square ? 'active' : 'complete';
    case 'protect':
      if (!state.pieces[objective.targetPieceId]?.square) return 'failed';
      return evaluateObjective(state, objective.until, game);
  }
}

function findPieceBySquare(state: GameState, square: RoguePieceState['square']) {
  return Object.values(state.pieces).find((piece) => piece.square === square);
}

function updatePiece(state: GameState, pieceId: string, patch: Partial<RoguePieceState>) {
  const piece = state.pieces[pieceId];
  if (!piece) return state;

  return {
    ...state,
    pieces: {
      ...state.pieces,
      [pieceId]: { ...piece, ...patch },
    },
  };
}
