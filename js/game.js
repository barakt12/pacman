'use strict'
const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '🥑'
const CHERRY = '🍒'
const EMPTY = ' '

var gBoard
var gFoodCount = 0

var gGame = {
  score: 0,
  isOn: false,
}

function init() {
  gBoard = buildBoard()
  createPacman(gBoard)
  createGhosts(gBoard)
  ghostColors()
  printMat(gBoard, '.board-container')
  renderCell(gGhosts[0].location, getGhostHTML(gGhosts[0]))
  gGame.isOn = true
  spawnCherry()
}

function buildBoard() {
  const SIZE = 10
  var board = []
  for (var i = 0; i < SIZE; i++) {
    board.push([])
    for (var j = 0; j < SIZE; j++) {
      if ((i === 1 || i === SIZE - 2) && (j === 1 || j === SIZE - 2)) {
        board[i][j] = SUPER_FOOD
      } else {
        board[i][j] = FOOD
        gFoodCount++
      }
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL
        gFoodCount--
      }
    }
  }
  return board
}

function updateScore(diff) {
  // DONE: update model and dom
  // Model
  gGame.score += diff
  //DOM
  document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
  console.log('Game Over')
  // TODO
  clearInterval(gIntervalGhosts)
  renderCell(gPacman.location, '💀')
  gGame.isOn = false
  showModal(gFoodCount)
}

function showModal(foodCount) {
  var modal = document.querySelector('.modal')
  modal.style.display = 'block'
  var modalText = foodCount === 1 ? 'Victorious' : 'Game Over!'
  modal.innerHTML = `<div>${modalText}</div><button class="restart" onclick="restartGame()">Play Again</button>`
}

function hideModal() {
  var modal = document.querySelector('.modal')
  modal.style.display = 'none'
}

function checkVictory() {
  if (gFoodCount === 1) {
    showModal(gFoodCount)
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
  }
}
function restartGame() {
  gFoodCount = 0
  gGame.score = 0
  colors = []
  gDeadGhosts = []
  gGhosts = []
  updateScore(0)
  hideModal()
  init()
}

function spawnCherry() {
  var cherryInterval = setInterval(() => {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
      for (var j = 0; j < gBoard[0].length; j++) {
        if (gBoard[i][j] === EMPTY) {
          emptyCells.push({ i, j })
        }
      }
    }
    var randomCell = pickRandom(emptyCells)
    gBoard[randomCell.i][randomCell.j] = CHERRY
    renderCell(randomCell, CHERRY)
  }, 15000)
  if (!gGame.isOn) clearInterval(cherryInterval)
}
