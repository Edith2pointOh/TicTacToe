function test(){
    console.log("working")
}

test();

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

function getX(i) {
    return Math.floor(i/3);
}

function getY(i) {
    return i % 3;
}

function processBoard(gameboard) {
    let winner = isRowComplete(gameboard);
    if (winner) {
        endGame(winner + ' won');
        return;
    } 
    winner = isColumnComplete(gameboard);
    if (winner) {
        endGame(winner + ' won');
        return;
    }
    winner = isDiagonalComplete(gameboard);
    if (winner) {
        endGame(winner + ' won');
        return;
    }
    if (isBoardFull(gameboard)) {
        endGame('There is no winner');
    }

}
