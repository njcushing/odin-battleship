import Game from "./../Game/Game";
import Gameboard from "./../Gameboard/Gameboard";

jest.useFakeTimers();
afterEach(() => {
    const spyGlobalSetTimeout = jest.spyOn(global, "setTimeout");
    spyGlobalSetTimeout.mockRestore();
    jest.runOnlyPendingTimers();
});

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
    const players = game.getPlayers();
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
    describe("If the new current turn is for a Player object whose style is set to 'Manual'... ", () => {
        test("The async computerAttack method SHOULD NOT be called", () => {
            players[0].setStyle("Manual");
            players[1].setStyle("Manual");
            const spyGlobalSetTimeout = jest.spyOn(global, "setTimeout");
            game.changeTurn();
            expect(spyGlobalSetTimeout).toHaveBeenCalledTimes(0);
        });
    });
    describe("If the new current turn is for a Player object whose style is set to 'Computer'... ", () => {
        describe("If the game is NOT yet started... ", () => {
            test("The async computerAttack method SHOULD NOT be called", () => {
                players[0].setStyle("Computer");
                players[1].setStyle("Computer");
                const spyGlobalSetTimeout = jest.spyOn(global, "setTimeout");
                game.changeTurn();
                expect(spyGlobalSetTimeout).toHaveBeenCalledTimes(0);
            });
        });
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
    test("Should return null if the game has already started", () => {
        expect(game.startGame()).toBe(null);
    });
    test("Should set the game started state to true", () => {
        expect(game.isGameStarted()).toBe(true);
    });
    test("Should call the startGame method on both Gameboard objects", () => {
        expect(spyBoard1StartGame).toHaveBeenCalledTimes(1);
        expect(spyBoard2StartGame).toHaveBeenCalledTimes(1);
    });
    test("Should set the current turn to either 0 or 1", () => {
        const turn = game.getTurn();
        expect([0, 1]).toContain(turn);
    });
    describe("If the current turn is for a Player object whose style is set to 'Manual'... ", () => {
        test("The async computerAttack method SHOULD NOT be called", () => {
            expect(spyGlobalSetTimeout).toHaveBeenCalledTimes(0);
        });
    });
    test("Should return null if the game is in an ended state", () => {
        game.endGame();
        expect(game.startGame()).toBe(null);
    });
    describe("If the current turn is for a Player object whose style is set to 'Computer'... ", () => {
        test("The async computerAttack method SHOULD be called", () => {
            game.resetGame();
            players[0].setStyle("Computer");
            players[1].setStyle("Computer");
            const spyGlobalSetTimeout = jest.spyOn(global, "setTimeout");
            game.startGame();
            expect(spyGlobalSetTimeout).toHaveBeenCalledTimes(1);
        });
    });
});

describe("Calling the changeTurn method... ", () => {
    const game = Game();
    const players = game.getPlayers();
    let turn = game.getTurn();
    describe("If the new current turn is for a Player object whose style is set to 'Computer'... ", () => {
        describe("If the game has started... ", () => {
            test("The async computerAttack method SHOULD be called", () => {
                players[0].setStyle("Computer");
                players[1].setStyle("Computer");
                game.startGame();
                const spyGlobalSetTimeout = jest.spyOn(global, "setTimeout");
                game.changeTurn();
                expect(spyGlobalSetTimeout).toHaveBeenCalledTimes(1);
            });
        });
    });
});

describe("Calling the manualAttack method... ", () => {
    const game = Game();
    const gameboards = game.getGameboards();
    gameboards[0].placeShip(1, [0, 0], false);
    gameboards[1].placeShip(1, [0, 0], false);
    const players = game.getPlayers();
    describe("Should return null if the first argument (board index)... ", () => {
        test("Is not an integer", () => {
            expect(game.manualAttack(0.5, [2, 2])).toBeNull();
        });
        test("Is less than 0", () => {
            expect(game.manualAttack(-1, [2, 2])).toBeNull();
        });
        test("Is larger than 1", () => {
            expect(game.manualAttack(2, [2, 2])).toBeNull();
        });
    });
    describe("If the first argument is valid... ", () => {
        test("Should return null if the game has not yet started", () => {
            expect(game.manualAttack(0, [2, 2])).toBeNull();
            players[0].setStyle("Manual");
            players[1].setStyle("Manual");
            game.startGame();
        });
        test("Should return null if current Player's style is set to 'Computer'", () => {
            players[0].setStyle("Computer");
            players[1].setStyle("Computer");
            expect(game.manualAttack(0, [2, 2])).toBeNull();
            players[0].setStyle("Manual");
            players[1].setStyle("Manual");
        });
        test("Should return null if the current player is trying to attack their own board", () => {
            if (game.getTurn() === 1) game.changeTurn();
            expect(game.manualAttack(0, [2, 2])).toBeNull();
        });
        test("Should call the receiveAttack method on the board being attacked", () => {
            const spyBoard1ReceiveAttack = jest.spyOn(
                gameboards[1],
                "receiveAttack"
            );
            game.manualAttack(1, [2, 2]);
            expect(spyBoard1ReceiveAttack).toHaveBeenCalledTimes(1);
        });
        test("Should NOT change turn if an unsuccessful hit went through", () => {
            if (game.getTurn() === 1) game.changeTurn();
            const currentTurn = game.getTurn();
            game.manualAttack(1, [2, 2]);
            expect(game.getTurn()).toBe(currentTurn);
        });
        describe("If a successful hit went through, should check for defeat on the board... ", () => {
            test("If false, change turn", () => {
                const currentTurn = game.getTurn();
                game.manualAttack(1, [3, 3]);
                expect(game.getTurn()).not.toBe(currentTurn);
            });
            test("If true, set the Game's ended state to true", () => {
                game.manualAttack(0, [0, 0]);
                expect(game.isGameEnded()).toBe(true);
            });
            test("If true, set the Game's started state to false", () => {
                expect(game.isGameStarted()).toBe(false);
            });
            test("If true, further calls should return null", () => {
                if (game.getTurn() === 1) game.changeTurn();
                expect(game.manualAttack(1, [1, 1])).toBeNull();
            });
        });
    });
});

describe("Calling the endGame method... ", () => {
    const game = Game();
    test("Should set the game started state to false", () => {
        game.startGame();
        game.endGame();
        expect(game.isGameStarted()).toBe(false);
    });
    test("Should set the game ended state to true", () => {
        expect(game.isGameEnded()).toBe(true);
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
    test("Should set the game ended state to false", () => {
        expect(game.isGameEnded()).toBe(false);
    });
    test("Should call the resetBoard method on both Gameboard objects", () => {
        expect(spyBoard1ResetBoard).toHaveBeenCalledTimes(1);
        expect(spyBoard2ResetBoard).toHaveBeenCalledTimes(1);
    });
});

describe("If the current Player's style is set to 'Computer'... ", () => {
    const game = Game();
    const gameboards = game.getGameboards();
    gameboards[0].placeShip(1, [0, 0], false);
    gameboards[1].placeShip(1, [0, 0], false);
    const players = game.getPlayers();
    players[0].setStyle("Manual");
    players[1].setStyle("Computer");
    if (game.getTurn() === 0) game.changeTurn();
    const spy = jest.spyOn(players[1], "takeComputerTurn");
    spy.mockImplementationOnce(() => {
        gameboards[0].receiveAttack([1, 1]);
    });
    game.startGame();
    if (game.getTurn() === 0) game.changeTurn();
    describe("If a successful hit went through, should check for defeat on the board... ", () => {
        test("If false, change turn", () => {
            expect(game.getTurn()).toBe(0);
            spy.mockImplementationOnce(() => {
                gameboards[0].receiveAttack([0, 0]);
            });
            if (game.getTurn() === 0) game.changeTurn();
        });
        test("If true, set the Game's ended state to true", () => {
            expect(game.isGameEnded()).toBe(true);
        });
        test("If true, set the Game's started state to false", () => {
            expect(game.isGameStarted()).toBe(false);
        });
    });
});
