function setupGame() {
  const startButton = document.getElementById('start-button')
  const scoreElement = document.getElementById('scorecard')
  const gunTurrets = document.getElementById('lives')
  const heroPanel = document.querySelector('.title-hero')
  const playerLounge = document.querySelector('.high-scores')
  const begin = document.getElementById('new-game')
  const readInstructions = document.getElementById('open')
  const nameScreen = document.querySelector('.setting-up')
  const instructionsPanel = document.querySelector('.instructions')

  // hero to display none
  // inspired
  // h1


  const width = 21
  const spaceSize = width ** 2
  const space = document.querySelector('.space')
  const cells = []
  let bang1 = null
  let shell1 = null
  let shell2 = null
  let shell3 = null
  let invasion = null
  let skyBarrage = null
  let swarm = []
  let turret = 430
  let eT = [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 111, 112, 113, 114, 115, 116, 117, 118, 119, 133, 134, 135, 136, 137, 138, 139, 155, 156, 157, 158, 159, 177, 178, 179]
  const theresALotOfEm = eT.length
  let baggage = ''
  let missileOne = null
  let laserOne = null
  let laserTwo = null
  let laserThree = null
  // let missileTwo = null
  // let missileThree = null
  let ammoCounter = 0
  let score = 0
  let frontline = null
  let enemyFire = null
  const enemyAmmo = [1, 2, 3]
  let life = 3
  let noLuck = 0
  let gameOver = false
  let gameLoad = false


  //edit functions. refactor it to change the eT array only
  //It appears as if I will have to create a function for all alien array alterations so that once the array is empty, the game is over
  //In order to create a game over condition when the swarm invades, I'll have to use a array method linked to the last row and the contents of the alien array.
  //in order to create a basic score condition, I'll assign a score increment for every instance of the alien array getting smaller.



  function spaceGunners(array) {
    frontline = array.filter(aliens => {
      let friendly = aliens + width
      return !!friendly !== eT.some(alien => {
        return friendly === alien
      })
    })
    if (frontline[Math.round(Math.random() * (frontline.length - 1))]) {
      return frontline[Math.round(Math.random() * (frontline.length - 1))]
    } else return Math.round(Math.random() * (eT.length - 1))
  }

  function eTMovesLeft() {
    eT = eT.map(elem => {
      return elem - 1
    })
    if (gotcha(eT)) {
      cells[missileOne].classList.remove('theFirst')
      // amIHit()
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
      cells[missileOne].classList.remove('theFirst')
      // amIHit()
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
      cells[missileOne].classList.remove('theFirst')
      // amIHit()
    }
    if (imTheCaptainNow(eT)) {
      clearInterval(invasion)
      clearInterval(bang1)
      return alert(`The invaders have reached the surface! Game Over\n Your score is ${score}`)
    }
    return swarm = eT.map(elem => {
      return cells[elem]
    })
  }

  function rowZ1() {
    clearInterval(bang1)
    setTimeout(() => {
      cells[missileOne].classList.remove('missile')
      missileOne = null
      ammoCounter -= 1
    }, 100)

  }

  function potShot() {
    clearInterval(shell1)
    if (laserOne === turret) {
      setTimeout(() => {
        // cells[laserOne].classList.remove('explosion')
        laserOne = null
        enemyAmmo.push(1)
      }, 800)
    } else {
      setTimeout(() => {
        cells[laserOne].classList.remove('laser')
        laserOne = null
        enemyAmmo.push(1)
      }, 100)
    }
  }

  function potShot2() {
    clearInterval(shell2)
    if (laserTwo === turret) {
      setTimeout(() => {
        // cells[laserTwo].classList.remove('explosion')
        laserTwo = null
        enemyAmmo.push(2)
      }, 800)
    } else {
      setTimeout(() => {
        cells[laserTwo].classList.remove('laser')
        laserTwo = null
        enemyAmmo.push(2)
      }, 100)
    }
  }

  function potShot3() {
    clearInterval(shell3)
    if (laserThree === turret) {
      setTimeout(() => {
        // cells[laserThree].classList.remove('explosion')
        laserThree = null
        enemyAmmo.push(3)
      }, 800)
    } else {
      setTimeout(() => {
        cells[laserThree].classList.remove('laser')
        laserThree = null
        enemyAmmo.push(3)
      }, 100)
    }
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

  function weReOutOfHere() {
    if (cells[laserThree]) {
      cells[laserThree].classList.remove('laser')
    }
    if (cells[laserTwo]) {
      cells[laserTwo].classList.remove('laser')
    }
    if (cells[laserOne]) {
      cells[laserOne].classList.remove('laser')
    }
    if (eT) {
      swarm.forEach(div => {
        div.classList.remove('theFirst')
      })
    }
    if (cells[missileOne]) {
      cells[missileOne].classList.remove('missile')
    }
  }

  function amIHit() {
    eT = eT.filter((alien) => {
      return alien !== missileOne
    })
    score = scoreBoard()
    if (eT.length === 0) {
      gameOver = true
      cells[missileOne].classList.remove('implosion')
      scoreElement.innerHTML = `Score : ${score}`
      gunTurrets.innerHTML = `Lives : ${life}`
      clearInterval(invasion)
      clearInterval(bang1)
      clearInterval(shell1)
      clearInterval(shell2)
      clearInterval(shell3)
      clearInterval(skyBarrage)
      weReOutOfHere()
      alert(`You got 'em! Game Over!\n Your score is ${score}`)
    } else {
      clearInterval(bang1)
      setTimeout(() => {
        console.log(missileOne)
        cells[missileOne].classList.remove('implosion')
        missileOne = null
        ammoCounter -= 1
      }, 1000)
    }
  }


  function hamstrung() {
    setTimeout(() => {
      cells[turret].classList.remove('explosion')
      cells[turret].classList.add('flash')
    }, 500)
    setTimeout(() => {
      noLuck -= 1
      cells[turret].classList.remove('flash')
    }, 1500)
  }

  function tooSlow() {
    if (noLuck === 0) {
      noLuck += 1
      life -= 1
      hamstrung()
      // cells[turret].classList.remove('explosion')
    } else if (life > 0) return
    if (life === 0) {
      gameOver = true
      scoreElement.innerHTML = `Score : ${score}`
      gunTurrets.innerHTML = `Lives : ${life}`
      clearInterval(invasion)
      clearInterval(bang1)
      clearInterval(shell1)
      clearInterval(shell2)
      clearInterval(shell3)
      clearInterval(skyBarrage)
      weReOutOfHere()
      alert(`Our guns are done!\n Your score is ${score}`)
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

  function shouldWeGoRight(array) {
    return array.some((element) => {
      return element % width === 0
    })
  }

  function imTheCaptainNow(array) {
    return array.some((alien) => {
      return alien >= spaceSize - width
    })
  }

  function areYouReady() {
    // pressEnter.style.display = 'none'
    heroPanel.style.display = 'none'
    playerLounge.style.display = 'flex'
    begin.style.display = 'initial'

    // hero to display none
    // inspired
    // h1
    // enter game
  }


  document.addEventListener('keydown', (e) => {
    if (gameLoad === false) {
      gameLoad = true
      areYouReady()
    }
  })

  begin.addEventListener('click', () => {
    playerLounge.style.display = 'none'
    begin.style.display = 'none'
    readInstructions.style.display = 'flex'
    nameScreen.style.display = 'flex'
  })


  startButton.addEventListener('click', () => {
    //change of view
    space.style.display = 'intial'
    scoreElement.style.display = 'flex'
    gunTurrets.style.display = 'flex'
    playerLounge.style.display = 'none'
    begin.style.display = 'none'
    //initialisation of grid
    for (let i = 0; i < spaceSize; i++) {
      const cell = document.createElement('div')
      space.appendChild(cell)
      cells.push(cell)
      startButton.style.display = 'none'
    }
    scoreElement.innerHTML = `Score : ${score}`
    gunTurrets.innerHTML = `Lives : ${life}`
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
      scoreElement.innerHTML = `Score : ${score}`
      gunTurrets.innerHTML = `Lives : ${life}`
      // cells[eT].classList.remove('theFirst')
      //end screen conditionals
      //We're first going to get the swarm to move from side to side and then rework the conditionals on the basis that the outside will not always be an indicator of turnaround.
      //I've had an idea for the reduction of code...a reduce function could give me a string of the class values to check, add to and remove.
      //functions could be useful in reworking conditionals. Consider when to refactor after missile.
      if (shouldWeGoRight(eT) && swarm[0].classList.contains('left')) {
        swarm.forEach(div => {
          div.classList.remove('left')
        })
        swarm.forEach(div => {
          baggage = div.className.split(' ')
          baggage = baggage.filter(classStr => {
            return classStr !== 'missile' && classStr !== 'laser' && classStr !== 'implosion'
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
            return classStr !== 'missile' && classStr !== 'laser' && classStr !== 'implosion'
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
            return classStr !== 'missile' && classStr !== 'laser' && classStr !== 'implosion'
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
            return classStr !== 'missile' && classStr !== 'laser' && classStr !== 'implosion'
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

    }, 800)

    //I'm currently building out a method for return fire using a randomiser from the bottom row of the swarm. Finish work on this tomorrow morning.
    //separate these concerns out. There is already a set interval running that can change your values.
    skyBarrage = setInterval(() => {
      enemyFire = spaceGunners(eT)
      // console.log(enemyFire)
      if (enemyAmmo[0] === 1) {
        enemyAmmo.splice(0, 1)
        laserOne = enemyFire + width
        // console.log(laserOne)
        cells[laserOne].classList.add('laser')
        shell1 = setInterval(() => {
          cells[laserOne].classList.remove('laser')
          laserOne = laserOne + width
          //new code to evaluate (simulating hit)
          if (laserOne === turret) {
            cells[laserOne].classList.add('explosion')
            tooSlow()
            // eT = eT.filter((alien) => {
            //   return alien !== missileOne
            // })
            // cells[missileOne].classList.remove('missile') I've moved this line higher to test
            // cells[missileOne].classList.remove('theFirst')
            return potShot()
            // } else if (laserOne === missileOne) {
            //   return potShot()
          }
          cells[laserOne].classList.add('laser')
          if (laserOne >= ((width ** 2) - width)) {
            potShot()
          }
        }, 200)
        //This following code will be useful for return fire. However for now it is not relevant as player shoots once
      } else if (enemyAmmo[0] === 2) {
        enemyAmmo.splice(0, 1)
        laserTwo = enemyFire + width
        // console.log(laserTwo)
        cells[laserTwo].classList.add('laser')
        shell2 = setInterval(() => {
          cells[laserTwo].classList.remove('laser')
          laserTwo = laserTwo + width
          //new code to evaluate (simulating hit)
          if (laserTwo === turret) {
            cells[laserTwo].classList.add('explosion')
            tooSlow()
            // eT = eT.filter((alien) => {
            //   return alien !== missileOne
            // })
            // cells[missileOne].classList.remove('missile') I've moved this line higher to test
            // cells[missileOne].classList.remove('theFirst')
            return potShot2()
            // } else if (laserTwo === missileOne) {
            //   return potShot2()
          }
          cells[laserTwo].classList.add('laser')
          if (laserTwo >= ((width ** 2) - width)) {
            potShot2()
          }
        }, 80)
      } else if (enemyAmmo[0] === 3) {
        enemyAmmo.splice(0, 1)
        laserThree = enemyFire + width
        // console.log(laserThree)
        cells[laserThree].classList.add('laser')
        shell3 = setInterval(() => {
          cells[laserThree].classList.remove('laser')
          laserThree = laserThree + width
          //new code to evaluate (simulating hit)
          if (laserThree === turret) {
            cells[laserThree].classList.add('explosion')
            tooSlow()
            // eT = eT.filter((alien) => {
            //   return alien !== missileOne
            // })
            // cells[missileOne].classList.remove('missile') I've moved this line higher to test
            // cells[missileOne].classList.remove('theFirst')
            return potShot3()
            // } else if (laserThree === missileOne) {
            //   return potShot3()
          }
          cells[laserThree].classList.add('laser')
          if (laserThree >= ((width ** 2) - width)) {
            potShot3()
          }
        }, 200)
      } else return
    }, 1000)




    //this is an array example with an event listener
    // player.forEach(beat => {
    //   beat.addEventListener('click', (e) => {
    //     audio.src = e.target.value
    //     audio.play()
    //   })
    // })

    // ==============================Movement ==============================================================
    document.onkeydown = function (e) {
      if (noLuck === 0 && gameOver === false) {
        switch (e.keyCode) {
          case (37):
          case (65): {
            if (turret === ((width ** 2) - width)) {
              // console.log(e.keyCode)
              // console.log(turret)
              return
            }
            cells[turret].classList.remove('turret')
            turret = turret - 1
            cells[turret].classList.add('turret')
            // console.log(turret)
            break
          }
          case (68):
          case (39): {
            if (turret === ((spaceSize) - 1)) {
              // console.log(turret)
              return
            }
            cells[turret].classList.remove('turret')
            turret = turret + 1
            cells[turret].classList.add('turret')
            // console.log(turret)
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
            //make sure you change all names as we go. also change the interval names. also add way to reduce ammo counter (reduce by one)
            if (ammoCounter === 0) {
              ammoCounter += 1
              missileOne = turret - width
              cells[missileOne].classList.add('missile')
              bang1 = setInterval(() => {
                cells[missileOne].classList.remove('missile')
                missileOne = missileOne - width
                //new code to evaluate (simulating hit)
                if (gotcha(eT)) {
                  cells[missileOne].classList.add('implosion')
                  console.log(missileOne)
                  return amIHit()
                  // eT = eT.filter((alien) => {
                  //   return alien !== missileOne
                  // })
                  // cells[missileOne].classList.remove('missile')
                  // cells[missileOne].classList.remove('theFirst')
                }
                cells[missileOne].classList.add('missile')
                if (missileOne < width) {
                  rowZ1()
                }
              }, 80)
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
              // console.log(turret)
              return
            }
            cells[turret].classList.remove('turret')
            turret = turret - width
            cells[turret].classList.add('turret')
            // console.log(turret)
            break
          }
          case (40): {
            if (turret > ((spaceSize) - width - 1)) {
              // console.log(turret)
              return
            }
            cells[turret].classList.remove('turret')
            turret = turret + width
            cells[turret].classList.add('turret')
            // console.log(turret)
            break
          }
          /*Eliminate this code when you're finished with the mapping of items on the board*/
        }
      } else return
    }

  })



}

document.addEventListener('DOMContentLoaded', setupGame)

