import Player from "./../Player/Player";
import Gameboard from "../Gameboard/Gameboard";

const Game = () => {
    let playerOne = Player();
    let playerTwo = Player();
    playerTwo.setStyle("Computer");
    let boardOne = Gameboard(10);
    let boardTwo = Gameboard(10);

    const getPlayers = () => {
        return [playerOne, playerTwo];
    };

    const getGameboards = () => {
        return [boardOne, boardTwo];
    };

    return {
        getPlayers,
        getGameboards,
    };
};
export default Game;
