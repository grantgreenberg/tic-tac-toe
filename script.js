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
            togglePlayer();
            console.log(`It's ${activePlayer.name}'s turn!`);
            console.log(gameBoard.boardState());
        }
        else {
            console.log('Invalid move. Please select another cell index.');
        }

        checkWinner();
    }

    return { playRound };
}

const game = gamePlay();

game.playRound(0);
game.playRound(0);
game.playRound(1);
game.playRound(1);
game.playRound(2);