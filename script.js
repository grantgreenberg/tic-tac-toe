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
        }
    }

    let boardState = () => board;

    return { placeMarker, boardState, checkEmptyCells }

})();

