const Gameboard = (s) => {
    let size = s;
    let gameStarted = false;
    let attacks = [];
    let hits = [];
    let sinks = [];

    const generateBoard = () => {
        let board = [];
        for (let i = 0; i < Math.max(1, size); i++) {
            board.push([]);
            for (let j = 0; j < Math.max(1, size); j++) {
                board[i].push(0);
            }
        }
        return board;
    };
    let board = generateBoard();
    let startingBoard = null;

    const startGame = () => {
        gameStarted = true;
        startingBoard = observeBoard();
    };

    const resetBoard = () => {
        board = generateBoard();
        startingBoard = null;
        gameStarted = false;
        attacks = [];
        hits = [];
        sinks = [];
    };

    const randomiseBoard = () => {
        /* Undoubtedly more efficient ways to do this randomisation, but this works for this project */
        const numberOfShips = Math.floor(Math.random() * 3) + 4;
        for (let i = 0; i < numberOfShips; i++) {
            const minLen = 2;
            const maxLen = 6;
            let shipLength =
                Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
            const rotation = Math.floor(Math.random() * 2) === 0 ? false : true;
            const possibleLocations = [];
            while (possibleLocations.length === 0 && shipLength >= minLen) {
                for (let y = 0; y < board.length; y++) {
                    for (let x = 0; x < board[0].length; x++) {
                        if (
                            validateShipPosition(
                                board,
                                shipLength,
                                [x, y],
                                rotation
                            )
                        ) {
                            possibleLocations.push([x, y]);
                        }
                    }
                }
                if (possibleLocations.length === 0) shipLength--;
            }
            const rand = Math.floor(Math.random() * possibleLocations.length);
            placeShip(shipLength, possibleLocations[rand], rotation);
        }
    };

    const placeShip = (length, position, rotation) => {
        if (isGameStarted()) return null;
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
        if (isGameStarted()) return null;
        if (!validateCoordinateInput(origPos)) return;
        if (!validateCoordinateInput(destPos)) return;
        if (typeof rotation !== "boolean") return false;

        let boardCopy = observeBoard();
        const getShip = extractShip(boardCopy, origPos);
        if (!getShip) return;
        boardCopy = getShip[0];
        const ship = getShip[1];

        let currRot = false;
        if (ship.length > 2 && ship[0][1] !== ship[1][1]) currRot = true;

        const middleIndex = Math.ceil((ship.length - 1) / 2);
        let middlePos = [];
        if (currRot) ship.sort((a, b) => a[1] - b[1]);
        else ship.sort((a, b) => a[0] - b[0]);
        middlePos = ship[middleIndex];

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
                    board[destPos[1] + (i - middleIndex)][destPos[0]] = 1;
                } else {
                    board[destPos[1]][destPos[0] + (i - middleIndex)] = 1;
                }
            }
        }
    };

    const validateShipPosition = (board, length, position, rotation) => {
        if (!Number.isInteger(length) || length < 1 || length > board.length)
            return false;
        if (!validateCoordinateInput(position)) return false;
        if (typeof rotation !== "boolean") return false;

        const bounds = calculateShipArea(length, position, rotation);

        if (
            bounds[0][0] < 0 ||
            bounds[0][0] >= board.length ||
            bounds[0][1] < 0 ||
            bounds[0][1] >= board.length ||
            bounds[1][0] < 0 ||
            bounds[1][0] >= board.length ||
            bounds[1][1] < 0 ||
            bounds[1][1] >= board.length
        )
            return false;

        for (let i = bounds[0][0] - 1; i <= bounds[1][0] + 1; i++) {
            if (i === -1 || i === board.length) continue;
            for (let j = bounds[0][1] - 1; j <= bounds[1][1] + 1; j++) {
                if (j === -1 || j === board.length) continue;
                if (board[j][i] !== 0) return false;
            }
        }

        return true;
    };

    const deleteShip = (position) => {
        if (isGameStarted()) return null;
        if (!validateCoordinateInput(position)) return;

        extractShip(board, position);
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
        if (!isGameStarted()) return false;
        if (!validateCoordinateInput(position)) return false;

        if (board[position[1]][position[0]] < 2) {
            if (board[position[1]][position[0]] === 1) {
                board[position[1]][position[0]] = 3;
                hits.push(position);
            } else {
                board[position[1]][position[0]] = 2;
            }
            attacks.push(position);

            let startingBoardCopy = JSON.parse(JSON.stringify(startingBoard));
            const getShip = extractShip(startingBoardCopy, position);
            if (getShip) {
                let shipSunk = true;
                for (let i = 0; i < getShip[1].length; i++) {
                    if (board[getShip[1][i][1]][getShip[1][i][0]] === 1) {
                        shipSunk = false;
                        break;
                    }
                }
                if (shipSunk) sinks.push(getShip[1]);
            }

            return true;
        }
    };

    const extractShip = (board, position) => {
        if (board[position[1]][position[0]] !== 0) {
            const ship = [];
            const nearestNeighbour = (pos) => {
                ship.push(pos);
                board[pos[1]][pos[0]] = 0;
                if (pos[1] > 0 && board[pos[1] - 1][pos[0]] !== 0)
                    nearestNeighbour([pos[0], pos[1] - 1]);
                if (pos[0] > 0 && board[pos[1]][pos[0] - 1] !== 0)
                    nearestNeighbour([pos[0] - 1, pos[1]]);
                if (
                    pos[1] < board.length - 1 &&
                    board[pos[1] + 1][pos[0]] !== 0
                )
                    nearestNeighbour([pos[0], pos[1] + 1]);
                if (
                    pos[0] < board.length - 1 &&
                    board[pos[1]][pos[0] + 1] !== 0
                )
                    nearestNeighbour([pos[0] + 1, pos[1]]);
            };
            nearestNeighbour(position);
            return [board, ship];
        }
        return null;
    };

    const validateCoordinateInput = (position) => {
        if (
            Array.isArray(position) &&
            position.length === 2 &&
            Number.isInteger(position[0]) &&
            position[0] >= 0 &&
            position[0] < board.length &&
            Number.isInteger(position[1]) &&
            position[1] >= 0 &&
            position[1] < board.length
        ) {
            return true;
        }
        return false;
    };

    const getCellStateAt = (position) => {
        if (!validateCoordinateInput(position)) return null;
        return board[position[1]][position[0]];
    };

    const checkDefeat = () => {
        if (!isGameStarted()) return false;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 1) return false;
            }
        }
        return true;
    };

    const isGameStarted = () => {
        return gameStarted;
    };

    const observeBoard = () => {
        return JSON.parse(JSON.stringify(board));
    };

    const totalNumberOfShips = () => {
        let quantity = 0;
        let boardCopy;
        if (gameStarted) boardCopy = JSON.parse(JSON.stringify(startingBoard));
        else boardCopy = observeBoard();
        for (let i = 0; i < boardCopy.length; i++) {
            for (let j = 0; j < boardCopy[i].length; j++) {
                const ship = extractShip(boardCopy, [j, i]);
                if (ship && ship[1].length > 0) quantity++;
            }
        }
        return quantity;
    };

    const remainingNumberOfShips = () => {
        if (gameStarted) return totalNumberOfShips() - sinks.length;
        return totalNumberOfShips();
    };

    const previousAttacks = () => {
        return JSON.parse(JSON.stringify(attacks));
    };

    const previousHits = () => {
        return JSON.parse(JSON.stringify(hits));
    };

    const previousSinks = () => {
        return JSON.parse(JSON.stringify(sinks));
    };

    return {
        startGame,
        resetBoard,
        randomiseBoard,
        placeShip,
        moveShip,
        deleteShip,
        receiveAttack,
        getCellStateAt,
        checkDefeat,
        isGameStarted,
        observeBoard,
        totalNumberOfShips,
        remainingNumberOfShips,
        previousAttacks,
        previousHits,
        previousSinks,
    };
};
export default Gameboard;
