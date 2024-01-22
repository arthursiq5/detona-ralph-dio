const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.getElementById('time-left'),
        score: document.getElementById('score'),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: null,
        result: 0,
    },
}

function randomSquare () {
    state.view.squares.forEach(square => square.classList.remove('enemy'))
    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add('enemy')
    state.values.hitPosition = randomSquare.id
    return randomSquare
}

function moveEnemy() {
    state.values.timerId = setInterval(
        randomSquare,
        state.values.gameVelocity
    )
}

function addListenerHitbox () {
    state.view.squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result += 1
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
            }
        })
    })
}

function initialize () {
    addListenerHitbox()
    moveEnemy()
}

initialize()
