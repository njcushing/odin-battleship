const Gameboard = (s) => {
    let size = s;
    let board = [];
    for (let i = 0; i < size; i++) {
        board.push([]);
        for (let j = 0; j < size; j++) {
            board[i].push(0);
        }
    }
    let ships = [];

    const placeShip = (length, position, rotation) => {
        if (validateShipPosition(length, position, rotation)) {
            return true;
        }
        return false;
    };

    const moveShip = (originalPosition, destinationPosition, rotate) => {};

    const validateShipPosition = (length, position, rotation) => {};

    const observeBoard = () => {
        return JSON.parse(JSON.stringify(board));
    };

    return {
        placeShip,
        moveShip,
        observeBoard,
    };
};
export default Gameboard;
