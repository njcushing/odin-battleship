import Gameboard from "./../Gameboard/Gameboard";

describe("Calling the isGameStarted method... ", () => {
    const board = Gameboard(1);
    test("Should return the default value after initialisation (false)", () => {
        expect(board.isGameStarted()).toBe(false);
    });
});

describe("Calling the startGame method... ", () => {
    const board = Gameboard(1);
    board.startGame();
    test("Should set the game's 'started' state to true", () => {
        expect(board.isGameStarted()).toBe(true);
    });
});

describe("Calling the observeBoard method... ", () => {
    test("Should return a copy of the board array", () => {
        const board = Gameboard(3);
        expect(board.observeBoard()).toStrictEqual([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
    });
});

describe("Calling the totalNumberOfShips method... ", () => {
    const board = Gameboard(5);
    describe("If the game has NOT yet started... ", () => {
        test("Should return the correct number of ships (3)", () => {
            board.placeShip(1, [0, 0], false);
            board.placeShip(1, [3, 4], false);
            board.placeShip(1, [2, 2], false);
            expect(board.totalNumberOfShips()).toBe(3);
        });
        test("Should return the correct number of ships (4)", () => {
            board.placeShip(1, [3, 0], false);
            expect(board.totalNumberOfShips()).toBe(4);
        });
    });
    describe("If the game has started... ", () => {
        test("Should return the correct number of ships (4)", () => {
            board.startGame();
            board.receiveAttack([0, 0]);
            expect(board.totalNumberOfShips()).toBe(4);
        });
    });
});

describe("On Gameboard object instantiation... ", () => {
    test("A board of size 3x3 should be created correctly", () => {
        const board = Gameboard(3);
        expect(board.observeBoard()).toStrictEqual([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
    });
    test("A board of size 4x4 should be created correctly", () => {
        const board = Gameboard(4);
        expect(board.observeBoard()).toStrictEqual([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]);
    });
    test("A board of size 3x3 should not be created incorrectly", () => {
        const board = Gameboard(3);
        expect(board.observeBoard()).not.toStrictEqual([
            [0, 0],
            [0, 0],
        ]);
    });
});

describe("Calling the getCellStateAt method... ", () => {
    const board = Gameboard(8);
    test("Should return null if the given position does not lie on the board ", () => {
        expect(board.getCellStateAt([-1, 8])).toBeNull();
    });
    test("Should return the correct value when the given position lies on the board", () => {
        expect(board.getCellStateAt([3, 3])).toBe(0);
    });
});

describe("Calling the placeShip method... ", () => {
    const board = Gameboard(8);
    const boardEmpty = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    describe("If the game has not yet been started (default)... ", () => {
        describe("Should do nothing if the first argument (ship length)... ", () => {
            test("Is negative", () => {
                board.placeShip(-1, [3, 3], false);
                expect(board.observeBoard()).toStrictEqual(boardEmpty);
            });
            test("Is zero", () => {
                board.placeShip(0, [3, 3], false);
                expect(board.observeBoard()).toStrictEqual(boardEmpty);
            });
            test("Exceeds the size of the board", () => {
                board.placeShip(9, [3, 3], false);
                expect(board.observeBoard()).toStrictEqual(boardEmpty);
            });
            test("Is a float", () => {
                board.placeShip(1.5, [3, 3], false);
                expect(board.observeBoard()).toStrictEqual(boardEmpty);
            });
            test("Is not a number at all", () => {
                board.placeShip("test", [3, 3], false);
                expect(board.observeBoard()).toStrictEqual(boardEmpty);
            });
        });
        describe("Should do nothing if the second argument (ship position)... ", () => {
            test("Is not an array", () => {
                board.placeShip(4, "test", false);
                expect(board.observeBoard()).toStrictEqual(boardEmpty);
            });
            test("Is not exactly 2 elements long", () => {
                board.placeShip(4, [3, 3, 3], false);
                expect(board.observeBoard()).toStrictEqual(boardEmpty);
            });
            test("Doesn't only contain integers", () => {
                board.placeShip(4, [2, "test"], false);
                expect(board.observeBoard()).toStrictEqual(boardEmpty);
            });
        });
        describe("Should do nothing if the third argument (ship rotation)... ", () => {
            test("Is not a boolean", () => {
                board.placeShip(4, [3, 3], "test");
                expect(board.observeBoard()).toStrictEqual(boardEmpty);
            });
        });
        describe("Should place a ship at the given position... ", () => {
            test("Rotated", () => {
                board.placeShip(5, [3, 3], false);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
            test("Not rotated", () => {
                board.placeShip(4, [7, 2], true);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 1, 1, 1, 1, 1, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
        });
        describe("Should NOT place a ship at the given position... ", () => {
            test("If it will exceed the bounds of the board", () => {
                board.placeShip(4, [0, 1], false);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 1, 1, 1, 1, 1, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
            test("If it will intrude on the bounds of another ship", () => {
                board.placeShip(4, [2, 3], false);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 1, 1, 1, 1, 1, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
        });
    });
    describe("If the game has been started... ", () => {
        describe("Should NOT place a ship at the given position... ", () => {
            test("Even if that position is valid", () => {
                board.startGame();
                board.placeShip(3, [2, 1], false);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 1, 1, 1, 1, 1, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
        });
    });
});

describe("Calling the moveShip method... ", () => {
    const board = Gameboard(8);
    board.placeShip(5, [3, 3], false);
    const boardSame = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    describe("If the game has not yet been started (default)... ", () => {
        describe("Should do nothing if the first argument (ship original position)... ", () => {
            test("Is not an array", () => {
                board.moveShip("test", [3, 3], false);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
            test("Is not exactly 2 elements long", () => {
                board.moveShip([3, 3, 3], [3, 3], false);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
            test("Doesn't only contain integers", () => {
                board.moveShip([2, "test"], [3, 3], false);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
        });
        describe("Should do nothing if the second argument (ship destination position)... ", () => {
            test("Is not an array", () => {
                board.moveShip([3, 3], "test", false);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
            test("Is not exactly 2 elements long", () => {
                board.moveShip([3, 3], [3, 3, 3], false);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
            test("Doesn't only contain integers", () => {
                board.moveShip([3, 3], [2, "test"], false);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
        });
        describe("Should do nothing if the third argument (ship rotation from current rotation)... ", () => {
            test("Is not a boolean", () => {
                board.moveShip([3, 3], [3, 3], "test");
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
        });
        describe("Should move a ship to the new location... ", () => {
            test("When moved from its middle cell", () => {
                board.moveShip([3, 3], [3, 2], false);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
            test("When moved from its edge cell", () => {
                board.moveShip([5, 2], [6, 4], false);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
            test("When rotated against its current rotation", () => {
                board.moveShip([4, 4], [4, 4], true);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
        });
        describe("Should NOT move a ship to the new location... ", () => {
            test("If there is no ship at the provided origin position", () => {
                board.moveShip([2, 2], [2, 2], false);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
            test("If it will exceed the bounds of the board", () => {
                board.moveShip([4, 4], [4, 1], false);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
            test("If it will intrude on the bounds of another ship", () => {
                board.placeShip(3, [1, 3], false);
                board.moveShip([4, 4], [3, 4], false);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [1, 1, 1, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
        });
    });
    describe("If the game has been started... ", () => {
        describe("Should NOT move a ship to the new location... ", () => {
            test("Even if there is a ship at the origin and the desination is valid", () => {
                board.startGame();
                board.moveShip([4, 4], [5, 5], false);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [1, 1, 1, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
        });
    });
});

describe("Calling the deleteShip method... ", () => {
    const board = Gameboard(8);
    board.placeShip(5, [3, 3], false);
    board.placeShip(5, [3, 6], false);
    const boardSame = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    describe("If the game has not yet been started (default)... ", () => {
        describe("Should do nothing if the first argument (position)... ", () => {
            test("Is not an array", () => {
                board.deleteShip("test");
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
            test("Is not exactly 2 elements long", () => {
                board.deleteShip([3, 3, 3]);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
            test("Doesn't only contain integers", () => {
                board.deleteShip([3, "test"]);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
        });
        describe("Should NOT remove the ship from the board... ", () => {
            test("If the position is not within the bounds of the board", () => {
                board.deleteShip([9, 9]);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
            test("If one is not at the given position", () => {
                board.deleteShip([2, 2]);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
        });
        describe("Should remove the ship from the board... ", () => {
            test("If one is at the given position", () => {
                board.deleteShip([3, 3]);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
        });
    });
    describe("If the game has been started... ", () => {
        describe("Should NOT remove the ship from the board... ", () => {
            test("Even if there is a ship at the specified position", () => {
                board.startGame();
                board.deleteShip([3, 6]);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
        });
    });
});

describe("Calling the receiveAttack method... ", () => {
    const board = Gameboard(8);
    board.placeShip(5, [3, 3], false);
    const boardSame = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    describe("If the game has not yet been started (default)... ", () => {
        describe("Should NOT place an 'attacked' position on the board", () => {
            test("Even if the position being attacked is valid", () => {
                board.receiveAttack([4, 4]);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
        });
    });
    describe("If the game has been started... ", () => {
        describe("Should do nothing if the first argument (position)... ", () => {
            test("Is not an array", () => {
                board.startGame();
                board.receiveAttack("test");
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
            test("Is not exactly 2 elements long", () => {
                board.receiveAttack([3, 3, 3]);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
            test("Doesn't only contain integers", () => {
                board.receiveAttack([3, "test"]);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
        });
        describe("Should NOT place an 'attacked' position on the board... ", () => {
            test("If the attack is outside the bounds of the board", () => {
                board.receiveAttack([9, 9]);
                expect(board.observeBoard()).toStrictEqual(boardSame);
            });
        });
        describe("Should place an 'attacked' position on the board... ", () => {
            test("If the attack is inside the bounds of the board", () => {
                board.receiveAttack([4, 4]);
                expect(board.observeBoard()).toStrictEqual([
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 2, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                ]);
            });
        });
    });
});

describe("Calling the checkDefeat method... ", () => {
    const board = Gameboard(8);
    board.placeShip(1, [3, 3], false);
    describe("If the game has not yet been started (default)... ", () => {
        test("Should return false", () => {
            expect(board.checkDefeat()).toBe(false);
        });
    });
    describe("If the game has been started... ", () => {
        test("Should return false while there is at least one position containing an alive ship", () => {
            board.startGame();
            expect(board.checkDefeat()).toBe(false);
        });
        test("Should return true when there are no positions containing an alive ship", () => {
            board.receiveAttack([3, 3]);
            expect(board.checkDefeat()).toBe(true);
        });
    });
});

describe("previousAttacks, previousHits, previousSinks and resetBoard methods grouping... ", () => {
    const board = Gameboard(3);
    const boardEmpty = board.observeBoard();
    board.placeShip(2, [0, 0], false);
    board.placeShip(2, [1, 2], false);
    board.startGame();
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    board.receiveAttack([0, 1]);
    board.receiveAttack([1, 0]);
    board.receiveAttack([1, 1]);
    board.receiveAttack([1, 2]);
    board.receiveAttack([2, 2]);

    describe("Calling the previousAttacks method... ", () => {
        test("Should return an array containing the coordinate positions of each attack", () => {
            expect(board.previousAttacks()).toStrictEqual([
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
                [1, 2],
                [2, 2],
            ]);
        });
    });

    describe("Calling the previousHits method... ", () => {
        test("Should return an array containing the coordinate positions of each successful hit", () => {
            expect(board.previousHits()).toStrictEqual([
                [0, 0],
                [1, 0],
                [1, 2],
                [2, 2],
            ]);
        });
    });

    describe("Calling the previousSinks method... ", () => {
        test("Should return an array containing the coordinate positions of each successful hit", () => {
            expect(board.previousSinks()).toStrictEqual([
                [
                    [1, 0],
                    [0, 0],
                ],
                [
                    [2, 2],
                    [1, 2],
                ],
            ]);
        });
    });

    describe("Calling the resetBoard method... ", () => {
        test("Should reset the game started state to false", () => {
            board.resetBoard();
            expect(board.isGameStarted()).toBe(false);
        });
        test("Should reset the previousAttacks array", () => {
            expect(board.previousAttacks()).toStrictEqual([]);
        });
        test("Should reset the previousHits array", () => {
            expect(board.previousHits()).toStrictEqual([]);
        });
        test("Should reset the previousSinks array", () => {
            expect(board.previousSinks()).toStrictEqual([]);
        });
        test("Should reset the board to empty", () => {
            expect(board.observeBoard()).toStrictEqual(boardEmpty);
        });
    });
});
