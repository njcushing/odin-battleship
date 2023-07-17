/**
 * @jest-environment jsdom
 */

import DOM from "./../DOM/DOM";
import Gameboard from "./../Gameboard/Gameboard";

const UI = DOM();

describe("Calling the createElement method... ", () => {
    describe("If the first argument (HTML element type)...  ", () => {
        test("Is NOT a valid HTML element type, the method should return null", () => {
            expect(UI.createElement("aaa", ["test"], null)).toBeNull();
        });
        test("Is a valid HTML element type, the element should be created as normal", () => {
            const mockElement = UI.createElement("div", ["test"], null);
            expect(mockElement instanceof HTMLElement).toBe(true);
        });
    });
    describe("If the second argument (class name array)...  ", () => {
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
    describe("If the third argument (HTML element type)...  ", () => {
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
    describe("If the first argument (gameboard cell value)...  ", () => {
        test("Is NOT a valid value, it should still create the cell", () => {
            UI.createCell("test", [], mockParent);
            expect(mockParent.lastChild).not.toBeNull();
        });
        test("Is default or 0, the cell should contain the 'empty' class", () => {
            UI.createCell(0, [], mockParent);
            expect(mockParent.lastChild.classList).toContain("empty");
        });
        test("Is 1, the cell should contain the 'ship' class", () => {
            UI.createCell(1, [], mockParent);
            expect(mockParent.lastChild.classList).toContain("ship");
        });
        test("Is 2, the cell should contain the 'hit' class", () => {
            UI.createCell(2, [], mockParent);
            expect(mockParent.lastChild.classList).toContain("hit");
        });
    });
    describe("If the second argument (element array)...  ", () => {
        test("Is NOT a valid array, the method should return null", () => {
            expect(UI.createCell(0, "test", mockParent)).toBeNull();
        });
        test("Is a valid array, the array should be appended with the new cell element", () => {
            let arr = [];
            UI.createCell(0, arr, mockParent);
            expect(arr[arr.length - 1].classList).toContain("empty");
        });
    });
    describe("If the third argument (parent node)...  ", () => {
        test("Is NOT a valid DOM element, the method should return null", () => {
            expect(UI.createCell(0, [], "test")).toBeNull();
        });
        test("Is a valid DOM element, the cell should be created as normal", () => {
            let arr = [];
            UI.createCell(0, arr, mockParent);
            expect(arr[arr.length - 1].classList).toContain("empty");
        });
    });
});

describe("Calling the createBoard method... ", () => {
    describe("If the first argument (Gameboard module)...  ", () => {
        test("Is not a valid object, the method should return null", () => {
            const mockParent = document.createElement("div");
            expect(UI.createBoard(null, [], mockParent)).toBeNull();
        });
        test("Is not a valid Gameboard module, the method should return null", () => {
            const mockParent = document.createElement("div");
            expect(UI.createBoard({}, [], mockParent)).toBeNull();
        });
    });
});

/*
describe("Calling the displayGame method... ", () => {
    const UI = DOM();
    const createElement = jest.spyOn(document, "createElement");
    const appendChild = jest.spyOn(document, "appendChild");
    UI.displayGame();
    describe("Whenever document.createElement is called... ", () => {});
    describe("Whenever document.appendChild is called... ", () => {
        test("Expect the argument to always be of type HTMLElement", () => {
            expect(appendChild).toHaveBeenCalledWith(HTMLElement);
        });
    });
});
*/
