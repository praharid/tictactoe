# Tic Tac Toe

A Tic Tac Toe game with two versions: a standalone vanilla HTML/CSS/JS build and a React + Vite app.

## Versions

| Version | Location | Stack |
|---|---|---|
| Vanilla | `tictactoe.html` | HTML, CSS, JS — no build step |
| React | `tictactoe-react/` | React 19, Vite |

---

## Vanilla version

Open `tictactoe.html` directly in any browser. No installation required.

---

## React version

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (included with Node.js)

### Setup

```bash
cd tictactoe-react
npm install
```

### Run

```bash
npm run dev
```

Opens at **http://localhost:5173** with hot module replacement.

### Other commands

```bash
npm run build     # production build → dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

---

## Features

- Two-player mode (local)
- CPU opponent with rule-based AI (win → block → center → corners → random)
- Score tracking across rounds within the same session
- Dark theme
