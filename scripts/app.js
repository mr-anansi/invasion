function setupGame() {
  const startButton = document.getElementById('start-button')
  const width = 21
  const spaceSize = width ** 2
  const space = document.querySelector('.space')
  const cells = []
  let swarm = []
  let turret = 430
  let eT = [94, 95]
  let baggage = ''


  //edit functions. refactor it to change the eT array only

  function eTMovesLeft() {
    eT = eT.map(elem => {
      return elem - 1
    })
    return swarm = eT.map(elem => {
      return cells[elem]
    })
  }


  function eTMovesRight() {
    eT = eT.map(elem => {
      return elem + 1
    })
    return swarm = eT.map(elem => {
      return cells[elem]
    })
  }

  function weReComing() {
    eT = eT.map(elem => {
      return elem + width
    })
    return swarm = eT.map(elem => {
      return cells[elem]
    })
  }

  startButton.addEventListener('click', () => {
    //change of view
    space.style.display = 'flex'
    //initialisation of grid
    for (let i = 0; i < spaceSize; i++) {
      const cell = document.createElement('div')
      space.appendChild(cell)
      cells.push(cell)
      startButton.style.display = 'none'
    }
    //initialisation of player
    cells[turret].classList.add('turret')
    //initial assignment of alien array numbers to div cells
    swarm = eT.map(elem => {
      return cells[elem]
    })
    //initial application of class elements to alien divs 
    swarm.forEach(div => {
      div.classList.add('theFirst')
      div.classList.add('left')
    })

    console.log(swarm)

    //intial thoughts on the multiple class change is that it will not add the correct syntax for multiple class adds. in fact, i've already tried this 
    //without a variable name. use a  forEach

    /*const invasion = */ setInterval(() => {
      // cells[eT].classList.remove('theFirst')
      //end screen conditionals
      //We're first going to get the swarm to move from side to side and then rework the conditionals on the basis that the outside will not always be an indicator of turnaround.
      //I've had an idea for the reduction of code...a reduce function could give me a string of the class values to check, add to and remove.
      if (eT[0] % width === 0 && swarm[0].classList.contains('left')) {
        swarm.forEach(div => {
          div.classList.remove('left')
        })
        swarm.forEach(div => {
          baggage = div.className.split(' ')
          baggage.forEach(classStr => {
            div.classList.remove(`${classStr}`)
          })
        })
        /*old code line-----------------------------------*/
        // baggage = cells[eT].className.split(' ')
        //array method here
        // baggage.forEach(classStr => {
        //   cells[eT].classList.remove(`${classStr}`)
        // })
        // console.log('running')
        /*old code line-----------------------------------*/
        weReComing()
        //should this be nested? should I just be dealing with classes here?
        return swarm.forEach(div => {
          baggage.forEach(classStr => {
            div.classList.add(`${classStr}`)
          })
        })
        //work on following if logic works
        //   /*worked above line*/
        //   // baggage.forEach(classStr => {
        //   //   cells[eT].classList.add(`${classStr}`)
        //   // })
        // } else if ((eT - (width - 1)) % width === 0 && !cells[eT].classList.contains('left')) {
        //   // console.log('running-left')
        //   baggage = cells[eT].className.split(' ')
        //   baggage.forEach(classStr => {
        //     cells[eT].classList.remove(`${classStr}`)
        //   })
        //   weReComing()
        //   cells[eT].classList.add('left')
        //   return baggage.forEach(classStr => {
        //     cells[eT].classList.add(`${classStr}`)
        //   })
      }
      console.log(swarm[0].classList.contains('left'))
      //constant movement conditionals
      if (swarm[0].classList.contains('left')) {
        swarm.forEach(div => {
          baggage = div.className.split(' ')
          baggage.forEach(classStr => {
            div.classList.remove(`${classStr}`)
          })
        })
        //This is the old single alien code
        // baggage = cells[eT].className.split(' ')
        // baggage.forEach(classStr => {
        //   cells[eT].classList.remove(`${classStr}`)
        // })
        //-------------------------------
        console.log(eTMovesLeft())
        eTMovesLeft()

        swarm.forEach(div => {
          baggage.forEach(classStr => {
            div.classList.add(`${classStr}`)
          })
        })
        //this is old code for single
        // baggage.forEach(classStr => {
        //   cells[eT].classList.add(`${classStr}`)
        // })
      } 
      // else {
      //   baggage = cells[eT].className.split(' ')
      //   baggage.forEach(classStr => {
      //     cells[eT].classList.remove(`${classStr}`)
      //   })
      //   eTMovesRight()
      //   baggage.forEach(classStr => {
      //     cells[eT].classList.add(`${classStr}`)
      //   })
      // }
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

  // ==============================Movement ==============================================================
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