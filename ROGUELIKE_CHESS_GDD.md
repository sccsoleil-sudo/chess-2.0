# Rogue Chess: Game Design Document

## 1. High Concept

**Rogue Chess** is a tactical chess roguelike where the player clears a sequence of board "rooms" with a persistent army. Pieces gain strange mutations from captures, relics bend the rules of the whole army, and each floor ends with a boss encounter built around a powerful custom chess piece.

The game should feel like chess under pressure: familiar movement rules, but unpredictable run-building, risky upgrades, and weird synergies.

## 2. Design Pillars

### Familiar First

The base rules should remain readable to chess players. Standard pieces, checks, captures, promotion, and board geometry are the foundation.

### Every Capture Matters

Capturing is not just material gain. It creates a draft choice, powers up pieces, triggers relics, or activates curses.

### Powerful But Dangerous

Most upgrades should have drawbacks. The fun comes from building strong pieces that also create tactical problems.

### Runs Tell Stories

Each run should create memorable pieces: a poisoned ghost knight, a pawn that became the army's carry, a rook that turned into an exploding fortress.

## 3. Player Fantasy

The player is a commander guiding a small chess army through cursed boards. Every victory mutates the army. The player is not simply trying to preserve perfect material; they are shaping a strange warband across a run.

## 4. Core Game Loop

1. Enter a room with a preset enemy board.
2. Play tactical chess until the room objective is complete.
3. Pieces that capture may gain mutation choices.
4. After clearing the room, choose a reward.
5. Move to the next room on a branching map.
6. Defeat a boss at the end of each floor.
7. Continue until the final boss or army defeat.

## 5. Run Structure

### Campaign Length

Suggested first version:

- 3 floors.
- 6 normal rooms per floor.
- 1 elite room or event room per floor.
- 1 boss room per floor.

### Floor Themes

Example floors:

- **Floor 1: The Broken Opening**
  - Mostly standard pieces.
  - Teaches mutations, relics, and room rewards.

- **Floor 2: The Warped Middlegame**
  - More enemy mutations.
  - Terrain and special objectives appear more often.

- **Floor 3: The Endgame Cathedral**
  - Boss-style enemies appear in normal rooms.
  - The player must rely on built synergies.

## 6. Starting Army

The player starts weaker than a full chess army to encourage growth.

Recommended starting army:

- King
- 4 pawns
- 1 knight
- 1 bishop

Alternative difficulty starts:

- **Easy:** King, 6 pawns, knight, bishop, rook.
- **Normal:** King, 4 pawns, knight, bishop.
- **Hard:** King, 3 pawns, knight.

## 7. Room Objectives

Not every room needs to be checkmate. Different objectives help the game feel more roguelike.

### Standard Objectives

- **Rout:** capture all enemy pieces except the enemy king.
- **Checkmate:** defeat the enemy king by normal chess rules.
- **Survive:** survive for a fixed number of turns.
- **Escape:** move the player king or a marked piece to an exit square.
- **Assassinate:** capture a specific enemy piece.
- **Protect:** keep a fragile allied piece alive until the room ends.

### Why This Matters

Objective variety changes which upgrades are valuable. A slow fortress rook may dominate rout rooms, while a blink knight may be better in escape or assassinate rooms.

## 8. Core Rule Changes

### Persistent Pieces

Pieces that survive a room continue into the next room. Captured player pieces are lost for the run unless revived by a reward, relic, or event.

### Room Setup

At the start of each room:

- The player deploys surviving pieces into a limited deployment zone.
- Enemy pieces are already placed.
- Some rooms may have terrain, hazards, or special rules.

### King Defeat

If the player's king is captured or checkmated, the run ends.

### Check Rules

Prototype recommendation:

- Keep normal check rules for the player king.
- Enemy kings may either follow normal checkmate rules in checkmate rooms or act like boss units in non-checkmate rooms.

This avoids every room becoming a standard chess endgame.

## 9. Capture Mutation System

When a player piece captures an enemy piece, it gains 1 blood mark. At certain thresholds, the piece receives a mutation draft.

### Mutation Thresholds

- Pawn: after 1 capture.
- Knight: after 2 captures.
- Bishop: after 2 captures.
- Rook: after 2 captures.
- Queen: after 3 captures.

Each piece can hold up to 3 mutations.

### Mutation Draft

When a mutation triggers:

1. Pause after the capture resolves.
2. Offer 3 random mutations.
3. The player chooses 1.
4. Some rare choices include a curse for a stronger effect.

### Mutation Categories

- **Movement mutations:** change how the piece moves.
- **Attack mutations:** change how the piece captures.
- **Defense mutations:** help the piece survive.
- **Aura mutations:** affect nearby allied or enemy pieces.
- **Cursed mutations:** powerful upgrades with serious drawbacks.

## 10. Example Mutations

### Common Mutations

**Dash**

- Once per room, this piece may move 1 extra square after moving.
- Cannot be used after capturing.

**Hook**

- After this piece captures, pull one adjacent enemy piece 1 square closer if legal.

**Guarded**

- The first time this piece would be captured each room, prevent the capture and remove this mutation until the next room.

**Blood Step**

- After capturing, this piece may move 1 square to an empty adjacent square.

**Pawn Friend**

- Allied pawns adjacent to this piece cannot be captured by enemy pawns.

### Uncommon Mutations

**Ghost**

- This piece may pass through one occupied square while moving.
- It cannot capture on a move where it phases through a piece.

**Vampire**

- After capturing, remove one curse or wound from this piece.
- This piece cannot capture pawns.

**Thorns**

- If this piece is captured, destroy the capturing piece too.
- This does not trigger against bosses.

**Blink**

- Once per room, teleport up to 2 squares before moving.
- Cannot teleport out of check.

**Banner**

- Allied pieces within 1 square gain +1 blood mark after they capture.

### Rare Mutations

**Split Soul**

- After this piece captures, create a pawn copy on the square behind it if legal.
- The copy disappears at the end of the room.

**Glass Blade**

- This piece may capture one adjacent enemy before taking its normal move.
- After using this effect twice, the piece dies.

**Devour**

- When this piece captures a non-boss enemy, it gains that piece's movement as a once-per-room ability.
- This piece gains the Hungry curse.

**Royal Oath**

- This piece may block check from any distance along its legal movement line.
- If it is captured, the king receives the Exposed curse for the next room.

**Starbound**

- This piece can attack through one allied piece.
- It cannot move on consecutive turns.

## 11. Curses And Wounds

Curses are negative traits attached to pieces. Wounds are temporary penalties, usually lasting one room.

### Example Curses

**Hungry**

- If this piece goes 3 of its own moves without capturing, it dies.

**Fragile**

- This piece is destroyed if it starts your turn attacked by 2 or more enemy pieces.

**Bound**

- This piece cannot move more than 3 squares away from the king.

**Loud**

- Enemy pieces gain priority targeting against this piece.

**Debt**

- After this piece captures twice, spawn an enemy pawn at the edge of the board.

### Example Wounds

**Cracked**

- This piece cannot receive mutations in the next room.

**Slowed**

- Sliding movement is capped at 3 squares for the next room.

**Dazed**

- This piece cannot move on the first player turn of the next room.

## 12. Relics

Relics affect the whole run. They are gained after rooms, from shops, events, elite encounters, and bosses.

### Example Relics

**Blood Banner**

- The first capture each room gives the capturing piece +1 extra blood mark.

**Crooked Compass**

- Once per room, a knight may move like a bishop for one move.

**Pawn Gospel**

- Pawns that survive 3 rooms gain a free mutation draft.

**Black Candle**

- Once per floor, sacrifice a pawn to remove a non-boss enemy pawn or knight.

**Mirror Crown**

- The first mutation gained each floor is copied to another eligible piece.

**Rotten Treaty**

- Once per floor, undo an enemy capture. Then add the Debt curse to a random allied piece.

**Broken Clock**

- Every 5 turns, all enemy sliding pieces lose 1 range until the end of that turn.

**Crown Tax**

- Gain extra gold after each room. Shops cost more.

**Grave Key**

- Once per floor, revive a captured piece with a random wound.

**Iron Prayer**

- The king cannot be checked by pawns. Enemy rooks deal double blood marks when they capture.

## 13. Rewards

After clearing a room, the player chooses 1 reward from 3 options.

### Reward Types

- Add a new piece.
- Heal a wound.
- Remove a curse.
- Gain a relic.
- Gain gold.
- Mutate an existing piece.
- Upgrade deployment space.
- Revive a captured piece.
- Promote a pawn.

### Example Reward Screen

Choose one:

- Add a rook with the Slowed wound.
- Mutate your knight.
- Gain 40 gold.

## 14. Shops And Economy

Gold is gained from rooms, events, and relics. Shops appear once per floor.

### Shop Items

- Buy a new piece.
- Buy a relic.
- Remove a curse.
- Heal a wound.
- Reroll a mutation.
- Upgrade maximum mutation capacity for one piece.
- Buy a one-room consumable.

### Consumables

**Smoke Bomb**

- For one turn, enemies cannot capture pawns.

**Royal Seal**

- Prevent check once this room.

**Red Draft**

- The next capture triggers a mutation draft, even if below threshold.

## 15. Enemy Design

Enemies can use normal chess movement, mutations, or boss rules. Early enemies should stay readable.

### Enemy Types

**Standard Piece**

- Moves like normal chess.

**Mutated Piece**

- Has one visible mutation.

**Cursed Piece**

- Stronger than normal, but has a visible weakness.

**Boss Piece**

- Custom rules, large health model, or staged behavior.

## 16. Bosses

Bosses should feel like chess puzzles with roguelike pressure.

### Boss 1: The Iron Rook

Theme: defense and positioning.

Rules:

- Moves like a rook.
- Cannot be captured from the front.
- Summons a pawn shield every 3 turns.
- Becomes vulnerable for 1 turn after moving 4 or more squares.

### Boss 2: The Hydra Queen

Theme: sacrifice and board control.

Rules:

- Moves like a queen.
- First time it is captured, split into two bishops.
- Second time, each bishop splits into two pawns.
- Pawns explode when captured, wounding adjacent pieces.

### Boss 3: The Lich King

Theme: attrition and resurrection.

Rules:

- Moves like a king.
- Revives one captured enemy pawn every 3 turns.
- Revived pawns return with the Hungry curse.
- The Lich King cannot be captured while any revived pawn remains.

## 17. Terrain And Board Modifiers

Terrain should be introduced slowly. The first prototype can ignore terrain.

### Terrain Examples

**Cracked Square**

- A piece standing here cannot receive defensive mutation effects.

**Blood Square**

- A capture on this square grants +1 blood mark.

**Fog Square**

- Pieces on this square cannot be targeted by attacks from more than 3 squares away.

**Locked Gate**

- Blocks movement until a key piece is captured.

**Shrine**

- A piece that ends its move here may remove a wound once per room.

## 18. Piece Identity And Evolution

Pieces should become named units in the player's army.

Example piece card:

- Name: Ash Knight
- Base: Knight
- Captures: 3
- Mutations: Ghost, Blood Step
- Curse: Hungry
- Wound: none

Optional system:

- After a piece gains 3 mutations, it receives a title.
- Titles give small identity bonuses.

Example titles:

- **Duelist:** +1 reward choice after solo captures.
- **Warden:** adjacent king protection bonus.
- **Reaper:** gains gold from captures.
- **Pilgrim:** stronger on shrine squares.

## 19. Difficulty And Balance Rules

### Avoid Snowballing Too Hard

- Pieces have mutation caps.
- Strong mutations should include drawbacks.
- Bosses should resist instant-kill effects.
- Revives should return pieces with wounds.

### Avoid Punishing Experimentation Too Much

- Early floors should offer ways to heal wounds.
- The player should see enemy abilities clearly.
- Random choices should be drafted, not assigned blindly.

### Keep Turns Fast

- Limit triggered effects.
- Use visible icons for mutations and curses.
- Resolve capture effects immediately.

## 20. User Interface Needs

### Board UI

- Standard chessboard.
- Deployment zone highlight.
- Legal move highlights.
- Enemy threat highlights.
- Objective marker.
- Boss ability tracker.

### Piece UI

Each piece should show:

- Base type.
- Current mutations.
- Curses and wounds.
- Blood marks toward next mutation.
- Once-per-room ability status.

### Reward UI

- Three clear choices.
- Show which pieces are eligible.
- Preview mutation effects before confirming.

### Map UI

- Branching path.
- Room type icons:
  - Combat
  - Elite
  - Event
  - Shop
  - Boss

## 21. Prototype Scope

### MVP Goal

Build one playable run with enough content to prove the core idea.

### MVP Content

- 1 floor.
- 5 combat rooms.
- 1 shop.
- 1 boss: The Iron Rook.
- Player starts with king, 4 pawns, knight, bishop.
- 12 mutations.
- 8 relics.
- 5 curses or wounds.
- 3 room objectives:
  - Rout
  - Assassinate
  - Survive

### MVP Rules To Keep Simple

- No terrain.
- No queen in starting army.
- No enemy mutation drafts.
- Bosses resist instant-kill and thorns effects.
- Pieces can hold 3 mutations.

## 22. Future Expansion

### More Floors

- Add new boss themes.
- Add terrain.
- Add elite rooms.
- Add stronger event choices.

### More Army Identity

- Piece names.
- Titles.
- Visual mutation changes.
- Graveyard of lost pieces.

### More Roguelike Depth

- Character classes.
- Starting relics.
- Unlockable piece sets.
- Ascension-style difficulty modifiers.

### Example Player Classes

**The Marshal**

- Starts with a rook.
- Rooks gain mutations faster.

**The Heretic**

- Starts with Black Candle.
- Pawns are easier to sacrifice and revive.

**The Oracle**

- Starts with two bishops.
- Sees one extra mutation option.

**The Pauper King**

- Starts with only pawns.
- Pawns promote faster and gain more relic synergy.

## 23. Open Design Questions

- Should rooms use checkmate, king capture, or objective-only victory?
- Should enemies follow perfect chess logic or tactical AI with personality?
- Should mutation drafts happen during combat or after the room?
- Should captured enemy piece type influence mutation type?
- How much randomness is acceptable before chess players feel they lost control?

## 24. Recommended First Playtest Version

The fastest fun prototype:

- One board room at a time.
- Player deploys a small persistent army.
- Captures add blood marks.
- Blood marks trigger mutation drafts.
- Room clears give relic or army rewards.
- A boss ends the floor.

This is enough to test the heart of the game: whether chess tactics plus piece mutation creates memorable decisions.
