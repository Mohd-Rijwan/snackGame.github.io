

var flag = true;

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const card = document.getElementById("card");
const Score = document.getElementById("card-score");
const HScore = document.getElementById("card-score1");

const music = new Audio('music.mp3');
const move = new Audio('move.mp3');
const eat = new Audio('eat.mp3');
const gameover = new Audio('gameover.mp3');

var up = document.querySelector(".up")
var down = document.querySelector(".down")
var left = document.querySelector(".left")
var right = document.querySelector(".right")
var pause = document.querySelector(".pause")





let Hscore = 0;
let score = 0;
let a1 = 10, a2 = 0
let x = 0, y = 200
let w = 10, h = 10
let f1 = 300, f2 = 200
let arr = [{ x: 80, y: 200 }, { x: 70, y: 200 }, { x: 60, y: 200 }, { x: 50, y: 200 }]
let interval = null


snack()
food()
updateScore(score);

function restartGame(button) {
// flag=true 
    if (!interval) {     //To Break double start
        score = 0
        card.style.display = "none";

        interval = setInterval(() => {
            music.play();

            Navigation();

            


            // Moving the snake
            for (let i = arr.length - 2; i >= 0; i--) {
                arr[i + 1] = { ...arr[i] };  //Destructuring
            }
            arr[0].x += a1
            arr[0].y += a2

            collision();
            eaten();
            updateScore(score);

            //Wall cross
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].x === 400) {
                    arr[i].x = 0
                }
                if (arr[i].x === -10) {
                    arr[i].x = 390
                }
                if (arr[i].y === 400) {
                    arr[i].y = 0
                }

                if (arr[i].y === -10) {
                    arr[i].y = 390
                }
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            //Display snack
            snack()
            food()
        }, 100);

    }
}

// pause code start 
pause.addEventListener("click", () => {
    if (interval) {
        music.pause();
        card.style.display = "block";
        clearInterval(interval);
        interval = null;
        flag = false
        pause.textContent = "Play"
    }
    else {
        pause.textContent = "Pause";
        flag = true
        restartGame()
    }
})
// pause code end

function snack() {
    ctx.beginPath()
    for (let i = 0; i < arr.length; i++) {
        ctx.rect(arr[i].x, arr[i].y, w, h)
    }
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
}

function food() {
    ctx.beginPath()
    ctx.rect(f1, f2, 10, 10)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
}

function updateScore(score) {
    Score.innerHTML = score;
    if (score > Hscore) {
        Hscore = score;
        HScore.innerHTML = Hscore;
    }
}

function Navigation() {

    window.addEventListener('keydown', e => {
        move.play();
        switch (e.key) {
            case "ArrowUp":
                a1 = 0;
                a2 = -10;
                break;

            case "ArrowDown":
                a1 = 0;
                a2 = 10;
                break;

            case "ArrowLeft":
                a1 = -10;
                a2 = 0;
                break;

            case "ArrowRight":
                a1 = 10;
                a2 = 0;
                break;
            default:
                break;
        }

    });

    // manual button code start 
    up.addEventListener("click", () => {
        a1 = 0;
        a2 = -10;
    })
    down.addEventListener("click", () => {
        a1 = 0;
        a2 = 10;
    })
    left.addEventListener("click", () => {
        a1 = -10;
        a2 = 0;
    })
    right.addEventListener("click", () => {
        a1 = 10;
        a2 = 0;
    })
    // manual button code end

}

// manual button code start 
// var i1 = null, i2 = null;
// left.addEventListener('touchstart', e => {
//     left.style.background = "red"
//     clearInterval(i2)
//     i1 = setInterval(() => {
//         a1 = -10;
//         a2 = 0;
//     }, 20);
// })
// right.addEventListener('touchstart', e => {
//     right.style.background = "red"
//     clearInterval(i1)
//     i2 = setInterval(() => {
//         a1 = 10;
//        a2 = 0;
//     }, 20);
// })
// left.addEventListener('touchend', e => {
//     left.style.background = "#008CBA"
//     clearInterval(i1)
// })
// right.addEventListener('touchend', e => {
//     right.style.background = "#008CBA"
//     clearInterval(i2)
// })
// manual button code end

function collision() {
    for (let i = 1; i < arr.length; i++) {
        if (arr[0].x === arr[i].x && arr[0].y === arr[i].y) {
            music.pause();
            gameover.play();

            card.style.display = "block";


            clearInterval(interval);
            interval = null;

            a1 = 10, a2 = 0
            x = 0, y = 200
            w = 10, h = 10
            f1 = 300, f2 = 200
            arr = [{ x: 80, y: 200 }, { x: 70, y: 200 }, { x: 60, y: 200 }, { x: 50, y: 200 }]

        }
    }
}

function eaten() {
    if (arr[0].x === f1 && arr[0].y === f2) {
        eat.play();
        arr.unshift({ x: arr[0].x + a1, y: arr[0].y + a2 });

        let a = 10;
        let b = 390;
        f1 = (Math.round((a + (b - a) * Math.random()) * 0.1)) * 10
        f2 = (Math.round((a + (b - a) * Math.random()) * 0.1)) * 10
        score = score + 1

    }
}
