const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.getElementById('time-left'),
        score: document.getElementById('score'),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: null,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
}

const sounds = {
    defeat: 'defeat.wav',
    hit: 'hit.wav',
    miss: 'miss.ogg',
    victoryCry: 'victory-cry.wav',
    victory: 'victory.mp3',
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.timerId)
        clearInterval(state.actions.countDownTimerId)
        alert(`Game Over! O seu resultado foi: ${state.values.result}`)
    }
}

function playSound(audioName, volume=0.2) {
    let audio = new Audio(`../assets/audios/${audioName}`)
    audio.volume = 0.2
    audio.play()
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
    state.actions.timerId = setInterval(
        randomSquare,
        state.values.gameVelocity
    )
}

function loseLife() {

}

function addListenerHitbox () {
    state.view.squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result += 1
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound(sounds.hit)
                return;
            }
            playSound(sounds.miss)
        })
    })
}

function initialize () {
    addListenerHitbox()
}

initialize()
