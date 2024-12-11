// call the elements from the html
const gameBoard = document.getElementById("gameboard");
const playerDisplay = document.getElementById("player");
const infoDisplay = document.getElementById("info-display");

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
    if (i >= 48){
        square.firstChild.firstChild.classList.add('white')
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
})
// here i create the startPositionId & draggedElement variables
let startPositionId 
let draggedElement
// here i create the dragStart & dragEnd functions
function dragStart(e) {
    startPositionId = e.target.closest('.square').getAttribute('squareid')
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
    const target = e.target.classList.contains('square') ? e.target : e.target.closest('.square')
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const valid = checkValid(target)
    const opponent = playerGo === 'white' ? 'black' : 'white'
    const takenByOpponent = e.target.firstChild?.classList.contains(opponent)

    console.log('Drop target square:', target.getAttribute('squareid'))
    if(correctGo){
        if(takenByOpponent && valid){
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            changePlayer()
            return
        }
        
        if(taken && !takenByOpponent){
            if (infoDisplay) {
                infoDisplay.textContent = 'you cannot go here'
                setTimeout(() => {
                    infoDisplay.textContent = ''
                }, 2000)
            }
            return
        }
        
        if(valid){
            e.target.append(draggedElement)
            changePlayer()
            return
        }
    } 
}

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
   }
   return false
} 










// here i create the changePlayer function
// i use if statements to check if the player is black or white and if it is, i change the player to the other color
function changePlayer() {
   if (playerGo === 'black') {
    reversIds()
    playerGo = 'white' 
    playerDisplay.textContent = 'white'
   } else {
    reversIds()
    playerGo = 'black'
    playerDisplay.textContent = 'black'
   }
}
// here i create the reversId function
// i use a for loop to reverse the id of the squares
function reversIds() {
   const allSquares = document.querySelectorAll('.square')
   allSquares.forEach((square, i) => {
    square.setAttribute('square-id', (width * width -1) - i)
   })
}

function reversIds() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => square.setAttribute('square-id', i))
}

