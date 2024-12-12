// call the elements from the html
const gameBoard = document.getElementById("gameboard");
const playerDisplay = document.getElementById("player");
const infoDisplay = document.getElementById("info-display");
const winnerDisplay = document.getElementById("winner");

// create the game board
const width = 8;
let playerGo = 'black'
playerDisplay.textContent = 'blacks'

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
    if (i >= 48) {
        square.firstChild?.firstChild?.classList.add('white')
    }
    
    gameBoard.append(square)
    
})
}
createBoard();


// here i code the squares draggable
const allSquares = document.querySelectorAll('.square')
// here i add the event listener to the squares
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
// here i create the dragStart & dragEnd functions
function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('squareid')
    draggedElement = e.target
    console.log('Start position:', startPositionId)
}
// here i create the dragOver function
function dragOver(e) {
    e.preventDefault()
}
// here i create the drop function
// i give the drop function the stopPropagation method to stop the event from bubbling up to the parent element

function dragDrop(e) {
    e.stopPropagation()
    
    // Fix target selection
    const target = e.target.classList.contains('square') ? e.target : e.target.parentNode
    
    // Check if the move is valid
    const correctGo = draggedElement.firstChild?.classList.contains(playerGo)
    const taken = target.hasChildNodes()
    const valid = checkValid(target)
    const opponent = playerGo === 'white' ? 'black' : 'white'
    const takenByOpponent = target.firstChild?.firstChild?.classList.contains(opponent)

    console.log('Drop target square:', target.getAttribute('squareid'))
    
    if(correctGo){
        if(takenByOpponent && valid){
            target.replaceChild(draggedElement, target.firstChild)
            checkForWin()
            if (!gameBoard.style.pointerEvents === 'none') {
                changePlayer()
            }
            return
        }

        if(taken && !takenByOpponent){
            infoDisplay.textContent = 'you cannot go here'
            setTimeout(() => infoDisplay.textContent = '', 2000)
            return
        }

        if(valid){
            target.appendChild(draggedElement)
            checkForWin()
            changePlayer()
            return
        }
    }
    
    if (infoDisplay) {
        infoDisplay.textContent = 'invalid move'
        setTimeout(() => infoDisplay.textContent = '', 2000)
    }
}
// here i create the checkValid function
function checkValid(target){
   const targetId = Number(target.getAttribute('squareid'))
   const startId = Number(startPositionId)
   const piece = draggedElement.id

   console.log('Move from:', startId, 'to:', targetId)
   console.log('Piece:', piece)
   // here i use switch statements to check the piece and the move
   // i use if statements to check the piece and the move
   // i use case statements to give the piece the correct move
   switch(piece){
// here i check if the piece is a pawn
// i give the pawn the correct move by checking the startRow and the targetId and the startId and the width 
    case 'pawn':
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
// here i check if the piece is a knight
// i give the knight the correct move by checking the startId and the targetId and the width
        case 'knight':
            if(
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
// here i check if the piece is a bishop
// i give the bishop the correct move by checking the startId and the targetId and the width
        case 'bishop':
            if (
                startId + width + 1 === targetId || 
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 6 + 6}"]`).firstChild||
                // -- 
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 - 3}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 - 4}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 - 5}"]`).firstChild ||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[squareid="${startId - width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 6 - 6}"]`).firstChild||
                //
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 + 4}"]`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 + 5}"]`).firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 6 + 6}"]`).firstChild||
                //
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
// here i check if the piece is a rook
// i give the rook the correct move by checking the startId and the targetId and the width
        case 'rook':
            if (
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4}"]`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5}"]`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 6}"]`).firstChild||

                // --
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4}"]`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5}"]`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 6}"]`).firstChild||
                //
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild||
                startId + 5 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + 4}"]`).firstChild||
                startId + 6 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + 5}"]`).firstChild||
                startId + 7 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + 6}"]`).firstChild||
                //
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
// here i check if the piece is a queen
// i give the queen the correct move by checking the startId and the targetId and the width
        case 'queen':
            // diagonal
            if(
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
                //
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 + 4}"]`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 + 5}"]`).firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[squareid="${startId - width + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 6 + 6}"]`).firstChild||
                //
                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3 - 3}"]`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4 - 4}"]`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5 - 5}"]`).firstChild || 
                startId + width * 7 - 7 === targetId && !document.querySelector(`[squareid="${startId + width - 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 6 - 6}"]`).firstChild||
                //
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4}"]`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5}"]`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[squareid="${startId + width}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + width * 6}"]`).firstChild||

                // --
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4}"]`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5}"]`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[squareid="${startId - width}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 2}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 3}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 4}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 5}"]`).firstChild && !document.querySelector(`[squareid="${startId - width * 6}"]`).firstChild||
                //
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild||
                startId + 5 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + 4}"]`).firstChild||
                startId + 6 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + 5}"]`).firstChild||
                startId + 7 === targetId && !document.querySelector(`[squareid="${startId + 1}"]`).firstChild && !document.querySelector(`[squareid="${startId + 2}"]`).firstChild && !document.querySelector(`[squareid="${startId + 3}"]`).firstChild && !document.querySelector(`[squareid="${startId + 4}"]`).firstChild && !document.querySelector(`[squareid="${startId + 5}"]`).firstChild && !document.querySelector(`[squareid="${startId + 6}"]`).firstChild||
                //
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
// here i check if the piece is a king
// i give the king the correct move by checking the startId and the targetId and the width
        case 'king':
            if(
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId - width === targetId ||
                startId + width - 1 === targetId ||
                startId + width + 1 === targetId ||
                startId - width - 1 === targetId ||
                startId - width + 1 === targetId
            ) {
                return true
            }
        
    }

} 

// here i create the changePlayer function
// i use if statements to check if the player is black or white and if it is, i change the player to the other color
function changePlayer() {
    if (playerGo === 'black') {
        reverseIds()
        playerGo = 'white' 
        playerDisplay.textContent = 'white'
    } else {
        reverseIds()
        playerGo = 'black'
        playerDisplay.textContent = 'black'
    }

    // Reset draggable attributes
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
// here i create the reversId function
// i use a for loop to reverse the id of the squares
function reverseIds() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => {
        square.setAttribute('squareid', (width * width - 1) - i)
    })
}
// here i create the checkForWin function
function checkForWin() {
    const kings = Array.from(document.querySelectorAll('#king'))
    console.log(kings)
    if (!kings.some(king => king.firstChild.classList.contains('white'))) {
        winner.textContent = 'black player wins'
    }
    if (!kings.some(king => king.firstChild.classList.contains('black'))) {
        winner.textContent = 'white player wins'
    }
}

