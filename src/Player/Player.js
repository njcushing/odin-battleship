import PubSub from "pubsub-js";

const Player = () => {
    let style = "Manual";

    const setStyle = (s) => {
        if (s !== "Manual" && s !== "Computer") return;
        style = s;
    };

    const getStyle = () => {
        return style;
    };

    const findIndexInLastSink = (position, lastSink) => {
        for (let i = 0; i < lastSink.length; i++) {
            if (
                position[0] === lastSink[i][0] &&
                position[1] === lastSink[i][1]
            ) {
                return i;
            }
        }
        return -1;
    };

    const takeComputerTurn = (board, boardNo) => {
        const previousHits = board.previousHits();
        const previousSinks = board.previousSinks();
        const lastSink =
            previousSinks.length === 0
                ? null
                : previousSinks[previousSinks.length - 1];
        const boardArr = board.observeBoard();

        for (let i = previousHits.length - 1; i >= 0; i--) {
            const a = previousHits[i];
            if (
                lastSink === null ||
                (Array.isArray(lastSink) &&
                    findIndexInLastSink(a, lastSink) === -1)
            ) {
                const adjacentAttacks = [];
                let attackDirection = null;
                for (let j = i - 1; j >= 0; j--) {
                    const b = previousHits[j];
                    if (
                        lastSink === null ||
                        (Array.isArray(lastSink) &&
                            findIndexInLastSink(b, lastSink) === -1)
                    ) {
                        if (a[0] !== b[0]) {
                            attackDirection = 0;
                            if (
                                board.getCellStateAt([b[0] - 1, b[1]]) !==
                                    null &&
                                board.getCellStateAt([b[0] - 1, b[1]]) < 2
                            ) {
                                adjacentAttacks.push([b[0] - 1, b[1]]);
                            }
                            if (
                                board.getCellStateAt([b[0] + 1, b[1]]) !==
                                    null &&
                                board.getCellStateAt([b[0] + 1, b[1]]) < 2
                            ) {
                                adjacentAttacks.push([b[0] + 1, b[1]]);
                            }
                        } else if (a[1] !== b[1]) {
                            attackDirection = 1;
                            if (
                                board.getCellStateAt([b[0], b[1] - 1]) !==
                                    null &&
                                board.getCellStateAt([b[0], b[1] - 1]) < 2
                            ) {
                                adjacentAttacks.push([b[0], b[1] - 1]);
                            }
                            if (
                                board.getCellStateAt([b[0], b[1] + 1]) !==
                                    null &&
                                board.getCellStateAt([b[0], b[1] + 1]) < 2
                            ) {
                                adjacentAttacks.push([b[0], b[1] + 1]);
                            }
                        }
                        if (adjacentAttacks.length > 0) break;
                    }
                    if (
                        Array.isArray(lastSink) &&
                        findIndexInLastSink(b, lastSink) > -1
                    ) {
                        break;
                    }
                }
                if (
                    (attackDirection === null || attackDirection === 0) &&
                    board.getCellStateAt([a[0] - 1, a[1]]) !== null &&
                    board.getCellStateAt([a[0] - 1, a[1]]) < 2
                ) {
                    adjacentAttacks.push([a[0] - 1, a[1]]);
                }
                if (
                    (attackDirection === null || attackDirection === 1) &&
                    board.getCellStateAt([a[0], a[1] - 1]) !== null &&
                    board.getCellStateAt([a[0], a[1] - 1]) < 2
                ) {
                    adjacentAttacks.push([a[0], a[1] - 1]);
                }
                if (
                    (attackDirection === null || attackDirection === 0) &&
                    board.getCellStateAt([a[0] + 1, a[1]]) !== null &&
                    board.getCellStateAt([a[0] + 1, a[1]]) < 2
                ) {
                    adjacentAttacks.push([a[0] + 1, a[1]]);
                }
                if (
                    (attackDirection === null || attackDirection === 1) &&
                    board.getCellStateAt([a[0], a[1] + 1]) !== null &&
                    board.getCellStateAt([a[0], a[1] + 1]) < 2
                ) {
                    adjacentAttacks.push([a[0], a[1] + 1]);
                }
                if (adjacentAttacks.length === 0) continue;
                const rand = Math.floor(Math.random() * adjacentAttacks.length);
                board.receiveAttack(adjacentAttacks[rand]);
                PubSub.publish("BATTLESHIP-COMPUTER-ATTACKED-POSITION", [
                    adjacentAttacks[rand],
                    boardNo,
                    previousSinks.length !== board.previousSinks().length,
                ]);
                return;
            }
            break;
        }

        const possibleAttacks = new Set();
        for (let y = 0; y < boardArr.length; y++) {
            for (let x = 0; x < boardArr[y].length; x++) {
                if (boardArr[y][x] < 2) {
                    let key = boardPositionToObjectKey(boardArr.length, [x, y]);
                    possibleAttacks.add(key);
                }
            }
        }
        for (let i = 0; i < previousSinks.length; i++) {
            for (let j = 0; j < previousSinks[i].length; j++) {
                let key = boardPositionToObjectKey(
                    boardArr.length,
                    previousSinks[i][j]
                );
                if (possibleAttacks.has(key)) possibleAttacks.delete(key);
            }
        }
        let keyArray = Array.from(possibleAttacks);
        let randKey = keyArray[Math.floor(Math.random() * keyArray.length)];
        let randPosition = objectKeyToBoardPosition(boardArr.length, randKey);
        board.receiveAttack(randPosition);
        PubSub.publish("BATTLESHIP-COMPUTER-ATTACKED-POSITION", [
            randPosition,
            boardNo,
            previousSinks.length !== board.previousSinks().length,
        ]);
    };

    const boardPositionToObjectKey = (boardHeight, position) => {
        return position[0] * boardHeight + position[1];
    };

    const objectKeyToBoardPosition = (boardHeight, key) => {
        return [
            Math.floor(key / boardHeight),
            key - Math.floor(key / boardHeight) * boardHeight,
        ];
    };

    return {
        setStyle,
        getStyle,
        takeComputerTurn,
    };
};
export default Player;
