const choices = document.querySelectorAll(".choices img");
const computerChoiceImg = document.getElementById("computer-choice");
const result = document.getElementById("result-text");
const showWins = document.getElementById("wins");
const showLosses = document.getElementById("losses");
const showTies = document.getElementById("ties");
const resetButton = document.getElementById("reset-button");
const options = ["rock", "paper", "scissors"];

let wins = 0; 
let losses = 0; 
let ties = 0;

choices.forEach(img => img.addEventListener("click", playGame));

function playGame(event) {
    choices.forEach(img => img.classList.remove("selected"));
    event.target.classList.add("selected");

    let playerChoice = event.target.getAttribute("data-choice"); // Ensure your HTML uses `data-choice`
    computerTurn(playerChoice);
}

function computerTurn(playerChoice) {
    let index = 0;
    let shuffle = setInterval(() => {
        computerChoiceImg.src = `images/${options[index]}.PNG`;
        index = (index + 1) % options.length;
    }, 500);
    
    setTimeout(() => {
        clearInterval(shuffle);
        let computerChoice = options[Math.floor(Math.random() * 3)];
        computerChoiceImg.src = `images/${computerChoice}.PNG`;
        determineWinner(playerChoice, computerChoice);
    }, 3000);
}

function determineWinner(player, computer) {
    if (player === computer) {
        result.textContent = "It's a tie!";
        ties++;
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        result.textContent = "You win!";
        wins++;
    } else {
        result.textContent = "Computer wins!";
        losses++;
    }
    updateScore();
}

function updateScore() {
    showWins.textContent = wins;
    showLosses.textContent = losses;
    showTies.textContent = ties;
}

resetButton.addEventListener("click", () => {
    wins = losses = ties = 0;
    updateScore();
    result.textContent = "Make your move!";
    computerChoiceImg.src = "images/question-mark.PNG";
    choices.forEach(img => img.classList.remove("selected"));
});
