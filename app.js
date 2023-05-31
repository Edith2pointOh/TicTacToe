
// The gameboard Array
const gameboard = [[null, null, null], [null, null, null], [null, null, null] ];

// false = o, true = x
let isX = false;

// Get reference to all the cell elements
const square = document.querySelectorAll(".grid-item");

// Add a click event listener to each cell
square.forEach(square => {
    square.addEventListener("click", handleSquareClick);
});

// Event handler function for square click event
function handleSquareClick(event) {
    const clickedSquare = event.target;
    const i = parseInt(event.target.dataset.index);
    const x = getX(i);
    const y = getY(i);
    gameboard[x][y] = isX;
    console.log(i)
    console.log(x, y)
    console.log(gameboard);

    // add CSS class to the clicked square
    if (isX) {
        clickedSquare.classList.add("cross");
    } else {
        clickedSquare.classList.add("circle");
    }
    isX = !isX;
    processBoard(gameboard);
    // Remove click event listener from the clicked square
    clickedSquare.removeEventListener("click", handleSquareClick);
}

const whosTurn = document.getElementById('whosTurn');

if (!isX) {
    whosTurn.innerHTML = "It is O's turn";
} else {
    whosTurn.innerHTML = "It is X's turn";
}

function getX(i) {
    return Math.floor(i/3);
}

function getY(i) {
    return i % 3;
}

// check if there are any winners or if gameboard is full
function processBoard(gameboard) {
    let winner = isRowComplete(gameboard);
    if (winner) {
        endGame(winner + 'won');
        return;
    } 
    winner = isColumnComplete(gameboard);
    if (winner) {
        endGame(`${winner} wins!`);
        return;
    }
    winner = isDiagonalComplete(gameboard);
    if (winner) {
        endGame(`${winner} wins!`);
        return;
    }
    if (isBoardFull(gameboard)) {
        endGame('There is no winner');
    }
}
function isRowComplete(gameboard) {
    for (let i = 0; i < gameboard.length; i++) {
        const row = gameboard[i];
        if (row.every(square => square === row[0] && row[0] !== null)) {
            return OorXforTheWin(row[0]);
        }
    }
}

function isColumnComplete(gameboard) {
    for (let i = 0; i < gameboard.length; i++) {
        const column = gameboard.map(row => row[i]);
        if (column.every(square => square === column[0] && column[0] !== null)) {
            return OorXforTheWin(column[0]);
        }
    }
}

function isDiagonalComplete(gameboard) {
    const diagonal1 = [gameboard[0][0], gameboard[1][1], gameboard[2][2]];
    if (diagonal1.every(square => square === diagonal1[0] && diagonal1[0] !== null)) {
        console.log("there's a diagonal winner")
        return OorXforTheWin(diagonal1[0]);
    }

    const diagonal2 = [gameboard[0][2], gameboard[1][1], gameboard[2][0]];
    if (diagonal2.every(square => square === diagonal2[0] && diagonal2[0] !== null)) {
        console.log("there's a diagonal winner")
        return OorXforTheWin(diagonal2[0]);
    }
}

function isBoardFull(gameboard) {
    let noWinner = '';
    for (let x = 0; x < gameboard.length; x++) {
        for (let y = 0; y < gameboard.length; y++) {
            if (gameboard[x][y] === null) {
                return;
            }
        }
   }
   noWinner = "Sorry, there is no winner";
   return noWinner;
}

// convert fasle to "O" and true to "x"
function OorXforTheWin(bool) {
    let winner = "";
    if (bool === false) {
        winner = "O";
    } else {
        winner = "X";
    }
    return winner;
}

function endGame(winner) {

    const endGameMessage = document.getElementById("endGame");
    endGameMessage.innerHTML = winner;

//remove event listener from all squares
    square.forEach(square => {
        square.removeEventListener("click", handleSquareClick);
    });

// display reset button and functionality 
    const resetBtn = document.getElementById("resetBtn");
    resetBtn.classList.remove("btnVisiblity");

}
