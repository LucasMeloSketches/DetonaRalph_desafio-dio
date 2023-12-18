const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values:{        
        
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        remainLives : 3
    },
    actions:{
        countDownTimerId: setInterval(countDown, 1000),        
        timerId : setInterval(randomSquare, 1000),

    }
}

function playSound(fileName){
    let audio = new Audio(`./src/audios/${fileName}`);
    audio.volume = 0.5;
    audio.play();
}

function gameOver(){
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    playSound("gameOver.wav");
    alert("Game Over! O seu resultado foi: " + state.values.result + '\n Aperte "F5" para reiniciar ou recarregue a página');
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        gameOver();
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let enemySquare = state.view.squares[randomNumber];
    enemySquare.classList.add("enemy");
    state.values.hitPosition = enemySquare.id;

}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () =>{
            if(square.id === state.values.hitPosition){
                state.values.result++                
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                
                playSound('hit.wav');
            } else {
                state.values.remainLives--
                if(state.values.remainLives >= 0){
                    state.view.lives.textContent = "x"+state.values.remainLives;
                    playSound("miss.wav")
                } else {
                    gameOver();
                }
            }
        })
    })
}

function init() {
    alert("Detona Ralph está destruindo o prédio! click nele para Pontuar, mas tente evitar as janelas, ou você vai perder uma vida.")
    addListenerHitBox();

}

init();