# Design System — Vibrant Warm Bronze Studio

<!-- impeccable:design-schema 1 -->

## Visual World

Professional, energetic, eye-friendly software-engineering portfolio pairing a warm espresso-obsidian ground (`#0f0c0a`) with vibrant burnished bronze-copper gradients (`#eba157 → #c96f28`) and soft warm radial light washes, plus a matching sunlit warm-stone daylight theme (`#faf5ee`).

## Color Tokens (`src/index.css`)

| Role | Warm Dark (Default) | Sunlit Light | Usage |
|------|---------------------|--------------|-------|
| `--ground` | `#0f0c0a` | `#faf5ee` | Eye-friendly warm espresso / sunlit stone canvas |
| `--surface` | `#181310` | `#fffdf9` | Project cards, competition cards, modals |
| `--surface-subtle` | `#14100d` | `#f3ebe0` | Section wash, image bezels, tags |
| `--ink` | `#f6f0e8` | `#1d1611` | Primary headings & emphasized copy (16–17:1 AAA) |
| `--ink-secondary` | `#d0c5b7` | `#4a3d33` | Body copy & descriptions (9–10.5:1 AAA) |
| `--ink-muted` | `#a39686` | `#6b5b4e` | Metadata, dates, secondary labels (≥5.8:1 AA+) |
| `--accent` | `#e59a50` | `#a85116` | Active indicators, highlights, metrics, links |
| `--accent-grad` | `135deg #eba157 → #c96f28` | `135deg #c96c28 → #9b4712` | Primary CTAs, active filter tabs, `<R/>` brand mark |

## Typography & Motion

- **Display:** `Bricolage Grotesque` (600, 700), tight tracking (`-0.028em` to `-0.034em`).
- **Body:** `Figtree` (400–700), `16px` base, `1.66`–`1.74` line height.
- **Mono:** `JetBrains Mono` strictly for dates, tabular metrics (`tabular-nums`), and technical tags.
- **Motion:** Purposeful staggered GSAP `expo.out` entrance on Hero and smooth one-time scroll reveals across sections (`useScrollReveal.ts`), warm hover glows on cards and primary buttons, and full `prefers-reduced-motion` support.
