# Rogue Chess Implementation TODO

Current state: the app is a clean Vite + React + TypeScript standard chess board using `chess.js`. It supports legal move selection, check/checkmate/draw status, move history, undo, reset, board flip, captured pieces, material advantage, and a basic rules page. The Markdown specs describe a larger Rogue Chess roguelike with persistent pieces, rooms, mutations, relics, rewards, shops, bosses, and a branded tactical UI. The work below tracks what is still needed to move from the current chess prototype toward the MVP in `ROGUELIKE_CHESS_GDD.md`.

## Foundation

- [ ] Rename the user-facing product from "Chess 2.0" to "Rogue Chess" where appropriate.
- [ ] Convert hard-coded color/style values into CSS design tokens from `ROGUE_CHESS_BRAND_DESIGN_SYSTEM.md`.
- [ ] Keep the current board readability, legal move highlights, captured pieces, undo/reset/flip controls, and responsive layout as the baseline.
- [ ] Decide whether the current rules page should remain as standard chess help, become Rogue Chess help, or move behind a secondary help view.
- [ ] Add a small domain model for a roguelike run: run id, floor, room index, gold, relics, surviving army, captured/lost allied pieces, and room state.
- [ ] Add a persistent piece model that wraps chess pieces with id, name/title, base type, color, square, captures, blood marks, mutations, curses, wounds, and per-room ability charges.
- [ ] Add test coverage for core run/piece state transitions before adding mutation and reward complexity.

## MVP Run Structure

- [ ] Implement a one-floor MVP run structure: 5 combat rooms, 1 shop, and 1 boss room.
- [ ] Implement the recommended starting army: king, 4 pawns, knight, and bishop.
- [ ] Add room definitions with preset enemy boards and objective metadata.
- [ ] Add a room-start deployment phase with a limited deployment zone.
- [ ] Persist surviving player pieces between rooms and remove captured player pieces from the run.
- [ ] End the run when the player's king is captured or checkmated.
- [ ] Add room-complete flow that transitions from combat to reward, shop, map, or boss.

## Room Objectives

- [ ] Implement `Rout`: clear all non-king enemy pieces.
- [ ] Implement `Assassinate`: capture a marked enemy piece.
- [ ] Implement `Survive`: survive for a fixed number of turns.
- [ ] Show the active objective in the side panel.
- [ ] Add objective square or target markers on the board where relevant.
- [ ] Decide how enemy kings behave in non-checkmate rooms: boss-like unit, ignored unit, or normal check rules.

## Capture And Mutation System

- [ ] Track blood marks when a player piece captures an enemy.
- [ ] Implement mutation thresholds by piece type: pawn 1, knight/bishop/rook 2, queen 3.
- [ ] Add a mutation capacity of 3 per piece.
- [ ] Pause after threshold captures and show a 3-choice mutation draft.
- [ ] Implement at least 12 MVP mutations from the GDD, prioritizing simple effects first: Dash, Hook, Guarded, Blood Step, Pawn Friend, Ghost, Vampire, Thorns, Blink, Banner, Split Soul, Glass Blade.
- [ ] Implement mutation categories and visible category chips/icons.
- [ ] Apply mutation effects to legal move generation, capture resolution, or post-capture triggers as needed.
- [ ] Add clear handling for rare/cursed mutations that include drawbacks.

## Curses And Wounds

- [ ] Implement a trait system shared by mutations, curses, wounds, and relic effects.
- [ ] Add at least 5 MVP curses/wounds, starting with Hungry, Fragile, Bound, Cracked, Slowed, and Dazed.
- [ ] Surface curses and wounds on piece cards and with minimal board markers.
- [ ] Add trigger resolution for Hungry, Fragile, Bound, Slowed, and Dazed.
- [ ] Ensure curses/wounds persist or expire according to their definitions.

## Rewards, Relics, And Economy

- [ ] Add room rewards: choose 1 of 3 options after clearing a room.
- [ ] Implement reward types for add piece, heal wound, remove curse, gain relic, gain gold, mutate existing piece, revive captured piece, and promote pawn.
- [ ] Add at least 8 MVP relics from the GDD.
- [ ] Add gold tracking and reward payouts.
- [ ] Implement one shop room per floor.
- [ ] Add shop items: new piece, relic, curse removal, wound healing, mutation reroll, mutation capacity upgrade, and one-room consumable.
- [ ] Implement initial consumables: Smoke Bomb, Royal Seal, and Red Draft.

## Boss MVP

- [ ] Implement boss room for The Iron Rook.
- [ ] Add Iron Rook movement and vulnerability rules.
- [ ] Add pawn shield summon every 3 turns.
- [ ] Add vulnerability state after The Iron Rook moves 4 or more squares.
- [ ] Add a boss side panel showing boss name, movement pattern, vulnerability rule, next special action countdown, and shield state.
- [ ] Ensure boss rules resist instant-kill and Thorns-style effects.

## UI Screens

- [ ] Update the board room UI to include room title, objective, turn count, selected piece details, captured pieces, and room log.
- [ ] Add a piece card with name/title, base type, square, captures, blood marks, mutations, curses, wounds, and ability charges.
- [ ] Add mutation draft cards with name, category, benefit, drawback/restriction, eligible piece preview, and confirmation action.
- [ ] Add reward selection cards that compare reward type, value, consequence/cost, and affected piece or army scope.
- [ ] Add relic inventory UI with icon, name, trigger, and remaining charges/cooldown.
- [ ] Add run map UI with combat, elite, event, shop, and boss node types, even if only combat/shop/boss are active in the MVP.
- [ ] Add threat-view control and enemy threat overlays.
- [ ] Add deployment zone highlights.
- [ ] Add keyboard support for square selection, move confirmation, undo, and reward selection.

## Visual Design

- [ ] Apply the Rogue Chess palette: parchment/bone/ink/iron foundation, aged ivory/verdigris board, candle selection, blood danger, relic gold rewards, and arcane rare/cursed effects.
- [ ] Keep radii at or below 8px for core UI.
- [ ] Use lucide icons for toolbar, room types, trait categories, relics, rewards, and boss panels.
- [ ] Add minimal piece state marks: blood pips, mutation capacity chips, ability-ready glint, wound/curse corner mark.
- [ ] Avoid covering the board with noisy effects; prioritize selected square, legal target, capture target, objective, and danger states.
- [ ] Tune responsive layout so the board remains the largest stable object on mobile and desktop.

## AI And Rules Engine

- [ ] Decide whether enemies are player-controlled for prototype testing, scripted, or AI-driven.
- [ ] If AI-driven, implement a simple enemy move selector that respects legal chess moves and room-specific boss/mutation rules.
- [ ] Add deterministic seeds for room generation, reward drafts, mutation drafts, and shop inventory.
- [ ] Add serialization for saving/loading a run.

## Quality And Verification

- [ ] Add unit tests for chess wrapper behavior, room completion, persistent army updates, blood marks, mutation thresholds, rewards, relic triggers, and boss countdowns.
- [ ] Add component tests or focused integration tests for board interactions and draft/reward flows.
- [ ] Run `npm run build` after each implementation slice.
- [ ] Manually verify a full MVP run from first room through Iron Rook defeat.
- [ ] Check desktop and mobile layouts for overlapping text, unstable board sizing, and unreadable state markers.
