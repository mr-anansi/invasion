function setupGame() {
  const startButton = document.getElementById('start-button')
  const width = 21
  const spaceSize = width ** 2
  const space = document.querySelector('.space')
  const cells = []
  let bang1 = null
  let invasion = null
  let swarm = []
  let turret = 430
  let eT = [92, 93]
  //94, 95, 96, 114, 115, 116
  const theresALotOfEm = eT.length
  let baggage = ''
  let missileOne = null
  // let missileTwo = null
  // let missileThree = null
  let ammoCounter = 0
  let score = 0


  //edit functions. refactor it to change the eT array only
  //It appears as if I will have to create a function for all alien array alterations so that once the array is empty, the game is over
  //In order to create a game over condition when the swarm invades, I'll have to use a array method linked to the last row and the contents of the alien array.
  //in order to create a basic score condition, I'll assign a score increment for every instance of the alien array getting smaller.

  function eTMovesLeft() {
    eT = eT.map(elem => {
      return elem - 1
    })
    if (gotcha(eT)) {
      amIHit()
      rowZ1()
    }
    return swarm = eT.map(elem => {
      return cells[elem]
    })
  }


  function eTMovesRight() {
    eT = eT.map(elem => {
      return elem + 1
    })
    if (gotcha(eT)) {
      amIHit()
      rowZ1()
    }
    return swarm = eT.map(elem => {
      return cells[elem]
    })
  }

  function weReComing() {
    eT = eT.map(elem => {
      return elem + width
    })
    if (gotcha(eT)) {
      amIHit()
      rowZ1()
    }
    return swarm = eT.map(elem => {
      return cells[elem]
    })
  }

  function rowZ1() {
    clearInterval(bang1)
    cells[missileOne].classList.remove('missile')
    missileOne = null
    ammoCounter -= 1
  }

  // function rowZ2() {
  //   clearInterval(bang2)
  //   ammoCounter -= 1
  // }

  // function rowZ3() {
  //   clearInterval(bang3)
  //   ammoCounter -= 1
  // }

  function gotcha(array) {
    return array.some((ships) => {
      return missileOne === ships
    })
  }

  //scoring features

  function amIHit() {
    eT = eT.filter((alien) => {
      return alien !== missileOne
    })
    score = scoreBoard()
    if (eT.length === 0) {
      clearInterval(invasion)
      clearInterval(bang1)
      alert(`You got 'em! Game Over!\n Your score is ${score}`)
    }
  }

  function scoreBoard() {
    return (theresALotOfEm - eT.length) * 10
  }

  function shouldWeGoLeft(array) {
    return array.some((element) => {
      return (element - (width - 1)) % width === 0
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


    //intial thoughts on the multiple class change is that it will not add the correct syntax for multiple class adds. in fact, i've already tried this 
    //without a variable name. use a  forEach

    invasion = setInterval(() => {
      // cells[eT].classList.remove('theFirst')
      //end screen conditionals
      //We're first going to get the swarm to move from side to side and then rework the conditionals on the basis that the outside will not always be an indicator of turnaround.
      //I've had an idea for the reduction of code...a reduce function could give me a string of the class values to check, add to and remove.
      //functions could be useful in reworking conditionals. Consider when to refactor after missile.
      console.log(score)
      if (eT[0] % width === 0 && swarm[0].classList.contains('left')) {
        swarm.forEach(div => {
          div.classList.remove('left')
        })
        swarm.forEach(div => {
          baggage = div.className.split(' ')
          baggage = baggage.filter(classStr => {
            return classStr !== 'missile'
          })
          baggage.forEach(classStr => {
            div.classList.remove(`${classStr}`)
          })
        })
        weReComing()
        //should this be nested? should I just be dealing with classes here?
        return swarm.forEach(div => {
          baggage.forEach(classStr => {
            div.classList.add(`${classStr}`)
          })
        })
        //work on following if logic works
        //   /*worked above line*/
        /*

        

        */
      } else if (shouldWeGoLeft(eT) && !swarm[0].classList.contains('left')) {
        swarm.forEach(div => {
          baggage = div.className.split(' ')
          baggage = baggage.filter(classStr => {
            return classStr !== 'missile'
          })
          baggage.forEach(classStr => {
            div.classList.remove(`${classStr}`)
          })
        })
        weReComing()
        swarm.forEach(div => {
          div.classList.add('left')
        })

        // cells[eT].classList.add('left')
        return swarm.forEach(div => {
          baggage.forEach(classStr => {
            div.classList.add(`${classStr}`)
          })
        })
      }
      //constant movement conditionals
      if (swarm[0].classList.contains('left')) {
        swarm.forEach(div => {
          baggage = div.className.split(' ')
          baggage = baggage.filter(classStr => {
            return classStr !== 'missile'
          })
          baggage.forEach(classStr => {
            div.classList.remove(`${classStr}`)
          })
        })
        eTMovesLeft()

        return swarm.forEach(div => {
          baggage.forEach(classStr => {
            div.classList.add(`${classStr}`)
          })
        })
      } else {
        swarm.forEach(div => {
          baggage = div.className.split(' ')
          baggage = baggage.filter(classStr => {
            return classStr !== 'missile'
          })
          baggage.forEach(classStr => {
            div.classList.remove(`${classStr}`)
          })
        })
        eTMovesRight()
        swarm.forEach(div => {
          baggage.forEach(classStr => {
            div.classList.add(`${classStr}`)
          })
        })
      }
    }, 600)





    //this is an array example with an event listener
    // player.forEach(beat => {
    //   beat.addEventListener('click', (e) => {
    //     audio.src = e.target.value
    //     audio.play()
    //   })
    // })

    // ==============================Movement ==============================================================
    document.onkeydown = function (e) {
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
        //set up missile here

        /*
      Let's get one to fire first
      Event Listener
      let missile = turret + 1
      then set interval
      set 'set interval' to a variable
      missile += width
      write conditionals
      first basic condition
      if missile is < 20 then cease interval
      */

        case (32): {
          console.log(ammoCounter)
          //make sure you change all names as we go. also change the interval names. also add way to reduce ammo counter (reduce by one)
          if (ammoCounter === 0) {
            ammoCounter += 1
            missileOne = turret - width
            cells[missileOne].classList.add('missile')
            bang1 = setInterval(() => {
              console.log(missileOne)
              cells[missileOne].classList.remove('missile')
              missileOne = missileOne - width
              //new code to evaluate (simulating hit)
              if (gotcha(eT)) {
                amIHit()
                // eT = eT.filter((alien) => {
                //   return alien !== missileOne
                // })
                cells[missileOne].classList.remove('missile')
                // cells[missileOne].classList.remove('theFirst')
                return rowZ1()
              }
              cells[missileOne].classList.add('missile')
              if (missileOne < width) {
                rowZ1()
              }
            }, 200)
            //This following code will be useful for return fire. However for now it is not relevant as player shoots once
            // } else if (ammoCounter === 1) {
            //   ammoCounter += 1
            //   missileTwo = turret - width
            //   cells[missileTwo].classList.add('missile')
            //   bang2 = setInterval(() => {
            //     console.log(missileTwo)
            //     cells[missileTwo].classList.remove('missile')
            //     missileTwo = missileTwo - width
            //     cells[missileTwo].classList.add('missile')
            //     if (missileTwo < width) {
            //       cells[missileTwo].classList.remove('missile')
            //       rowZ2()
            //     }
            //   }, 200)
            // } else if (ammoCounter === 2) {
            //   ammoCounter += 1
            //   missileThree = turret - width
            //   cells[missileThree].classList.add('missile')
            //   bang3 = setInterval(() => {
            //     console.log(missileThree)
            //     cells[missileThree].classList.remove('missile')
            //     missileThree = missileThree - width
            //     cells[missileThree].classList.add('missile')
            //     if (missileThree < width) {
            //       cells[missileThree].classList.remove('missile')
            //       rowZ3()
            //     }
            //   }, 200)
          } else return
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

  })



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