/**
 * @jest-environment jsdom
 */

import DOM from "./../DOM/DOM";
import Gameboard from "./../Gameboard/Gameboard";

const UI = DOM();
UI.displayGame();

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
        test("Is NOT a valid object, the method should return null", () => {
            const mockParent = document.createElement("div");
            expect(UI.createBoard(null, 0, mockParent)).toBeNull();
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

describe("Calling the attackCell method... ", () => {
    const mockDOM = DOM();
    const mockParent = document.createElement("div");
    const mockCell = UI.createCell(mockParent);
    describe("If the first argument (cell node)... ", () => {
        test("Is NOT a valid DOM element, the method should return null", () => {
            expect(mockDOM.attackCell(null, [0, 0], 0)).toBeNull();
        });
    });
    describe("If the second argument (position)... ", () => {
        test("Is NOT a valid position on the board, the method should return null", () => {
            expect(mockDOM.attackCell(mockCell, "test", 0)).toBeNull();
        });
    });
    describe("If the third argument (board number)... ", () => {
        test("Is NOT an integer, the method should return null", () => {
            expect(mockDOM.attackCell(mockCell, [0, 0], "test")).toBeNull();
        });
        test("Is NOT either 0 or 1, the method should return null", () => {
            expect(mockDOM.attackCell(mockCell, [0, 0], 2)).toBeNull();
        });
    });
    describe("If the cell is clicked... ", () => {
        test("This method should be called", () => {
            const spy = jest.spyOn(mockDOM, "attackCell");
            mockCell.addEventListener("click", () => {
                mockDOM.attackCell(mockCell, [0, 0], 1);
            });
            mockCell.click();
            expect(spy).toHaveBeenCalledTimes(1);
        });
        test("The first argument of this method call should be the clicked cell", () => {
            const spy = jest.spyOn(mockDOM, "attackCell");
            mockCell.click();
            expect(spy).toHaveBeenCalledWith(mockCell, [0, 0], 1);
        });
    });
    describe("If the state of the attacked board changes... ", () => {
        test("The state of the DOM element representing that cell should update accordingly", () => {
            mockDOM.displayGame();
            mockDOM.attackCell(mockCell, [1, 1], 1);
            const classArray = [...mockCell.classList];
            expect(
                classArray.includes("empty") || classArray.includes("hit")
            ).toBeTruthy();
        });
    });
});

describe("Clicking the 'Start Game' button... ", () => {
    test("Should call the startGame method", () => {
        const funcObj = {
            startGame: () => {},
        };
        const spy = jest.spyOn(funcObj, "startGame");
        const mockCell = document.createElement("button");
        mockCell.addEventListener("click", funcObj.startGame());
        mockCell.click();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe("Clicking the 'Reset Game' button... ", () => {
    test("Should call the resetGame method", () => {
        const funcObj = {
            resetGame: () => {},
        };
        const spy = jest.spyOn(funcObj, "resetGame");
        const mockCell = document.createElement("button");
        mockCell.addEventListener("click", funcObj.resetGame());
        mockCell.click();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
