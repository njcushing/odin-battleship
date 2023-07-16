import Player from "./../Player/Player";
import Gameboard from "../Gameboard/Gameboard";

const Game = () => {
    let gameStarted = false;
    let gameEnded = false;
    let turn = 0;
    let players = [Player(), Player()];
    players[1].setStyle("Computer");
    let boards = [Gameboard(10), Gameboard(10)];

    const startGame = () => {
        if (gameStarted || gameEnded) return null;
        gameStarted = true;
        gameEnded = false;
        boards[0].startGame();
        boards[1].startGame();
        turn = Math.floor(Math.random() * 2);
        if (players[turn].getStyle() === "Computer") computerAttack();
    };

    const endGame = () => {
        gameEnded = true;
        gameStarted = false;
    };

    const resetGame = () => {
        gameStarted = false;
        gameEnded = false;
        boards[0].resetBoard();
        boards[1].resetBoard();
    };

    const manualAttack = (board, position) => {
        if (!(Number.isInteger(board) && board >= 0 && board <= 1)) return null;
        if (!gameStarted) return null;
        if (players[turn].getStyle() === "Computer") return null;
        if (turn === board) return null;
        const previousAttacksCount = boards[turn].previousAttacks().length;
        boards[turn].receiveAttack(position);
        if (previousAttacksCount !== boards[turn].previousAttacks().length) {
            if (boards[turn].checkDefeat()) {
                endGame();
                return;
            }
            changeTurn();
        }
    };

    const computerAttack = () => {
        setTimeout(() => {
            let boardToAttack = boards[(turn + 1) % 2];
            players[turn].takeComputerTurnRandom(boardToAttack);
            if (boardToAttack.checkDefeat()) {
                endGame();
                return;
            }
            changeTurn();
        }, 3000);
    };

    const isGameStarted = () => {
        return gameStarted;
    };

    const isGameEnded = () => {
        return gameEnded;
    };

    const getPlayers = () => {
        return players;
    };

    const getGameboards = () => {
        return boards;
    };

    const changeTurn = () => {
        turn = (turn + 1) % 2;
        if (players[turn].getStyle() === "Computer") computerAttack();
    };

    const getTurn = () => {
        return turn;
    };

    return {
        startGame,
        endGame,
        resetGame,
        manualAttack,
        isGameStarted,
        isGameEnded,
        getPlayers,
        getGameboards,
        changeTurn,
        getTurn,
    };
};
export default Game;
