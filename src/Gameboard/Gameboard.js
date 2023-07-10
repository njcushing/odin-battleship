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
            const bounds = calculateShipArea(length, position, rotation);
            if (rotation) {
                for (let j = bounds[0][1]; j <= bounds[1][1]; j++) {
                    board[j][position[0]] = 1;
                }
            } else {
                for (let i = bounds[0][0]; i <= bounds[1][0]; i++) {
                    board[position[1]][i] = 1;
                }
            }
        }
    };

    const moveShip = (originalPosition, destinationPosition, rotate) => {};

    const validateShipPosition = (length, position, rotation) => {
        if (!Number.isInteger(length) || length < 1 || length > size)
            return false;
        if (!Array.isArray(position) || position.length !== 2) return false;
        if (!Number.isInteger(position[0])) return false;
        if (!Number.isInteger(position[1])) return false;
        if (typeof rotation !== "boolean") return false;

        const bounds = calculateShipArea(length, position, rotation);

        if (bounds[0][0] < 0 || bounds[0][0] >= size) return false;
        if (bounds[0][1] < 0 || bounds[0][1] >= size) return false;
        if (bounds[1][0] < 0 || bounds[1][0] >= size) return false;
        if (bounds[1][1] < 0 || bounds[1][1] >= size) return false;

        for (let i = bounds[0][0] - 1; i <= bounds[1][0] + 1; i++) {
            if (i < -1 || i > size) return false;
            if (i === -1 || i === size) continue;
            for (let j = bounds[0][1] - 1; j <= bounds[1][1] + 1; j++) {
                if (j < -1 || j > size) return false;
                if (j === -1 || j === size) continue;
                if (board[j][i] !== 0) return false;
            }
        }

        return true;
    };

    const calculateShipArea = (length, position, rotation) => {
        const lengthBehind = Math.abs(Math.floor((length - 1) / 2));
        const lengthInfront = Math.abs(Math.ceil((length - 1) / 2));
        if (rotation)
            return [
                [position[0], position[1] - lengthBehind],
                [position[0], position[1] + lengthInfront],
            ];
        else
            return [
                [position[0] - lengthBehind, position[1]],
                [position[0] + lengthInfront, position[1]],
            ];
    };

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
