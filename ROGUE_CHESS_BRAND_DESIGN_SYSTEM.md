# Rogue Chess Brand And Design System

This document translates the game direction in [ROGUELIKE_CHESS_GDD.md](ROGUELIKE_CHESS_GDD.md) into a practical brand and interface system. It should guide art direction, UI implementation, marketing screenshots, and future feature work.

## 1. Brand Core

### Product Name

**Rogue Chess**

The name should be used plainly and confidently. Avoid subtitles until the core game identity is stable.

### Brand Promise

Chess tactics pushed through a cursed roguelike run: readable moves, dangerous upgrades, memorable pieces.

### Positioning

Rogue Chess is for players who like chess clarity, tactical puzzle pressure, and run-based build stories. It should feel more precise than a fantasy tactics game and stranger than traditional chess.

### Tagline Options

- Every capture changes the board.
- Build a cursed army one capture at a time.
- Familiar chess. Unstable pieces.
- Win the room. Survive the run.

### Design Keywords

- Tactical
- Cursed
- Legible
- Sharp
- Ceremonial
- Pressurized
- Strange

### Anti-Keywords

- Cozy
- Toy-like
- Maximalist
- Cartoon chaos
- Generic medieval fantasy
- Casino roguelike
- Clean-room chess app

## 2. Creative Direction

### Visual Thesis

The player is commanding a small chess army across ritual boards. The interface should preserve the dignity and readability of chess while showing corruption through restrained accents, board marks, relic seals, and piece state.

### Mood

Use a disciplined board-game presentation with signs of decay: chipped ivory, oxidized green, dried blood, candlelit gold, blackened metal, and parchment UI surfaces. The world can be dark, but the board state must never become hard to read.

### World Signals

- Board rooms feel like altars, maps, reliquaries, and tactical diagrams.
- Mutations feel like engraved marks, blood pips, sigils, and subtle distortions.
- Bosses feel architectural and iconic, not just larger normal pieces.
- Relics feel physical: seals, keys, banners, candles, treaties, clocks, crowns.

## 3. Visual Principles

### Familiar First

Standard chess information gets priority: square color, piece identity, selected square, legal move targets, check state, and objective state must be immediately readable.

### Corruption Is An Accent

Cursed effects, blood marks, and relic energy should be concentrated in state badges, highlights, effects, and reward moments. Do not cover the board in noise.

### Every Choice Has Weight

Reward cards, mutation drafts, and shop items should feel consequential. Use strong hierarchy, clear drawbacks, and preview states before confirmation.

### Run Identity Builds Over Time

Pieces should visibly accumulate identity through names, small trait icons, blood marks, title plates, and wounds. A late-run piece card should feel like a story record.

## 4. Color System

The palette should avoid a one-note dark fantasy look. Use warm ivory and oxidized green for the board foundation, iron and ink for structure, dried red for risk, gold for reward, and violet only for rare occult signals.

### Core Palette

| Token | Hex | Use |
| --- | --- | --- |
| `--color-ink` | `#12171A` | Primary text, black pieces, highest contrast UI |
| `--color-iron` | `#263542` | Board frame, headers, durable controls |
| `--color-parchment` | `#F4F1E8` | App background, page surface |
| `--color-bone` | `#FFFDF7` | Panels, cards, elevated surfaces |
| `--color-aged-ivory` | `#EEE5D3` | Light board squares |
| `--color-verdigris` | `#527C69` | Dark board squares, tactical calm |
| `--color-moss` | `#2F5D50` | Positive board state, safe deployment |
| `--color-blood` | `#8F2D2D` | Capture, wounds, danger, sacrifice |
| `--color-blood-bright` | `#C4443D` | Urgent warnings, lethal previews |
| `--color-candle` | `#F1C84B` | Selection, reward, usable ability |
| `--color-relic-gold` | `#B8892E` | Relics, elite rewards, boss loot |
| `--color-arcane` | `#6B4A8F` | Rare mutations, curses, boss magic |
| `--color-fog` | `#B7C7C1` | Disabled, hidden, fog terrain, dividers |

### Semantic Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--surface-app` | `var(--color-parchment)` | Main app background |
| `--surface-panel` | `var(--color-bone)` | Side panels and menus |
| `--surface-raised` | `#FFFFFF` | Buttons, focused cards |
| `--text-primary` | `var(--color-ink)` | Main text |
| `--text-secondary` | `#68727D` | Labels and metadata |
| `--border-soft` | `#D6DDDF` | Panel border |
| `--border-strong` | `var(--color-iron)` | Board and modal frames |
| `--state-selected` | `var(--color-candle)` | Current selection |
| `--state-legal` | `rgba(18, 23, 26, 0.3)` | Legal move target |
| `--state-threat` | `rgba(143, 45, 45, 0.34)` | Enemy attack preview |
| `--state-objective` | `rgba(241, 200, 75, 0.42)` | Objective square |
| `--state-mutated` | `var(--color-arcane)` | Mutation markers |
| `--state-cursed` | `var(--color-blood)` | Curse markers |

### Usage Ratio

- 55 percent neutral parchment, bone, ink, and iron.
- 25 percent board colors and tactical greens.
- 15 percent gold and candle highlights.
- 5 percent blood and arcane accents.

## 5. Typography

### UI Typeface

Use a highly readable sans-serif for interface text.

Preferred stack:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Chess And Display Typeface

Use a classic serif only where it reinforces chess identity.

Preferred stack:

```css
font-family: "Times New Roman", Georgia, serif;
```

Use this for chess glyphs, large boss names, relic title treatments, and occasional ceremonial headings. Do not use it for dense rules text.

### Type Scale

| Token | Size | Line Height | Use |
| --- | --- | --- | --- |
| `--text-xs` | `0.75rem` | `1.2` | Coordinates, compact metadata |
| `--text-sm` | `0.875rem` | `1.35` | Labels, badges, short rules |
| `--text-md` | `1rem` | `1.45` | Body text |
| `--text-lg` | `1.25rem` | `1.25` | Panel headings |
| `--text-xl` | `1.75rem` | `1.1` | Room title, reward title |
| `--text-hero` | `clamp(2rem, 6vw, 4.25rem)` | `0.95` | Main status or major screen title |

### Text Rules

- Letter spacing stays at `0`.
- Use uppercase sparingly for short labels only.
- Rules text should be plain and direct.
- Drawbacks should be visible in the same card as the benefit.

## 6. Shape, Spacing, And Elevation

### Radius

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` | `4px` | Badges, pips, small controls |
| `--radius-md` | `6px` | Move rows, trait chips |
| `--radius-lg` | `8px` | Cards, panels, board frame |

Do not exceed `8px` for core UI. Rogue Chess should feel carved and tactical, not pillowy.

### Spacing

Use an 8px base scale.

| Token | Value |
| --- | --- |
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `24px` |
| `--space-6` | `32px` |
| `--space-7` | `40px` |

### Elevation

Use shadows sparingly. A board can cast a heavier shadow; cards should remain practical.

```css
--shadow-panel: 0 10px 22px rgb(32 38 46 / 8%);
--shadow-board: 0 22px 45px rgb(32 38 46 / 18%);
--shadow-modal: 0 24px 80px rgb(18 23 26 / 28%);
```

## 7. Iconography And Symbols

### Icon Style

Use simple line icons for controls and UI categories. Lucide icons are a good fit for current implementation.

### Chess Glyphs

Use Unicode chess glyphs for prototype clarity. If custom pieces are added later, keep silhouettes readable at small sizes and preserve the standard piece family relationship.

### Trait Icon Categories

| Category | Visual Motif | Color |
| --- | --- | --- |
| Movement mutation | Arrow, boot, compass | Candle or arcane |
| Attack mutation | Blade, fang, hook | Blood or ink |
| Defense mutation | Shield, wall, oath mark | Moss or iron |
| Aura mutation | Banner, ring, halo | Relic gold |
| Curse | Crack, chain, skull-like seal | Blood |
| Wound | Split mark, bandage, fracture | Blood-bright |
| Relic | Physical object silhouette | Relic gold |
| Boss ability | Crowned warning seal | Arcane and blood |

Do not rely on color alone. Trait chips need icons, labels, and accessible text.

## 8. Board System

### Board Foundation

- Light square: `--color-aged-ivory`
- Dark square: `--color-verdigris`
- Board frame: `--color-iron`
- Coordinates: ink at 58 percent opacity
- Selected square: inset candle outline
- Legal move: centered dark dot
- Legal capture: ring around target piece
- Enemy threat: red diagonal or corner overlay, not a full opaque wash
- Objective square: gold marker with icon
- Deployment zone: moss border or corner brackets

### Board Priority

When states overlap, use this priority:

1. Check or king danger
2. Current selected square
3. Legal capture or legal move
4. Objective marker
5. Terrain or room modifier
6. Passive deployment zone

### Piece State On Board

Pieces can show compact state marks:

- Blood marks: 1 to 3 tiny red pips near the base.
- Mutation capacity: small arcane notch or chip count.
- Once-per-room ability ready: candle glint or small charge icon.
- Wound or curse: small red or arcane corner mark.

Keep on-board marks minimal. Full rules live in the piece card.

## 9. Core Components

### App Shell

Use a two-zone layout for active play:

- Main area: board and room status.
- Side panel: current turn, objective, selected piece, captured pieces, room log.

On smaller screens, stack the board above detail panels. The board should remain the largest stable object.

### Toolbar

Icon buttons should be square, 40 to 44px, and use tooltips. Recommended controls:

- Undo
- Reset
- Flip board
- Threat view
- Relic inventory
- Settings

### Piece Card

Piece cards should make individual army identity clear.

Required fields:

- Piece name or generated title
- Base piece type and glyph
- Current square
- Captures and blood marks
- Mutations
- Curses
- Wounds
- Once-per-room ability status

Piece names should sound like army epithets, not jokes: Ash Knight, Oath Bishop, Thorn Pawn, Glass Rook.

### Mutation Draft Card

Mutation drafts are one of the most important UI moments.

Card structure:

1. Mutation name
2. Category chip
3. Benefit
4. Drawback or restriction
5. Eligible piece preview
6. Confirmation action

Use `--color-arcane` for rare mutation identity and `--color-blood` when a curse is attached.

### Reward Card

Reward cards should be comparable at a glance. Use the same layout for pieces, relics, gold, healing, revival, and upgrades:

- Reward type
- Main value
- Consequence or cost
- Affected piece or army scope

### Relic Item

Relics need object identity and persistent visibility.

Display:

- Small object icon
- Relic name
- Trigger condition
- Remaining charges or floor cooldown

### Boss Panel

Bosses should have clear staged behavior.

Display:

- Boss name
- Movement pattern
- Vulnerability rule
- Next special action countdown
- Stage or shield state

For The Iron Rook, surface "pawn shield in 3 turns" and "vulnerable after long move" as primary information.

### Map Node

Room type icons:

- Combat: crossed pieces
- Elite: crowned blade
- Event: sealed scroll
- Shop: coin and key
- Boss: crowned tower

Use branching lines that feel like a campaign map, not a puzzle graph. The selected route should read clearly.

## 10. Content Voice

### Voice Traits

- Clear
- Tense
- Concrete
- Slightly ceremonial
- Never verbose during play

### UI Copy Examples

Use:

- "Choose one mutation."
- "This pawn gains Blood Step."
- "Hungry: dies after 3 moves without capturing."
- "The Iron Rook summons a pawn shield next turn."
- "Revive a captured piece with a wound."

Avoid:

- "Would you like to empower this unit with a chaotic upgrade?"
- "Oops, that move is invalid."
- "Your destiny awaits in the sacred halls of strategic combat."

### Naming Rules

Mutation names should be short and physical: Dash, Hook, Ghost, Thorns, Glass Blade.

Relic names can be more ceremonial: Blood Banner, Mirror Crown, Rotten Treaty.

Boss names should be iconic and readable: The Iron Rook, The Hydra Queen, The Lich King.

## 11. Motion And Feedback

### Timing

| Motion | Duration | Use |
| --- | --- | --- |
| `--motion-fast` | `90ms` | Hover, press |
| `--motion-base` | `150ms` | Selection, panel reveal |
| `--motion-slow` | `260ms` | Reward reveal, boss warning |

### Feedback Rules

- Moves should resolve quickly.
- Captures can have a sharp flash and blood mark increment.
- Mutation draft reveal can be slower and more ceremonial.
- Boss warnings should pulse once, then settle into a persistent readable state.
- Avoid constant ambient animation during tactical decision-making.

## 12. Accessibility

- Board colors must pass contrast for coordinates, overlays, and selected states.
- Color-coded states also need icons, shapes, labels, or patterns.
- Keyboard support should cover square selection, move confirmation, undo, and reward selection.
- Focus rings should use candle or ink and be visible against all surfaces.
- Tooltips must not be the only place where rules are explained.
- Dense cards should use concise text, not tiny text.

## 13. Implementation CSS Token Starter

```css
:root {
  --color-ink: #12171A;
  --color-iron: #263542;
  --color-parchment: #F4F1E8;
  --color-bone: #FFFDF7;
  --color-aged-ivory: #EEE5D3;
  --color-verdigris: #527C69;
  --color-moss: #2F5D50;
  --color-blood: #8F2D2D;
  --color-blood-bright: #C4443D;
  --color-candle: #F1C84B;
  --color-relic-gold: #B8892E;
  --color-arcane: #6B4A8F;
  --color-fog: #B7C7C1;

  --surface-app: var(--color-parchment);
  --surface-panel: var(--color-bone);
  --surface-raised: #FFFFFF;
  --text-primary: var(--color-ink);
  --text-secondary: #68727D;
  --border-soft: #D6DDDF;
  --border-strong: var(--color-iron);

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 40px;

  --shadow-panel: 0 10px 22px rgb(32 38 46 / 8%);
  --shadow-board: 0 22px 45px rgb(32 38 46 / 18%);
  --shadow-modal: 0 24px 80px rgb(18 23 26 / 28%);

  --motion-fast: 90ms;
  --motion-base: 150ms;
  --motion-slow: 260ms;
}
```

## 14. Screens To Design First

1. Board room with selected piece and legal move targets.
2. Mutation draft after a capture.
3. Piece card showing mutations, curses, wounds, and blood marks.
4. Reward selection after room clear.
5. Boss room for The Iron Rook.
6. Run map with combat, shop, event, elite, and boss nodes.

## 15. Quality Bar

A Rogue Chess screen is on-brand when:

- A chess player can immediately read the board.
- A roguelike player can immediately compare choices.
- Mutations and curses are visible without overwhelming the board.
- The strongest color accents are attached to meaningful tactical states.
- A late-run army looks personal, altered, and slightly dangerous.
- The UI feels like a playable tool first and a fantasy object second.
