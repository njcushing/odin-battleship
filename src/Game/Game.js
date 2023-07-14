import Player from "./../Player/Player";
import Gameboard from "../Gameboard/Gameboard";

const Game = () => {
    let gameStarted = false;
    let turn = 0;
    let players = [Player(), Player()];
    players[1].setStyle("Computer");
    let boards = [Gameboard(10), Gameboard(10)];

    const startGame = () => {
        gameStarted = true;
        boards[0].startGame();
        boards[1].startGame();
        turn = Math.floor(Math.random() * 2);
        if (players[turn].getStyle() === "Computer") computerAttack();
    };

    const endGame = () => {
        gameStarted = false;
    };

    const resetGame = () => {
        boards[0].resetBoard();
        boards[1].resetBoard();
    };

    const computerAttack = (turn, player, board) => {
        setTimeout(() => {
            let boardToAttack = boards[(turn + 1) % 2];
            players[turn].takeComputerTurnRandom(boardToAttack);
            if (boardToAttack.checkDefeat()) {
                endGame();
                return;
            }
            changeTurn();
            if (players[turn].getStyle() === "Computer") computerAttack();
        }, 3000);
    };

    const getPlayers = () => {
        return players;
    };

    const getGameboards = () => {
        return boards;
    };

    const changeTurn = () => {
        turn = (turn + 1) % 2;
    };

    const getTurn = () => {
        return turn;
    };

    return {
        startGame,
        resetGame,
        getPlayers,
        getGameboards,
        getTurn,
    };
};
export default Game;
