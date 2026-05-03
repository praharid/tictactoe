# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project structure

This repo contains two versions of a Tic Tac Toe game:

- **`tictactoe.html` / `tictactoe.css` / `tictactoe.js`** — standalone vanilla HTML/CSS/JS version (open directly in a browser, no build step)
- **`tictactoe-react/`** — React + Vite version (the primary, actively developed version)

## React app commands

All commands run from inside `tictactoe-react/`:

```bash
npm run dev       # start dev server at http://localhost:5173 with HMR
npm run build     # production build → dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

To stop a background dev server: `pkill -f vite`

## Architecture

The React app is intentionally single-file logic — all game state and CPU logic lives in `src/App.jsx`. There is no routing, context, or external state library.

**State in `App`:**
- `board` — 9-element array, each cell is `'X'`, `'O'`, or `null`
- `current` — whose turn it is (`'X'` or `'O'`)
- `gameOver`, `winCombo` — end-state flags
- `vsCpu` — toggles CPU opponent mode
- `scores` — persists across restarts within the same session

**CPU logic (`bestMove`):** prioritizes winning move → blocking X → center → corners → any open cell. It does not use minimax.

**Styling:** `src/index.css` sets the dark background and base reset; `src/App.css` contains all component styles. No CSS framework is used.
