import Game from "./../Game/Game";
import Gameboard from "./../Gameboard/Gameboard";

jest.useFakeTimers();

describe("Calling the isGameStarted method... ", () => {
    const game = Game(1);
    test("Should return the default value after initialisation (false)", () => {
        expect(game.isGameStarted()).toBe(false);
    });
});

describe("Calling the getGameboards method... ", () => {
    const game = Game();
    const gameboards = game.getGameboards();
    test("Should return an array of length 2", () => {
        expect(gameboards.length).toEqual(2);
    });
});

describe("Calling the getPlayers method... ", () => {
    const game = Game();
    const players = game.getGameboards();
    test("Should return an array of length 2", () => {
        expect(players.length).toEqual(2);
    });
});

describe("On Game object instantiation... ", () => {
    const game = Game();
    const board = Gameboard(10);
    const boardEmpty = board.observeBoard();
    test("TWO Gameboard objects of size 10x10 should be created correctly", () => {
        const gameboards = game.getGameboards();
        expect(gameboards[0].observeBoard()).toStrictEqual(boardEmpty);
        expect(gameboards[1].observeBoard()).toStrictEqual(boardEmpty);
    });
    test("TWO Player objects should be created correctly", () => {
        const players = game.getPlayers();
        expect(players[0].getStyle()).toBe("Manual");
        expect(players[1].getStyle()).toBe("Computer");
    });
});

describe("Calling the changeTurn method... ", () => {
    const game = Game();
    let turn = game.getTurn();
    test("Should cycle the turn value between 0 and 1", () => {
        expect([0, 1]).toContain(turn);
        game.changeTurn();
        turn = game.getTurn();
        expect([0, 1]).toContain(turn);
        game.changeTurn();
        turn = game.getTurn();
        expect([0, 1]).toContain(turn);
    });
});

describe("Calling the startGame method... ", () => {
    const game = Game();
    const gameboards = game.getGameboards();
    const spyBoard1StartGame = jest.spyOn(gameboards[0], "startGame");
    const spyBoard2StartGame = jest.spyOn(gameboards[1], "startGame");
    const players = game.getPlayers();
    players[0].setStyle("Manual");
    players[1].setStyle("Manual");
    const spyGlobalSetTimeout = jest.spyOn(global, "setTimeout");
    game.startGame();
    test("Should set the game started state to true", () => {
        expect(game.isGameStarted()).toBe(true);
    });
    test("Should call the startGame method on both Gameboard objects", () => {
        expect(spyBoard1StartGame).toHaveBeenCalledTimes(2);
        expect(spyBoard2StartGame).toHaveBeenCalledTimes(2);
    });
    test("Should set the current turn to either 0 or 1", () => {
        const turn = game.getTurn();
        expect([0, 1]).toContain(turn);
    });
    describe("If the current turn is for a Player object whose style is set to 'Manual'... ", () => {
        test("Should NOT call the async computerAttack method", () => {
            if (game.getTurn() === 1) game.changeTurn();
            expect(spyGlobalSetTimeout).toHaveBeenCalledTimes(1);
        });
    });
    game.resetGame();
    players[0].setStyle("Computer");
    players[1].setStyle("Computer");
    game.startGame();
    describe("If the current turn is for a Player object whose style is set to 'Computer'... ", () => {
        test("Should call the async computerAttack method", () => {
            if (game.getTurn() === 0) game.changeTurn();
            expect(spyGlobalSetTimeout).toHaveBeenCalledTimes(1);
        });
    });
});

describe("Calling the resetGame method... ", () => {
    const game = Game();
    const gameboards = game.getGameboards();
    const spyBoard1ResetBoard = jest.spyOn(gameboards[0], "resetBoard");
    const spyBoard2ResetBoard = jest.spyOn(gameboards[1], "resetBoard");
    test("Should set the game started state to false", () => {
        game.startGame();
        game.resetGame();
        expect(game.isGameStarted()).toBe(false);
    });
    test("Should call the resetBoard method on both Gameboard objects", () => {
        expect(spyBoard1ResetBoard).toHaveBeenCalledTimes(1);
        expect(spyBoard2ResetBoard).toHaveBeenCalledTimes(1);
    });
});

describe("Calling the endGame method... ", () => {
    const game = Game();
    test("Should set the game started state to false", () => {
        game.startGame();
        game.endGame();
        expect(game.isGameStarted()).toBe(false);
    });
});
