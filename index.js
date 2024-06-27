const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let newGameAudio = new Audio('./sounds/newgame.wav');
let winAudio = new Audio('./sounds/winner.wav');
let tapAudio = new Audio('./sounds/tap.wav');
let drawAudio = new Audio('./sounds/draw.mp3')

let currentPlayer;
let gameGrid;

const winningPositions = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// initialising the game

function initGame() {
    newGameAudio.play();
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //UI updation
    boxes.forEach((box, index) => {

        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    })

    boxes.forEach((box) => {

        box.classList.remove("win");
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();
function swapTurn() {
    if (currentPlayer == "X") {

        currentPlayer = "O";

    }
    else {
        currentPlayer = "X";

    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non empty and exactly same in value
        if ((gameGrid[position[0]] != "" || gameGrid[position[1]] != "" || gameGrid[position[2]] != "") &&
            (gameGrid[position[0]] == gameGrid[position[1]] && gameGrid[position[1]] == gameGrid[position[2]])) {

            //check if X is winner
            if (gameGrid[position[0]] == "X") {
                answer = "X";
            }
            else {
                answer = "O";
            }
            //disable pointer since winner is found
            boxes.forEach((box) => {

                box.style.pointerEvents = "none";
            })
            // now green color to show winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            winAudio.play();
        }

    });
    if (answer != "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;

    }
    //checking for tied game

    let fillCount = 0;
    for (let i = 0; i < 9; i++) {

        if (gameGrid[i] != "") {

            fillCount++;
        }
    }
    if (fillCount == 9) {

        drawAudio.play();
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }


}

function handleClick(index) {
    if (gameGrid[index] == "") { //unclickable

        tapAudio.play();
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //now other player turn

        swapTurn();
        //check if someone has won
        checkGameOver();
    }

}

boxes.forEach((box, index) => {

    box.addEventListener("click", () => {

        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);
