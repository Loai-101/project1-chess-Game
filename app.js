// call the elements from the html
const startGameButton = document.getElementById("start-game");
const player1NameInput = document.getElementById("player1-name");
const player2NameInput = document.getElementById("player2-name");
const gameBoard = document.getElementById("game-board");
const score = document.getElementById("score");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
const turn = document.getElementById("turn");
const resetButton = document.getElementById("reset");


// create the game board
const width = 8;
let playerGo = 'black'


const startPieces = [
    rook,knight,bishop,queen,king,bishop,knight,rook,
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    rook,knight,bishop,queen,king,bishop,knight,rook,
]


// make the board active by creating the function
function createBoard() {
startPieces.forEach((startPiece, i) => {
    const square = document.createElement("div")
    square.classList.add("square")
    square.innerHTML = startPiece
// here i make the piece draggable
// i use if statements to check if the piece is draggable
    square.firstChild && square.firstChild.setAttribute('draggable', true)
    square.setAttribute('squareid', i)
 // here i use if statements to check the row and the color of the square
    const row = Math.floor((63-i)/8)
    if (row % 2 === 0) {
        square.classList.add(i % 2 === 0 ? 'beige' : 'brown')
    } else {
        square.classList.add(i % 2 === 0 ? 'brown' : 'beige')
    }
 // here i check if the piece is black and if it is, i add the black class to the piece
    if (i <= 15){
        square.firstChild.firstChild.classList.add('black')
    }
// here i check if the piece is white and if it is, i add the white class to the piece
    if (i >= 48){
        square.firstChild.firstChild.classList.add('white')
    }
    
    gameBoard.append(square)
    
})
}
createBoard();


// here i code the squares draggable
const allSquares = document.querySelectorAll('#game-board .square')
// here i add the event listener to the squares
allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})
// here i create the startPositionId & draggedElement variables
let startPositionId 
let draggedElement
// here i create the dragStart & dragEnd functions
function dragStart(e) {
    startPositionId= e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}
// here i create the dragOver function
function dragOver(e) {
    e.preventDefault()
}
// here i create the drop function
// i give the drop function the stopPropagation method to stop the event from bubbling up to the parent element

function dragDrop(e) {
    e.stopPropagation()
    console.log(e.target)
    const taken = e.target.classList.contains('piece')

   // e.target.parentNode.append(draggedElement)
   //e.target.append(draggedElement)
}

