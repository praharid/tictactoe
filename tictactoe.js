const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const modeBtn = document.getElementById('mode-toggle');
const xScoreEl = document.getElementById('x-score');
const oScoreEl = document.getElementById('o-score');
const drawScoreEl = document.getElementById('draw-score');

const WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

let board, current, gameOver, vscp = false, scores = { X: 0, O: 0, D: 0 };

function init() {
  board = Array(9).fill(null);
  current = 'X';
  gameOver = false;
  cells.forEach(c => { c.textContent = ''; c.className = 'cell'; });
  statusEl.textContent = `${current}'s turn`;
}

init();

modeBtn.addEventListener('click', () => {
  vscp = !vscp;
  modeBtn.textContent = vscp ? 'vs Human' : 'vs CPU';
  init();
});

document.getElementById('restart').addEventListener('click', init);

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const i = +cell.dataset.i;
    if (gameOver || board[i]) return;
    if (vscp && current === 'O') return;
    play(i);
    if (vscp && !gameOver && current === 'O') {
      setTimeout(cpuMove, 350);
    }
  });
});

function play(i) {
  board[i] = current;
  cells[i].textContent = current;
  cells[i].classList.add(current.toLowerCase(), 'taken');

  const win = checkWin(current);
  if (win) {
    win.forEach(j => cells[j].classList.add('win'));
    statusEl.textContent = `${current} wins! 🎉`;
    scores[current]++;
    updateScore();
    gameOver = true;
    return;
  }
  if (board.every(v => v)) {
    statusEl.textContent = "It's a draw!";
    scores.D++;
    updateScore();
    gameOver = true;
    return;
  }
  current = current === 'X' ? 'O' : 'X';
  statusEl.textContent = `${current}'s turn`;
}

function checkWin(p) {
  for (const combo of WINS) {
    if (combo.every(i => board[i] === p)) return combo;
  }
  return null;
}

function updateScore() {
  xScoreEl.textContent = scores.X;
  oScoreEl.textContent = scores.O;
  drawScoreEl.textContent = scores.D;
}

function cpuMove() {
  const move = bestMove();
  play(move);
}

function bestMove() {
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O';
      if (checkWin('O')) { board[i] = null; return i; }
      board[i] = null;
    }
  }
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'X';
      if (checkWin('X')) { board[i] = null; return i; }
      board[i] = null;
    }
  }
  if (!board[4]) return 4;
  for (const c of [0, 2, 6, 8]) {
    if (!board[c]) return c;
  }
  return board.findIndex(v => !v);
}
