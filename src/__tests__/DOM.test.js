/**
 * @jest-environment jsdom
 */

import DOM from "./../DOM/DOM";
import Gameboard from "./../Gameboard/Gameboard";

const UI = DOM();

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
            expect(UI.createBoard(null, mockParent)).toBeNull();
        });
        test("Is NOT a valid Gameboard module, the method should return null", () => {
            const mockParent = document.createElement("div");
            expect(UI.createBoard({}, mockParent)).toBeNull();
        });
    });
    describe("If the second argument (parent node)...  ", () => {
        test("Is NOT a valid DOM element, the method should return null", () => {
            expect(UI.createBoard(Gameboard(3), null)).toBeNull();
        });
    });
    describe("If both arguments are valid... ", () => {
        const mockParent = document.createElement("div");
        const mockBoardOne = Gameboard(3);
        const mockBoardTwo = Gameboard(4);
        test("The parent node should be cleared of all children before adding the cell elements (test 1)", () => {
            UI.createBoard(mockBoardOne, mockParent);
            expect(mockParent.children.length).toBe(9);
        });
        test("The parent node should be cleared of all children before adding the cell elements (test 2)", () => {
            UI.createBoard(mockBoardTwo, mockParent);
            expect(mockParent.children.length).toBe(16);
        });
    });
});

describe("Calling the attackCell method... ", () => {
    const mockParent = document.createElement("div");
    const mockCell = UI.createCell(mockParent);
    const mockBoard = Gameboard(3);
    describe("If the first argument (cell node)... ", () => {
        test("Is NOT a valid DOM element, the method should return null", () => {
            expect(UI.attackCell(null, [0, 0], mockBoard)).toBeNull();
        });
    });
    describe("If the second argument (position)... ", () => {
        test("Is NOT a valid position on the board, the method should return null", () => {
            expect(UI.attackCell(mockCell, "test", mockBoard)).toBeNull();
        });
    });
    describe("If the third argument (Gameboard module)... ", () => {
        test("Is NOT a valid object, the method should return null", () => {
            expect(UI.attackCell(mockCell, [0, 0], null)).toBeNull();
        });
        test("Is NOT a valid Gameboard module, the method should return null", () => {
            expect(UI.attackCell(mockCell, [0, 0], {})).toBeNull();
        });
    });
});
