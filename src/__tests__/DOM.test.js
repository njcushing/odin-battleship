/**
 * @jest-environment jsdom
 */

import DOM from "./../DOM/DOM";
import Gameboard from "./../Gameboard/Gameboard";

const UI = DOM();

describe("Calling the displayGame method... ", () => {
    UI.displayGame();
    test("Should populate the element dictionary's properties with HTML Elements", () => {
        expect(UI.ele.base instanceof HTMLElement).toBe(true);
    });
});

describe("Calling the createElement method... ", () => {
    describe("If the first argument (HTML element type)... ", () => {
        test("Is NOT a valid HTML element type, the method should return null", () => {
            expect(UI.createElement("aaa", ["test"], null)).toBeNull();
        });
        test("Is a valid HTML element type, the element should be created as normal", () => {
            const mockElement = UI.createElement("div", ["test"], null);
            expect(mockElement instanceof HTMLElement).toBe(true);
        });
    });
    describe("If the second argument (class name array)... ", () => {
        test("Is NOT an array, the element should be created as normal but with no classes", () => {
            const mockElement = UI.createElement("div", "test", null);
            const classArray = [...mockElement.classList];
            expect(classArray).toStrictEqual([]);
        });
        test("Contains any elements other than strings, they should be ignored", () => {
            const mockElement = UI.createElement("div", ["test", 0, []], null);
            const classArray = [...mockElement.classList];
            expect(classArray).toStrictEqual(["test"]);
        });
    });
    describe("If the third argument (HTML element type)... ", () => {
        test("Is NOT a valid DOM element, the element should be created as normal but with no parent", () => {
            const mockElement = UI.createElement("div", ["test"], null);
            expect(mockElement.parentNode).toBeNull();
        });
        test("Is a valid DOM element, the element should be created as normal with a parent", () => {
            const mockParent = document.createElement("div");
            const mockElement = UI.createElement("div", ["test"], mockParent);
            expect(mockParent.contains(mockElement)).toBe(true);
        });
    });
});

describe("Calling the createCell method... ", () => {
    const mockParent = document.createElement("div");
    describe("If the argument (parent node)... ", () => {
        test("Is NOT a valid DOM element, the method should return null", () => {
            expect(UI.createCell("test")).toBeNull();
        });
        test("Is a valid DOM element, the cell should be created as normal", () => {
            UI.createCell(mockParent);
            expect(mockParent.lastChild.classList).toContain("btls-cell");
        });
    });
});

describe("Calling the createBoard method... ", () => {
    describe("If the first argument (Gameboard module)... ", () => {
        test("Is null, the method should return null", () => {
            const mockParent = document.createElement("div");
            expect(UI.createBoard(null, 0, mockParent)).toBeNull();
        });
        test("Is NOT a valid object, the method should return null", () => {
            const mockParent = document.createElement("div");
            expect(UI.createBoard("test", 0, mockParent)).toBeNull();
        });
        test("Is NOT a valid Gameboard module, the method should return null", () => {
            const mockParent = document.createElement("div");
            expect(UI.createBoard({}, 0, mockParent)).toBeNull();
        });
    });
    describe("If the second argument (board number)...  ", () => {
        test("Is NOT an integer, the method should return null", () => {
            expect(UI.createBoard(Gameboard(3), "test", null)).toBeNull();
        });
        test("Is NOT either 0 or 1, the method should return null", () => {
            expect(UI.createBoard(Gameboard(3), 2, null)).toBeNull();
        });
    });
    describe("If the third argument (parent node)...  ", () => {
        test("Is NOT a valid DOM element, the method should return null", () => {
            expect(UI.createBoard(Gameboard(3), 0, null)).toBeNull();
        });
    });
    describe("If all arguments are valid... ", () => {
        const mockParent = document.createElement("div");
        const mockBoardOne = Gameboard(3);
        mockBoardOne.placeShip(1, [2, 2], false);
        const mockBoardTwo = Gameboard(4);
        test("The parent node should be cleared of all children before adding the cell elements (test 1)", () => {
            UI.createBoard(mockBoardOne, 0, mockParent);
            expect(mockParent.children.length).toBe(9);
        });
        test("The parent node should be cleared of all children before adding the cell elements (test 2)", () => {
            UI.createBoard(mockBoardTwo, 0, mockParent);
            expect(mockParent.children.length).toBe(16);
        });
    });
});

describe("Changing the input value of the place ship model's size... ", () => {
    test("Should change the number of child elements in the model to match that value", () => {
        UI.ele.b1PlaceShipSizeInput.value = 8;
        UI.ele.b1PlaceShipSizeInput.dispatchEvent(new Event("input"));
        expect(UI.ele.b1PlaceShipModel.children.length).toBe(8);
    });
    test("Should have a maximum value of 10", () => {
        UI.ele.b1PlaceShipSizeInput.value = 18;
        UI.ele.b1PlaceShipSizeInput.dispatchEvent(new Event("input"));
        expect(UI.ele.b1PlaceShipModel.children.length).toBe(10);
    });
    test("Should have a minimum value of 1", () => {
        UI.ele.b2PlaceShipSizeInput.value = -3;
        UI.ele.b2PlaceShipSizeInput.dispatchEvent(new Event("input"));
        expect(UI.ele.b2PlaceShipModel.children.length).toBe(1);
    });
});

describe("Clicking the 'Rotate Ship' button... ", () => {
    test("Should update the model without changing its number of child elements (board 1)", () => {
        const childCount = UI.ele.b1PlaceShipModel.children.length;
        UI.ele.b1PlaceShipRotationButton.click();
        expect(UI.ele.b1PlaceShipModel.children.length).toBe(childCount);
    });
    test("Should update the model without changing its number of child elements (board 2)", () => {
        const childCount = UI.ele.b2PlaceShipModel.children.length;
        UI.ele.b2PlaceShipRotationButton.click();
        expect(UI.ele.b2PlaceShipModel.children.length).toBe(childCount);
    });
});

describe("Changing the input value of the place ship x-coordinate... ", () => {
    test("Should have a maximum value of 10", () => {
        UI.ele.b1PlaceShipXCoordInput.value = 18;
        UI.ele.b1PlaceShipXCoordInput.dispatchEvent(new Event("input"));
        expect(parseInt(UI.ele.b1PlaceShipXCoordInput.value)).toBe(10);
    });
    test("Should have a minimum value of 1", () => {
        UI.ele.b2PlaceShipXCoordInput.value = -3;
        UI.ele.b2PlaceShipXCoordInput.dispatchEvent(new Event("input"));
        expect(parseInt(UI.ele.b2PlaceShipXCoordInput.value)).toBe(1);
    });
});

describe("Changing the input value of the place ship y-coordinate... ", () => {
    test("Should have a maximum value of 10", () => {
        UI.ele.b1PlaceShipYCoordInput.value = 18;
        UI.ele.b1PlaceShipYCoordInput.dispatchEvent(new Event("input"));
        expect(parseInt(UI.ele.b1PlaceShipYCoordInput.value)).toBe(10);
    });
    test("Should have a minimum value of 1", () => {
        UI.ele.b2PlaceShipYCoordInput.value = -3;
        UI.ele.b2PlaceShipYCoordInput.dispatchEvent(new Event("input"));
        expect(parseInt(UI.ele.b2PlaceShipYCoordInput.value)).toBe(1);
    });
});

describe("Clicking the 'Change Player Style' button... ", () => {
    const players = UI.game.getPlayers();
    const boards = UI.game.getGameboards();
    const playerStyleOriginal = players[0].getStyle();
    describe("If the game has NOT yet been started... ", () => {
        test("Should change the style one way", () => {
            UI.ele.b1ChangeStyleButton.click();
            expect(players[0].getStyle()).not.toBe(playerStyleOriginal);
        });
        test("Should change the style back to its original way", () => {
            UI.ele.b1ChangeStyleButton.click();
            expect(players[0].getStyle()).toBe(playerStyleOriginal);
        });
        test("Should call the 'resetBoard' method on the Gameboard if switching to 'Computer' style", () => {
            if (players[1].getStyle() === "Computer")
                players[1].setStyle("Manual");
            const spy = jest.spyOn(boards[1], "resetBoard");
            UI.ele.b2ChangeStyleButton.click();
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
        });
    });
});

describe("Clicking the 'Hide/Show Ships' button... ", () => {
    const players = UI.game.getPlayers();
    describe("If the game has NOT yet been started... ", () => {
        test("Should change the 'hidden' state of a 'Manual' player's board one way (board 1)", () => {
            const hidden = UI.ele.board1.classList.contains("ships-hidden");
            players[0].setStyle("Manual");
            UI.ele.b1HideShipsButton.click();
            expect(UI.ele.board1.classList.contains("ships-hidden")).not.toBe(
                hidden
            );
        });
        test("Should change the 'hidden' state of a 'Manual' player's board back to its original way (board 1)", () => {
            const hidden = UI.ele.board1.classList.contains("ships-hidden");
            UI.ele.b1HideShipsButton.click();
            expect(UI.ele.board1.classList.contains("ships-hidden")).not.toBe(
                hidden
            );
        });
        test("Should change the 'hidden' state of a 'Manual' player's board one way (board 2)", () => {
            const hidden = UI.ele.board2.classList.contains("ships-hidden");
            players[1].setStyle("Manual");
            UI.ele.b2HideShipsButton.click();
            expect(UI.ele.board2.classList.contains("ships-hidden")).not.toBe(
                hidden
            );
        });
        test("Should change the 'hidden' state of a 'Manual' player's board back to its original way (board 2)", () => {
            const hidden = UI.ele.board2.classList.contains("ships-hidden");
            UI.ele.b2HideShipsButton.click();
            expect(UI.ele.board2.classList.contains("ships-hidden")).not.toBe(
                hidden
            );
        });
        test("Should NOT change the 'hidden' state of a 'Computer' player's board", () => {
            players[1].setStyle("Computer");
            UI.ele.b2HideShipsButton.click();
            expect(UI.ele.board2.classList).toContain("ships-hidden");
        });
    });
});

describe("Clicking the 'Place Ship' button... ", () => {
    const boards = UI.game.getGameboards();
    const players = UI.game.getPlayers();
    describe("If the game has NOT yet been started... ", () => {
        describe("If the current board belongs to a player of style 'Manual'... ", () => {
            test("Should call the Gameboard's placeShip method with the correct arguments (board 1)", () => {
                players[0].setStyle("Manual");
                const spy = jest.spyOn(boards[0], "placeShip");
                UI.ele.b1PlaceShipSizeInput.value = 3;
                UI.ele.b1PlaceShipXCoordInput.value = 5;
                UI.ele.b1PlaceShipYCoordInput.value = 5;
                UI.ele.b1PlaceShipSizeInput.dispatchEvent(new Event("input"));
                UI.ele.b1PlaceShipXCoordInput.dispatchEvent(new Event("input"));
                UI.ele.b1PlaceShipYCoordInput.dispatchEvent(new Event("input"));
                UI.ele.b1PlaceShipPlaceButton.click();
                expect(spy).toHaveBeenCalledWith(3, [5, 5], true || false);
                boards[0].resetBoard();
                spy.mockRestore();
            });
            test("Should call the Gameboard's placeShip method with the correct arguments (board 2)", () => {
                players[1].setStyle("Manual");
                const spy = jest.spyOn(boards[1], "placeShip");
                UI.ele.b2PlaceShipSizeInput.value = 2;
                UI.ele.b2PlaceShipXCoordInput.value = 7;
                UI.ele.b2PlaceShipYCoordInput.value = 6;
                UI.ele.b2PlaceShipSizeInput.dispatchEvent(new Event("input"));
                UI.ele.b2PlaceShipXCoordInput.dispatchEvent(new Event("input"));
                UI.ele.b2PlaceShipYCoordInput.dispatchEvent(new Event("input"));
                UI.ele.b2PlaceShipPlaceButton.click();
                expect(spy).toHaveBeenCalledWith(2, [7, 6], true || false);
                boards[1].resetBoard();
                spy.mockRestore();
            });
        });
        describe("If the current board belongs to a player of style 'Computer'... ", () => {
            test("Should NOT call the Gameboard's placeShip method", () => {
                players[1].setStyle("Computer");
                const spy = jest.spyOn(boards[1], "placeShip");
                UI.ele.b1PlaceShipPlaceButton.click();
                expect(spy).not.toHaveBeenCalled();
                spy.mockRestore();
            });
        });
    });
});

describe("Clicking a cell on the board...", () => {
    describe("If the game has NOT yet been started... ", () => {
        test("Should call the Game module's 'manualAttack' method", () => {
            const cell = UI.ele.board1.lastChild;
            const spy = jest.spyOn(UI.game, "manualAttack");
            cell.click();
            expect(spy).toHaveBeenCalledTimes(1);
        });
        test("Should do nothing to the state of the board", () => {
            const board = UI.game.getGameboards()[0].observeBoard();
            const cell = UI.ele.board1.lastChild;
            cell.click();
            expect(UI.game.getGameboards()[0].observeBoard()).toStrictEqual(
                board
            );
        });
    });
});

describe("Clicking the 'Start Game' button... ", () => {
    test("Should be possible only if the button is an HTML element", () => {
        expect(UI.ele.startButton instanceof HTMLElement).toBe(true);
    });
    describe("If there is NOT at least one ship on both boards... ", () => {
        test("Should NOT call the Game module's startGame method", () => {
            const spy = jest.spyOn(UI.game, "startGame");
            UI.ele.startButton.click();
            expect(spy).toHaveBeenCalledTimes(0);
        });
    });
    describe("If there is at least one ship on both boards... ", () => {
        test("Should call the Game module's startGame method", () => {
            const boards = UI.game.getGameboards();
            boards[0].placeShip(1, [0, 0], false);
            boards[1].placeShip(1, [0, 0], false);
            const spy = jest.spyOn(UI.game, "startGame");
            UI.ele.startButton.click();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});

describe("Clicking the 'Change Player Style' button... ", () => {
    const players = UI.game.getPlayers();
    describe("If the game has been started... ", () => {
        test("Should NOT change the player style", () => {
            const playerStyleCurrent = players[0].getStyle();
            UI.ele.b1ChangeStyleButton.click();
            expect(players[0].getStyle()).toBe(playerStyleCurrent);
        });
    });
});

describe("Clicking the 'Place Ship' button... ", () => {
    const boards = UI.game.getGameboards();
    describe("If the game has been started... ", () => {
        test("Should NOT call the Gameboard's placeShip method", () => {
            const spy = jest.spyOn(boards[0], "placeShip");
            UI.ele.b1PlaceShipPlaceButton.click();
            expect(spy).not.toHaveBeenCalled();
        });
    });
});

describe("Clicking the 'Reset Game' button... ", () => {
    test("Should be possible only if the button is an HTML element", () => {
        expect(UI.ele.resetButton instanceof HTMLElement).toBe(true);
    });
    test("Should call the Game module's resetGame method", () => {
        const spy = jest.spyOn(UI.game, "resetGame");
        UI.ele.resetButton.click();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
