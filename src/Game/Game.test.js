import Game from "./../Game/Game";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

test(`Ensure Game can create two Player objects from module and assign their
    default play styles correctly`, () => {
    const game = Game();
    expect(game.getPlayers()[0].getStyle()).toBe("Manual");
    expect(game.getPlayers()[1].getStyle()).toBe("Computer");
});

test("Ensure Game can create two Gameboard objects from module", () => {
    const game = Game();
    const board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(game.getGameboards()[0].observeBoard()).toStrictEqual(board);
    expect(game.getGameboards()[1].observeBoard()).toStrictEqual(board);
});

test(`When calling startGame method, make sure both boards are started, turn is
    either 0 or 1 and computer takes turn if applicable`, () => {
    const game = Game();
    const boards = game.getGameboards();
    const players = game.getPlayers();
    boards[0].receiveAttack([3, 3]);
    boards[1].receiveAttack([2, 2]);
    expect(boards[0].observeBoard()).toStrictEqual(boards[1].observeBoard());
    game.startGame();
    boards[0].receiveAttack([3, 3]);
    boards[1].receiveAttack([2, 2]);
    expect(boards[0].observeBoard()).not.toStrictEqual(
        boards[1].observeBoard()
    );
    const turn = game.getTurn();
    expect([0, 1]).toContain(turn);
    if (players[turn].getStyle() === "Computer")
        expect(setTimeout).toBeCalledTimes(1);
});

test("Ensure changeTurn method is cycling the turn between 0 and 1", () => {
    const game = Game();
    game.startGame();
    const turn = game.getTurn();
    expect([0, 1]).toContain(turn);
    game.changeTurn();
    expect(game.getTurn()).not.toBe(turn);
    expect([0, 1]).toContain(turn);
    game.changeTurn();
    expect(game.getTurn()).toBe(turn);
    expect([0, 1]).toContain(turn);
});
