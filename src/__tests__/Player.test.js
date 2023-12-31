import Player from "./../Player/Player";
import Gameboard from "./../Gameboard/Gameboard";

test("Check setStyle method is changing the style of the Player correctly & only when argument is valid", () => {
    const player = Player();
    player.setStyle("Manual");
    player.setStyle(0.1);
    player.setStyle(8);
    player.setStyle([]);
    player.setStyle({});
    player.setStyle("test");
    expect(player.getStyle()).toBe("Manual");
    player.setStyle("Computer");
    expect(player.getStyle()).toBe("Computer");
});

test("Check that the computer can make a non-duplicate move using the takeComputerTurn method", () => {
    const player = Player();
    const board = Gameboard(3);
    board.startGame();
    player.setStyle("Computer");
    player.takeComputerTurn(board);
    player.takeComputerTurn(board);
    player.takeComputerTurn(board);
    player.takeComputerTurn(board);
    player.takeComputerTurn(board);
    player.takeComputerTurn(board);
    player.takeComputerTurn(board);
    player.takeComputerTurn(board);
    player.takeComputerTurn(board);
    expect(board.observeBoard()).toStrictEqual([
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
    ]);
});
