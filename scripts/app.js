function setupGame() {
  const startButton = document.getElementById('start-button')
  const width = 21
  const spaceSize = width ** 2
  const space = document.querySelector('.space')
  const cells = []
  let turret = 430
  let eT = 94
  let baggage = ''

  function eTMovesLeft() {
    return eT -= 1
  }


  function eTMovesRight() {
    return eT += 1
  }

  function weReComing() {
    return eT += 21
  }

  startButton.addEventListener('click', () => {
    space.style.display = 'flex'
    for (let i = 0; i < spaceSize; i++) {
      const cell = document.createElement('div')
      space.appendChild(cell)
      cells.push(cell)
      startButton.style.display = 'none'
    }
    cells[turret].classList.add('turret')
    cells[eT].classList.add('theFirst')
    cells[eT].classList.add('left')

    //intial thoughts on the multiple class change is that it will not add the correct syntax for multiple class adds. in fact, i've already tried this 
    //without a variable name. use a  forEach

    /*const invasion = */ setInterval(() => {
      // cells[eT].classList.remove('theFirst')
      if (eT % width === 0 && cells[eT].classList.contains('left')) {
        cells[eT].classList.remove('left')
        baggage = cells[eT].className.split(' ')
        //array method here
        baggage.array.forEach(classStr => {
          cells[eT].classList.remove(`${classStr}`)
        })
        cells[eT].classList.remove(`${baggage}`)
        // console.log('running')
        weReComing()
        return cells[eT].classList.add(`${baggage}`)
      } else if ((eT - (width - 1)) % width === 0 && !cells[eT].classList.contains('left')) {
        // console.log('running-left')
        baggage = cells[eT].className
        cells[eT].classList.remove(`${baggage}`)
        weReComing()
        cells[eT].classList.add('left')
        return cells[eT].classList.add(`${baggage}`)
      }
      if (cells[eT].classList.contains('left')) {
        cells[eT].classList.remove('theFirst')
        cells[eT].classList.remove('left')
        eTMovesLeft()
        cells[eT].classList.add('left')
      } else {
        cells[eT].classList.remove('theFirst')
        eTMovesRight()
      }
      cells[eT].classList.add('theFirst')
      console.log(cells[eT].className)
    }, 500)


    /*baggage = cells[eT].className
    cells[eT].className = `$baggage`*/


    //this is an array example with an event listener
    // player.forEach(beat => {
    //   beat.addEventListener('click', (e) => {
    //     audio.src = e.target.value
    //     audio.play()
    //   })
    // })
  })

  document.onkeydown = function (e) {
    // console.log(e.keyCode)
    switch (e.keyCode) {
      case (37):
      case (65): {
        if (turret === ((width ** 2) - width)) {
          // console.log(e.keyCode)
          console.log(turret)
          return
        }
        cells[turret].classList.remove('turret')
        turret = turret - 1
        cells[turret].classList.add('turret')
        console.log(turret)
        break
      }
      case (68):
      case (39): {
        if (turret === ((spaceSize) - 1)) {
          console.log(turret)
          return
        }
        cells[turret].classList.remove('turret')
        turret = turret + 1
        cells[turret].classList.add('turret')
        console.log(turret)
        break
      }
      /*Eliminate this code when you're finished with the mapping of items on the board*/
      case (38): {
        if (turret < width) {
          console.log(turret)
          return
        }
        cells[turret].classList.remove('turret')
        turret = turret - width
        cells[turret].classList.add('turret')
        console.log(turret)
        break
      }
      case (40): {
        if (turret > ((spaceSize) - width - 1)) {
          console.log(turret)
          return
        }
        cells[turret].classList.remove('turret')
        turret = turret + width
        cells[turret].classList.add('turret')
        console.log(turret)
        break
      }
      /*Eliminate this code when you're finished with the mapping of items on the board*/
    }
  }


  // const width = 10
  // const gridSize = width ** 2
  // const grid = document.querySelector('.grid')
  // const cells = []
  // let player = 5

  // for (let i = 0; i < gridSize; i++) {
  //   const cell = document.createElement('div')
  //   grid.appendChild(cell)
  //   cell.addEventListener('click', () => {
  //     cell.classList.toggle('player')
  //   })
  //   cells.push(cell)
  // }

  // cells[player].classList.add('player')

  // document.addEventListener('keyup', (e) => {
  //   switch (e.key) {
  //     case 'w': {
  //       if (player < width) {
  //         return
  //       }
  //       cells[player].classList.remove('player')
  //       player = player - width
  //       cells[player].classList.add('player')
  //       break
  //     }
  //     case 's': {
  //       if (player > ((gridSize) - width - 1)) {
  //         return
  //       }
  //       cells[player].classList.remove('player')
  //       player = player + width
  //       cells[player].classList.add('player')
  //       console.log(player)
  //       break
  //     }
  //     case 'a': {
  //       if (player === 0) {
  //         return
  //       }
  //       cells[player].classList.remove('player')
  //       player = player - 1
  //       cells[player].classList.add('player')
  //       break
  //     }
  //     case 'd': {
  //       if (player === ((gridSize) - 1)) {
  //         return
  //       }
  //       cells[player].classList.remove('player')
  //       player = player + 1
  //       cells[player].classList.add('player')
  //       break
  //     }
  //   }

  // })

}

document.addEventListener('DOMContentLoaded', setupGame)

/*
-The game will as usual be initialised inside a function thats run when the DOM loads-

The first thing we'll need to have is an initialisation action. In order to do this we'll
need an event listener that handles the create game sequence. Once clicked, we'd like this
option to be unavailable and for the grid to load.

Inital research indicates that the wave should be 11 enemies long and 5 rows. In order to
achieve an a mvp of some sort we'd like to map each enemy to a grid square and give our player
enough time to attempt to score points.

We'll start with a standard number and move the wave an initial 5 places. Our wave will need to
start centered and so this equates to 11 + 5 either way. Our grid will then be 21 squares across.

We'll initalise our grid along the same lines as our first grid game tutorial

if we start our wave 5 lines down,
21 squares - 5 lines = 16 rows
16 rows- 5 enemy lines = 11 space rows

then account for the player(1)
11-1 = 10

The wave will move through 10 oscillations.

lets think about the creation of our wave and player on the board now.

Player
Firstly, we can keep track of our player by changing the backing image to a dark colour. Our player
has limited movement and cannot move along the y-axis. This means that we can forget about that action
for the time being. Our player will move left and right by an event listener that considers the key
press (or release) of the left and right arrow keys. When the directional buttons are used the class
will be removed from the appropriate gridbox (using array number) and added to the next one. A
restriction will be placed on the array values that can be cycled through to fix the player to the
bottom line.

Aliens
Second, we will create our wave of enemies. This will be created though applying a different colour
class to the grid boxes that correlate to the array of 5 lines down, 5 lines away from margin on both
sides and 5 rows deep. The wave will exist as a class. This class will be attributed to start with and
movement will be simulated by applying changes to the class.

The wave will move on a set interval which will enable the codition for a change in equation when a class
is entered into one of the array (gridboxes on the left/right sides) (for change of direction). Once the
wave reaches these boxes, an introduction of a single y-axis move will be enacted as well.

Missile
A missile can be constructed using a class attribute as well. The origin position will be linked to the
player array number. The missile will then move along the y-axis on a set interval. A condition will be
set in which, if the classList includes x, then remove all classes. The else will have it continue to the
barrier and then be removed.

Scoring conditions
Scoring conditions will be set to the condition action on the missile.

In addition, a next level or pause as
an initial start will be attributed to no classlist of enemy present.

If any enemy class reaches the player array values then game over will be alerted.


These will be the initial conditions before return fire is created.

Once this is created, a condition will be set which mimics our missile logic but changes a variable life
once the class reaches the grid with the player class.






*/