import { useState } from 'react';
import './App.css';

const WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkWinner(board) {
  for (const combo of WINS) {
    if (combo.every(i => board[i] && board[i] === board[combo[0]])) return combo;
  }
  return null;
}

function bestMove(board) {
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O';
      if (checkWinner(board)) { board[i] = null; return i; }
      board[i] = null;
    }
  }
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'X';
      if (checkWinner(board)) { board[i] = null; return i; }
      board[i] = null;
    }
  }
  if (!board[4]) return 4;
  for (const c of [0, 2, 6, 8]) if (!board[c]) return c;
  return board.findIndex(v => !v);
}

function Cell({ value, isWin, onClick }) {
  return (
    <div
      className={['cell', value?.toLowerCase(), value ? 'taken' : '', isWin ? 'win' : ''].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {value}
    </div>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [current, setCurrent] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [winCombo, setWinCombo] = useState(null);
  const [status, setStatus] = useState("X's turn");
  const [vsCpu, setVsCpu] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, D: 0 });

  const resetBoard = (nextVsCpu) => {
    setBoard(Array(9).fill(null));
    setCurrent('X');
    setGameOver(false);
    setWinCombo(null);
    setStatus("X's turn");
  };

  const handleCellClick = (i) => {
    if (gameOver || board[i]) return;
    if (vsCpu && current === 'O') return;

    const next = board.slice();
    next[i] = current;

    const win = checkWinner(next);
    if (win) {
      setBoard(next); setWinCombo(win);
      setStatus(`${current} wins! 🎉`);
      setGameOver(true);
      setScores(s => ({ ...s, [current]: s[current] + 1 }));
      return;
    }
    if (next.every(Boolean)) {
      setBoard(next); setStatus("It's a draw!"); setGameOver(true);
      setScores(s => ({ ...s, D: s.D + 1 }));
      return;
    }

    const nextPlayer = current === 'X' ? 'O' : 'X';
    setBoard(next);
    setCurrent(nextPlayer);
    setStatus(`${nextPlayer}'s turn`);

    if (vsCpu && nextPlayer === 'O') {
      setTimeout(() => {
        const cpuBoard = next.slice();
        const move = bestMove(cpuBoard);
        cpuBoard[move] = 'O';

        const cpuWin = checkWinner(cpuBoard);
        if (cpuWin) {
          setBoard(cpuBoard); setWinCombo(cpuWin);
          setStatus("O wins! 🎉");
          setGameOver(true);
          setScores(s => ({ ...s, O: s.O + 1 }));
          return;
        }
        if (cpuBoard.every(Boolean)) {
          setBoard(cpuBoard); setStatus("It's a draw!"); setGameOver(true);
          setScores(s => ({ ...s, D: s.D + 1 }));
          return;
        }
        setBoard(cpuBoard);
        setCurrent('X');
        setStatus("X's turn");
      }, 350);
    }
  };

  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <div id="status">{status}</div>

      <div id="board">
        {board.map((val, i) => (
          <Cell
            key={i}
            value={val}
            isWin={winCombo?.includes(i)}
            onClick={() => handleCellClick(i)}
          />
        ))}
      </div>

      <div id="controls">
        <button id="restart" onClick={() => resetBoard(vsCpu)}>Restart</button>
        <button id="mode-toggle" onClick={() => { const n = !vsCpu; setVsCpu(n); resetBoard(n); }}>
          {vsCpu ? 'vs Human' : 'vs CPU'}
        </button>
      </div>

      <div id="scoreboard">
        X wins: <span>{scores.X}</span>
        &nbsp;|&nbsp;
        Draws: <span>{scores.D}</span>
        &nbsp;|&nbsp;
        O wins: <span>{scores.O}</span>
      </div>
    </div>
  );
}
