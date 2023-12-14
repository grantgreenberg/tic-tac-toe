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

    const togglePlayer = () => activePlayer == player1 ? activePlayer = player2 : activePlayer = player1;
    
    const playRound = (index) => {

		if(gameBoard.placeMarker(index, activePlayer.marker)) {
            if(checkWinner()) {
                return;
            }
            togglePlayer();
            console.log(`It's ${activePlayer.name}'s turn!`);
            console.log(gameBoard.boardState());
        }
        else {
            console.log('Invalid move. Please select another cell index.');
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
                console.log(`${activePlayer.name} wins!`);
                return true;
            }
        }

        if (!currentBoardState.includes('')) {
            console.log('It\'s a tie!');
            return true;
        }

        return false;
    }

    return { playRound };
}

const game = gamePlay();