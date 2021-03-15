/// Game functions ///
const scorePoint = (playerID) => {
    // Add a point to the player w/ that ID if less than max.
    const player = document.querySelector(`#p${playerID}Score`);
    const curScore = parseInt(player.innerText);
    player.innerText = curScore + 1

    const winner = isGameWon();
    if (winner) {
        completeGame(winner)
    }
};

const resetGame = () => {
    // Reset score and enable buttons
    for (let i = 1; i <= 2; i++) {
        const pScore = document.querySelector(`#p${i}Score`);
        pScore.innerText = "0"
        pScore.classList.remove("has-text-success", "has-text-danger")
        const pBtn = document.querySelector(`#p${i}Button`);
        pBtn.disabled = false
    }
};

const isGameWon = () => {
    // Returns player ID if won, else returns 0
    const maxScore = parseInt(document.querySelector("#points").value)
    for (let i = 1; i <= 2; i++) {
        const pScore = document.querySelector(`#p${i}Score`);
        if (parseInt(pScore.innerText) >= maxScore) {
            return i;
        }
    }
    return 0;
}

const completeGame = (winner) => {
    for (let i = 1; i <= 2; i++) {
        if (i === winner) {
            const pScore = document.querySelector(`#p${i}Score`);
            pScore.classList.add("has-text-success")
        } else {
            const pScore = document.querySelector(`#p${i}Score`);
            pScore.classList.add("has-text-danger")
        }
        const pBtn = document.querySelector(`#p${i}Button`);
        pBtn.disabled = true
    }
}

/// Event Interactions ///
const buttons = document.querySelector("#buttons");
buttons.addEventListener("click", function (e) {
    if (e.target.id === "resetButton") {
        resetGame()
    } else {
        const playerID = e.target.id[1];
        scorePoint(playerID)
    }
})

const selector = document.querySelector("#points");
selector.addEventListener("change", () => {
    resetGame()
})
