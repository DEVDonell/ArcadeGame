

var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    //get coords of that tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c]; 

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    board[r][c] = currPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1; //update the row height for that column
    currColumns[c] = r; //update the array

    checkWinner();
}

function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";
    } else {
        winner.innerText = "Yellow Wins";
    }

    document.getElementById("gameOverSound").play();
    gameOver = true;

    // Auto-restart after 3 seconds
    setTimeout(() => {
        location.reload(); // or call your resetGame() if you use a custom reset
    }, 3000);
}

let vsCPU = false; // new flag for CPU mode

function enableCPU() {
    vsCPU = true;
}

// Modify the existing setPiece function slightly to support CPU move
function setPiece() {
    if (gameOver) return;

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) return;

    board[r][c] = currPlayer;
    let tile = document.getElementById(r + "-" + c);
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    currColumns[c] = r - 1;

    checkWinner();

    // Delay CPU move
    if (!gameOver && vsCPU && currPlayer == playerYellow) {
        setTimeout(cpuMove, 500);
    }
}

// Add CPU move logic
function cpuMove() {
    let bestMove = getWinningMove(playerYellow) || getWinningMove(playerRed) || getRandomMove();
    if (bestMove === null) return;

    let c = bestMove;
    let r = currColumns[c];

    board[r][c] = currPlayer;
    let tile = document.getElementById(r + "-" + c);
    tile.classList.add("yellow-piece");

    currColumns[c] = r - 1;
    currPlayer = playerRed;
    checkWinner();
}

// Try to find a move that will win the game
function getWinningMove(player) {
    for (let c = 0; c < columns; c++) {
        let r = currColumns[c];
        if (r < 0) continue;

        // simulate move
        board[r][c] = player;
        if (isWinningMove(r, c, player)) {
            board[r][c] = " "; // undo simulation
            return c;
        }
        board[r][c] = " "; // undo simulation
    }
    return null;
}

// Check if a given move is a winning move
function isWinningMove(r, c, player) {
    return (
        countConnected(r, c, 0, 1, player) + countConnected(r, c, 0, -1, player) >= 3 ||
        countConnected(r, c, 1, 0, player) >= 3 ||
        countConnected(r, c, 1, 1, player) + countConnected(r, c, -1, -1, player) >= 3 ||
        countConnected(r, c, 1, -1, player) + countConnected(r, c, -1, 1, player) >= 3
    );
}

// Count connected tiles in a direction
function countConnected(r, c, dr, dc, player) {
    let count = 0;
    for (let i = 1; i < 4; i++) {
        let nr = r + dr * i;
        let nc = c + dc * i;
        if (
            nr >= 0 && nr < rows &&
            nc >= 0 && nc < columns &&
            board[nr][nc] === player
        ) {
            count++;
        } else {
            break;
        }
    }
    return count;
}

// Get a random valid column
function getRandomMove() {
    let validCols = [];
    for (let c = 0; c < columns; c++) {
        if (currColumns[c] >= 0) validCols.push(c);
    }
    if (validCols.length === 0) return null;
    return validCols[Math.floor(Math.random() * validCols.length)];
}

// Add sound on game over
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";
    } else {
        winner.innerText = "Yellow Wins";
    }
    document.getElementById("gameOverSound").play();
    gameOver = true;
}
