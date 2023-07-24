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

    const takeComputerTurn = (board, boardNo) => {
        /*
            Computer 'Smart'-ish AI Play:
            1.  Find all possible tiles that can be attacked.
            2.  If there has been a previous successful sink(s), ignore those tiles
                and all adjacent and diagonal tiles.
            3.  If there has been a previous successful hit(s), find adjacent tiles
                to the most recent one and attack as priority.
            4.  Otherwise, attack a random position.
            5.  If the position attacked is a successful hit, check if it has sunk
                the ship. If so, add that to the list of sunken ships, and remove all
                tiles that comprise ship from the previous hits set. 
        */

        const previousAttacks = board.previousAttacks();
        const previousHits = board.previousHits();
        const previousSinks = board.previousSinks();
        const lastSink =
            previousSinks.length === 0
                ? null
                : previousSinks[previousSinks.length - 1];
        const boardArr = board.observeBoard();

        for (let i = previousHits.length - 1; i >= 0; i--) {
            const hit = previousHits[i];
            if (
                lastSink === null ||
                (Array.isArray(lastSink) && !(lastSink.findIndex(hit) > -1))
            ) {
                const adjacentAttacks = [];
                if (board.getCellStateAt([hit[0] - 1, hit[1]]) < 2) {
                    adjacentAttacks.push([hit[0] - 1, hit[1]]);
                }
                if (board.getCellStateAt([hit[0] - 1, hit[1]]) < 2) {
                    adjacentAttacks.push([hit[0], hit[1] - 1]);
                }
                if (board.getCellStateAt([hit[0] - 1, hit[1]]) < 2) {
                    adjacentAttacks.push([hit[0] + 1, hit[1]]);
                }
                if (board.getCellStateAt([hit[0] - 1, hit[1]]) < 2) {
                    adjacentAttacks.push([hit[0], hit[1] + 1]);
                }
                if (adjacentAttacks.length === 0) continue;
                const rand = Math.floor(Math.random() * adjacentAttacks.length);
                board.receiveAttack(adjacentAttacks[rand]);
                PubSub.publish("BATTLESHIP-COMPUTER-ATTACKED-POSITION", [
                    adjacentAttacks[rand],
                    boardNo,
                ]);
                return;
            }
            return;
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
                let key = boardPositionToObjectKey(boardArr.length, [x, y]);
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
