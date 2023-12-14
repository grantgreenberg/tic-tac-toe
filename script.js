function createPlayer(name, marker) {
    return {name, marker};
}

const gameBoard = (function() {

    const board = ['','','','','','','','',''];

    const checkEmptyCells = () => {
        return board.map((element) => element == '');
    }

    const placeMarker = (index, marker) => {
        if(checkEmptyCells()[index]) {
      		board[index] = marker;
            return true;
        }
        return false
    }

    let boardState = () => board;

    return { placeMarker, boardState }

})();

function gamePlay() {

    const player1 = createPlayer('Player One', 'X');
    const player2 = createPlayer('Player Two', 'O');

    let activePlayer = player1;

    const playerTurnDiv = document.querySelector('.player-turn');

    const getActivePlayer = () => activePlayer;

    const togglePlayer = () => activePlayer == player1 ? activePlayer = player2 : activePlayer = player1;
    
    const playRound = (index) => {

		if(gameBoard.placeMarker(index, activePlayer.marker)) {

            if(checkWinner() == 1) {
                playerTurnDiv.textContent = `${activePlayer.name} Wins!`;
                return;
            }
            else if(checkWinner() == 2) {
                playerTurnDiv.textContent = `It's a tie.`;
                return;
            }
            togglePlayer();
            playerTurnDiv.textContent = `${activePlayer.name}'s Turn`;
        }
        else {
            playerTurnDiv.textContent = `Invalid Move.`;
        }
    }

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        const currentBoardState = gameBoard.boardState();

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (currentBoardState[a] !== '' && currentBoardState[a] === currentBoardState[b] && currentBoardState[b] === currentBoardState[c]) {
                return 1;
            }
        }

        if (!currentBoardState.includes('')) {
            return 2;
        }

        return false;
    }

    return { playRound, getActivePlayer };
}

function screenController() {

    const game = gamePlay();
    const playerTurnDiv = document.querySelector('.player-turn');
    const boardDiv = document.querySelector('.game-board');

    playerTurnDiv.textContent = `Player One's Turn`;

    const updateScreen = () => {

        boardDiv.textContent = '';

        const currentBoardState = gameBoard.boardState();
        const activePlayer = game.getActivePlayer();

        currentBoardState.forEach((element, index) => {
            const cellButton = document.createElement('button');
            cellButton.classList.add('cell');
            cellButton.dataset.cell = index;
            cellButton.textContent = element;
            boardDiv.appendChild(cellButton);
        });
    }

    function userInputController(event) {
        const selectedCell = event.target.dataset.cell;

        if (!selectedCell) return;

        game.playRound(selectedCell);
        
        updateScreen();
    }

    boardDiv.addEventListener('click', userInputController);

    updateScreen();
}

screenController();