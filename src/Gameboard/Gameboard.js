const Gameboard = (s) => {
    let size = s;

    const generateBoard = () => {
        let board = [];
        for (let i = 0; i < size; i++) {
            board.push([]);
            for (let j = 0; j < size; j++) {
                board[i].push(0);
            }
        }
        return board;
    };
    let board = generateBoard();

    const placeShip = (length, position, rotation) => {
        if (validateShipPosition(board, length, position, rotation)) {
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

    const moveShip = (origPos, destPos, rotation) => {
        if (!Array.isArray(origPos) || origPos.length !== 2) return;
        if (!Number.isInteger(origPos[0])) return;
        if (origPos[0] < 0 || origPos[0] >= board.length) return;
        if (!Number.isInteger(origPos[1])) return;
        if (origPos[1] < 0 || origPos[1] >= board.length) return;
        if (!Array.isArray(destPos) || destPos.length !== 2) return;
        if (!Number.isInteger(destPos[0])) return;
        if (destPos[0] < 0 || destPos[0] >= board.length) return;
        if (!Number.isInteger(destPos[1])) return;
        if (destPos[1] < 0 || destPos[1] >= board.length) return;
        if (typeof rotation !== "boolean") return false;

        const ship = [];
        const boardCopy = observeBoard();

        if (board[origPos[1]][origPos[0]] !== 0) {
            const nearestNeighbour = (pos) => {
                ship.push([pos, boardCopy[pos[1]][pos[0]]]);
                boardCopy[pos[1]][pos[0]] = 0;
                if (pos[1] > 0 && boardCopy[pos[1] - 1][pos[0]] !== 0)
                    nearestNeighbour([pos[0], pos[1] - 1]);
                if (pos[0] > 0 && boardCopy[pos[1]][pos[0] - 1] !== 0)
                    nearestNeighbour([pos[0] - 1, pos[1]]);
                if (
                    pos[1] < board.length - 1 &&
                    boardCopy[pos[1] + 1][pos[0]] !== 0
                )
                    nearestNeighbour([pos[0], pos[1] + 1]);
                if (
                    pos[0] < board.length - 1 &&
                    boardCopy[pos[1]][pos[0] + 1] !== 0
                )
                    nearestNeighbour([pos[0] + 1, pos[1]]);
            };
            nearestNeighbour(origPos);
        } else return;

        let currRot = false;
        if (ship.length > 2 && ship[0][0][1] !== ship[1][0][1]) currRot = true;

        const middleIndex = Math.ceil((ship.length - 1) / 2);
        let middlePos = [];
        if (currRot) ship.sort((a, b) => a[0][1] - b[0][1]);
        else ship.sort((a, b) => a[0][0] - b[0][0]);
        middlePos = ship[middleIndex][0];

        if (rotation) currRot = !currRot;

        if (rotation) {
            destPos[0] += middlePos[1] - origPos[1];
            destPos[1] += middlePos[0] - origPos[0];
        } else {
            destPos[0] += middlePos[0] - origPos[0];
            destPos[1] += middlePos[1] - origPos[1];
        }

        if (validateShipPosition(boardCopy, ship.length, destPos, currRot)) {
            board = boardCopy;
            for (let i = 0; i < ship.length; i++) {
                if (currRot) {
                    board[destPos[1] + (i - middleIndex)][destPos[0]] =
                        ship[i][1];
                } else {
                    board[destPos[1]][destPos[0] + (i - middleIndex)] =
                        ship[i][1];
                }
            }
        }
    };

    const validateShipPosition = (board, length, position, rotation) => {
        if (!Number.isInteger(length) || length < 1 || length > board.length)
            return false;
        if (!Array.isArray(position) || position.length !== 2) return false;
        if (!Number.isInteger(position[0])) return false;
        if (!Number.isInteger(position[1])) return false;
        if (typeof rotation !== "boolean") return false;

        const bounds = calculateShipArea(length, position, rotation);

        if (bounds[0][0] < 0 || bounds[0][0] >= board.length) return false;
        if (bounds[0][1] < 0 || bounds[0][1] >= board.length) return false;
        if (bounds[1][0] < 0 || bounds[1][0] >= board.length) return false;
        if (bounds[1][1] < 0 || bounds[1][1] >= board.length) return false;

        for (let i = bounds[0][0] - 1; i <= bounds[1][0] + 1; i++) {
            if (i < -1 || i > board.length) return false;
            if (i === -1 || i === board.length) continue;
            for (let j = bounds[0][1] - 1; j <= bounds[1][1] + 1; j++) {
                if (j < -1 || j > board.length) return false;
                if (j === -1 || j === board.length) continue;
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

    const receiveAttack = (position) => {
        if (!Array.isArray(position) || position.length !== 2) return;
        if (!Number.isInteger(position[0])) return;
        if (position[0] < 0 || position[0] >= board.length) return;
        if (!Number.isInteger(position[1])) return;
        if (position[1] < 0 || position[1] >= board.length) return;

        if (board[position[1]][position[0]] !== 2) {
            board[position[1]][position[0]] = 2;
            return true;
        }
        return false;
    };

    const observeBoard = () => {
        return JSON.parse(JSON.stringify(board));
    };

    return {
        placeShip,
        moveShip,
        receiveAttack,
        checkDefeat,
        observeBoard,
    };
};
export default Gameboard;
