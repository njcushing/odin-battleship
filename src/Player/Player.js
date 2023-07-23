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

    const takeComputerTurnRandom = (board, boardNo) => {
        const possibleAttacks = [];
        const boardArr = board.observeBoard();
        for (let y = 0; y < boardArr.length; y++) {
            for (let x = 0; x < boardArr[y].length; x++) {
                if (boardArr[y][x] !== 2) possibleAttacks.push([x, y]);
            }
        }
        const rand =
            possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)];
        board.receiveAttack(rand);
        PubSub.publish("BATTLESHIP-COMPUTER-ATTACKED-POSITION", [
            rand,
            boardNo,
        ]);
    };

    return {
        setStyle,
        getStyle,
        takeComputerTurnRandom,
    };
};
export default Player;
