const gameBoard = document.getElementById('game-board');
const rows = 4;
const cols = 4;
let board = Array.from(Array(rows), () => new Array(cols).fill(null));

function createBoard() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    let row = event.target.dataset.row;
    let col = event.target.dataset.col;
    board[row][col] = 'X';  // For simplicity, just marking cells with 'X' on click
    renderBoard();
}

function renderBoard() {
    let cells = gameBoard.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        let row = cells[i].dataset.row;
        let col = cells[i].dataset.col;
        cells[i].textContent = board[row][col];
    }
}

createBoard();