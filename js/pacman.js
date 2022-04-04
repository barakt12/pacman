'use strict'
const PACMAN = '<img class="pacman" src="./image/pac.png">'

var gPacman
// var eventKey
function createPacman(board) {
  // DONE
  gPacman = {
    location: {
      i: 2,
      j: 2,
    },
    isSuper: false,
    direction: 0,
  }
  board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
  // eventKey = ev.key

  // DONE: use getNextLocation(), nextCell
  if (!gGame.isOn) return
  var nextLocation = getNextLocation(ev.key)
  var nextCell = gBoard[nextLocation.i][nextLocation.j]

  // DONE: return if cannot move
  if (nextCell === WALL) return
  // DONE: hitting a ghost?  call gameOver
  if (!gPacman.isSuper && nextCell === GHOST) {
    gameOver()
    return
  }
  if (gPacman.isSuper && nextCell === GHOST) {
    killGhost(nextLocation)
    // changeLocation(nextLocation)
    updateScore(10)
  }
  if (nextCell === CHERRY) updateScore(10)

  if (gPacman.isSuper && nextCell === SUPER_FOOD) return

  if (!gPacman.isSuper && nextCell === SUPER_FOOD) {
    // changeLocation(nextLocation)
    superMode()
    updateScore(1)
    // setTimeout(() => {
    //   gPacman.isSuper = false
    //   // reviveGhosts()
    // }, 5000)
  }

  if (nextCell === FOOD) {
    updateScore(1)
    gFoodCount--
    checkVictory()
  }
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
  // rotatePacMan(gPacman.location, EMPTY, eventKey)
  renderCell(gPacman.location, EMPTY)

  gPacman.location = nextLocation
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
  // rotatePacMan(gPacman.location, PACMAN, eventKey)
  renderCell(gPacman.location, getPacmanHTML())
}

function changeLocation(nextLocation) {
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
  // rotatePacMan(gPacman.location, EMPTY, eventKey)
  renderCell(gPacman.location, EMPTY)

  gPacman.location = nextLocation
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
  // rotatePacMan(gPacman.location, PACMAN, eventKey)
  renderCell(gPacman.location, getPacmanHTML())
}

function getNextLocation(eventKey) {
  // DONE: figure out nextLocation
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  }

  switch (eventKey) {
    case 'ArrowUp':
      nextLocation.i--
      gPacman.direction = 270
      break
    case 'ArrowRight':
      nextLocation.j++
      gPacman.direction = 0
      break
    case 'ArrowDown':
      nextLocation.i++
      gPacman.direction = 90
      break
    case 'ArrowLeft':
      nextLocation.j--
      gPacman.direction = 180
      break

    default:
      return null
  }

  return nextLocation
}

function superMode() {
  gPacman.isSuper = true
  for (var i = 0; i < gGhosts.length; i++) {
    gGhosts[i].color = 'blue'
    renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
  }
  setTimeout(() => {
    gPacman.isSuper = false
  }, 5000)
  for (var i = 0; i < colors.length; i++) {
    // debugger
    console.log(gGhosts[i])
    gGhosts[i].color = colors[i]
  }
}

function getPacmanHTML() {
  var transform = `rotate(${gPacman.direction}deg)`
  if (gPacman.direction === 180) transform = 'scaleX(-1)'
  return `<img style="transform: ${transform}" class="pacman" src="./image/pac.png">`
}
