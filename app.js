// call the elements from the html to use them in the javascript
const gameBoard = document.getElementById("gameboard");
const playerDisplay = document.getElementById("player");
const infoDisplay = document.getElementById("info-display");
const winnerDisplay = document.getElementById("winner");
const resetButton = document.getElementById("reset");

// create the game board and the player
const width = 8;
let playerGo = 'black'
playerDisplay.textContent = 'blacks'
/* create the start pieces
 array of the start pieces 64 elements
 */
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

/* make the board active by creating the function
 i use the startPieces array to create the board and give the pieces the correct color and the correct row by using the row variable 
 i use if statements to check the row and the color of the square
 i check if the piece is black and if it is, i add the black class to the piece
 i check if the piece is white and if it is, i add the white class to the piece 
 */
function createBoard() {
startPieces.forEach((startPiece, i) => {
    const square = document.createElement("div")
    square.classList.add("square")
    square.innerHTML = startPiece
    square.firstChild && square.firstChild.setAttribute('draggable', true)
    square.setAttribute('squareid', i)
    const row = Math.floor((63-i)/8)
    if (row % 2 === 0) {
        square.classList.add(i % 2 === 0 ? 'beige' : 'brown')
    } else {
        square.classList.add(i % 2 === 0 ? 'brown' : 'beige')
    }
    if (i <= 15){
        square.firstChild.firstChild.classList.add('black')
    }
    if (i >= 48) {
        square.firstChild?.firstChild?.classList.add('white')
    }
    
    gameBoard.append(square)
    
})
}
createBoard();
/* here i create the startPositionId & draggedElement variables
 i create the dragStart & dragEnd functions
 i create the dragOver function
 i create the dragDrop function
 */
const allSquares = document.querySelectorAll('.square')
allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
    square.addEventListener('dragend', (e) => {
        e.preventDefault()
    })
})
// here i create the startPositionId & draggedElement variables 
let startPositionId 
let draggedElement
// dragStart function
function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('squareid')
    draggedElement = e.target
    console.log('Start position:', startPositionId)
}
// dragOver function
function dragOver(e) {
    e.preventDefault()
}
// dragDrop function
function dragDrop(e) {
    e.stopPropagation()
    if (gameBoard.classList.contains('game-over')) {
        return
    }
    
    const target = e.target.classList.contains('square') ? e.target : e.target.parentNode
    const correctGo = draggedElement.firstChild?.classList.contains(playerGo)
    const taken = target.hasChildNodes()
    const valid = checkValid(target)
    const opponent = playerGo === 'white' ? 'black' : 'white'
    const takenByOpponent = target.firstChild?.firstChild?.classList.contains(opponent)

    console.log('Drop target square:', target.getAttribute('squareid'))
    
    if(correctGo){
        if(takenByOpponent && valid){
            // i replace the piece with the dragged piece
            //must check this first
            target.replaceChild(draggedElement, target.firstChild)
            checkForWin()
            if (!gameBoard.style.pointerEvents === 'none') {
                changePlayer()
            }
            return
        }
        if(valid){
            // i check if the move is valid
            target.appendChild(draggedElement)
            checkForWin()
            changePlayer()
            return
        }
    }
}
// here i create the updatePlayerDisplay function
function updatePlayerDisplay() {
    if (playerDisplay) {
        if (playerGo === 'black') {
            playerDisplay.textContent = blackPlayerName + "'s turn";
        } else {
            playerDisplay.textContent = whitePlayerName + "'s turn";
        }
    }
}
// here i create the checkValid function
    function checkValid(target){
        const targetId = Number(target.getAttribute('squareid'))
        const startId = Number(startPositionId)
        const piece = draggedElement.id

    console.log('Move from:', startId, 'to:', targetId)
    console.log('Piece:', piece)

    // in chess game we have 8 pieces and each piece has a different move
    // i create the switch statement to check the piece and the move
    /*  pawn move
    i give the pawn the correct move by checking the startRow and the targetId and the startId and the width 
    i create the startRow variable
    i create the if statement to check the move
    i create the return statement to return the move
    i create the break statement to break the switch statement
    */
    /* knight move
    i create the return statement to return the move
    i create the break statement to break the switch statement
    */
    /* bishop move
    i create the if statement to check the move
    i create the return statement to return the move
    i create the break statement to break the switch statement
    */
    /* rook move
    i create the if statement to check the move
    i create the return statement to return the move
    i create the break statement to break the switch statement
    */
    /* queen move
    i create the return statement to return the move
    i create the break statement to break the switch statement
    */
    /* king move
    i create the if statement to check the move
    i create the return statement to return the move
    i create the break statement to break the switch statement
*/
   switch(piece){
    case 'pawn':
        // i give the pawn the correct move by checking the startRow and the targetId and the startId and the width 
        const startRow = [8,9,10,11,12,13,14,15]
        if(
            startRow.includes(startId) && startId + width * 2 === targetId ||
            startId + width === targetId ||
            startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
            startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild
        ) {
            return true
        }
        break;
        case 'knight':
            if(
                // i give the knight the correct move by checking the startId and the targetId and the width
                startId + width * 2 + 1 === targetId ||
                startId + width * 2 - 1 === targetId ||
                startId + width - 2 === targetId ||
                startId + width + 2 === targetId ||
                startId - width * 2 + 1 === targetId ||
                startId - width * 2 - 1 === targetId ||
                startId - width - 2 === targetId ||
                startId - width + 2 === targetId
            ) {
                return true
            }
            break;
        case 'bishop':
            if (
                // forward diagonal
                startId + width + 1 === targetId || 
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 6 + 6}"]`).firstChild||
                // reverse diagonal
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 - 3}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 - 4}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 - 5}"]`).firstChild ||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 6 - 6}"]`).firstChild||
                // right diagonal
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 + 4}"]`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 + 5}"]`).firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 6 + 6}"]`).firstChild||
                // left diagonal
                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3 - 3}"]`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4 - 4}"]`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5 - 5}"]`).firstChild || 
                startId + width * 7 - 7 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 6 - 6}"]`).firstChild
            ) 
            {
                return true
            }
            break;
        case 'rook':
            if (
                // forward 
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4}"]`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5}"]`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 6}"]`).firstChild||
                // backward
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4}"]`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5}"]`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 6}"]`).firstChild||
                // right
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild||
                startId + 5 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + 4}"]`).firstChild||
                startId + 6 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + 5}"]`).firstChild||
                startId + 7 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + 6}"]`).firstChild||
                // left
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[squareid="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[squareid="${startId - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[squareid="${startId - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - 3}"]`).firstChild||
                startId - 5 === targetId && !document.querySelector(`[squareid="${startId - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - 4}"]`).firstChild||
                startId - 6 === targetId && !document.querySelector(`[squareid="${startId - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - 5}"]`).firstChild||
                startId - 7 === targetId && !document.querySelector(`[squareid="${startId - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - 6}"]`).firstChild

            ) {
                return true
            }
            break;
        case 'queen':
            if(
                // forward diagonal
                startId + width + 1 === targetId || 
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 6 + 6}"]`).firstChild||
                // reverse diagonal
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 - 3}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 - 4}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 - 5}"]`).firstChild ||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 6 - 6}"]`).firstChild||
                // right diagonal
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 + 4}"]`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 + 5}"]`).firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 6 + 6}"]`).firstChild||
                // left diagonal
                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3 - 3}"]`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4 - 4}"]`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5 - 5}"]`).firstChild || 
                startId + width * 7 - 7 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 6 - 6}"]`).firstChild||
                // forward 
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4}"]`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5}"]`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 6}"]`).firstChild||
                // backward
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4}"]`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5}"]`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 6}"]`).firstChild||
                // right
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild||
                startId + 5 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + 4}"]`).firstChild||
                startId + 6 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + 5}"]`).firstChild||
                startId + 7 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + 6}"]`).firstChild||
                // left
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[squareid="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[squareid="${startId - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[squareid="${startId - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - 3}"]`).firstChild||
                startId - 5 === targetId && !document.querySelector(`[squareid="${startId - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - 4}"]`).firstChild||
                startId - 6 === targetId && !document.querySelector(`[squareid="${startId - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - 5}"]`).firstChild||
                startId - 7 === targetId && !document.querySelector(`[squareid="${startId - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - 6}"]`).firstChild

            ) {
                return true
            }
            break;
        case 'king':
            if(
                // forward
                startId + 1 === targetId ||
                // backward
                startId - 1 === targetId ||
                // right
                startId + width === targetId ||
                // left
                startId - width === targetId ||
                // forward right
                startId + width - 1 === targetId ||
                // forward left
                startId + width + 1 === targetId ||
                // backward right
                startId - width - 1 === targetId ||
                // backward left
                startId - width + 1 === targetId
            ) {
                return true
            }
        
    }

} 

/* 
    here i create the changePlayer function
    i use if statements to check if the player is black or white and if it is, i change the player to the other player
    i also change the id of the squares to the other player
    */
    function changePlayer() {
        if (playerGo === 'black') {
            reverseIds()
            playerGo = 'white' 
        } else {
            reverseIds()
            playerGo = 'black'
        }
        updatePlayerDisplay(); // Update the player display with the current player's name
    
        // here i check if the piece is the same color as the player and if it is, i make the piece draggable
        document.querySelectorAll('.square').forEach(square => {
            const piece = square.firstChild
            if (piece) {
                if (piece.firstChild?.classList.contains(playerGo)) {
                    piece.setAttribute('draggable', true)
                } else {
                    piece.setAttribute('draggable', false)
                }
            }
        })
    }
/* 
    here i create the reverseIds function
    i use a for loop to reverse the id of the squares
*/
function reverseIds() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => {
        square.setAttribute('squareid', (width * width - 1) - i)
    })
}
/* 
    here i create the checkForWin function
    i use the endGame function to check if the game is over
*/
function checkForWin() {
    return endGame()
}

/* 
    here i create the reset function
    i use the reset button to reset the game
*/
function reset() {
    // Clear the game board
    if (gameBoard) {
        gameBoard.innerHTML = '';
    }
    
    // Reset displays - add null checks
    if (winner) {
        winner.textContent = '';
    }
    if (infoDisplay) {
        infoDisplay.textContent = '';
    }
    
    playerGo = 'black';
    if (playerDisplay) {
        playerDisplay.textContent = 'blacks';
    }
    
    // Recreate the board with initial pieces
    createBoard();
    
    // Reattach event listeners to the new squares
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => {
        square.addEventListener('dragstart', dragStart);
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', dragDrop);
        square.addEventListener('dragend', (e) => {
            e.preventDefault();
        });
    });
}

// Make sure the reset button exists before adding the event listener
if (resetButton) {
    resetButton.addEventListener('click', reset);
}

function endGame() {
    const kings = Array.from(document.querySelectorAll('#king'))
    
    function freezeBoard() {
        // Remove all event listeners from squares
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => {
            square.removeEventListener('dragstart', dragStart)
            square.removeEventListener('dragover', dragOver)
            square.removeEventListener('drop', dragDrop)
        })
        
        // Disable dragging on all pieces
        const allPieces = document.querySelectorAll('.square div')
        allPieces.forEach(piece => {
            if (piece) {
                piece.setAttribute('draggable', false)
            }
        })
        
        // Disable the entire board
        if (gameBoard) {
            gameBoard.style.pointerEvents = 'none'
            gameBoard.classList.add('game-over')
        }
        
        // Update player display
        if (playerDisplay) {
            playerDisplay.textContent = 'Game Over'
        }
    }
    
    if (!kings.some(king => king.firstChild?.classList.contains('white'))) {
        if (winner) {
            winner.textContent = 'Black Player Wins!'
        }
        if (infoDisplay) {
            infoDisplay.textContent = 'Game Over - Click Reset to Play Again'
        }
        freezeBoard()
        return true
    }
    
    if (!kings.some(king => king.firstChild?.classList.contains('black'))) {
        if (winner) {
            winner.textContent = 'White Player Wins!'
        }
        if (infoDisplay) {
            infoDisplay.textContent = 'Game Over - Click Reset to Play Again'
        }
        freezeBoard()
        return true
    }
    
    return false
}

// here i create the submitPlayer1 and submitPlayer2 functions
// i use the submit button to submit the player name
// i use the input value to get the player name
// i use the player display to display the player name
// i use the input value to get the player name
// i use the input value to get the player name
const submitPlayer1 = document.querySelector("#submit-player1");
const submitPlayer2 = document.querySelector("#submit-player2");
const player1Element = document.querySelector("#player1-display");
const player2Element = document.querySelector("#player2-display");
const inputValue1 = document.querySelector("#player1");
const inputValue2 = document.querySelector("#player2");

// Initialize player names
let blackPlayerName = "Black Player";
let whitePlayerName = "White Player";

// Add event listeners for player name submission
if (submitPlayer1 && inputValue1 && player1Element) {
    submitPlayer1.addEventListener("click", () => {
        if (inputValue1.value.trim() !== "") {
            blackPlayerName = inputValue1.value;
            player1Element.textContent = `Black Player: ${blackPlayerName}`;
            updatePlayerDisplay(); // Update the main player display
        }
    });
}

if (submitPlayer2 && inputValue2 && player2Element) {
    submitPlayer2.addEventListener("click", () => {
        if (inputValue2.value.trim() !== "") {
            whitePlayerName = inputValue2.value;
            player2Element.textContent = `White Player: ${whitePlayerName}`;
            updatePlayerDisplay(); // Update the main player display
        }
    });
}

