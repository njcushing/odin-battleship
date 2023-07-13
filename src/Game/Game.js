import Player from "./../Player/Player";

const Game = () => {
    let playerOne = Player();
    let playerTwo = Player();
    playerTwo.setStyle("Computer");

    const getPlayers = () => {
        return [playerOne, playerTwo];
    };

    return {
        getPlayers,
    };
};
export default Game;
