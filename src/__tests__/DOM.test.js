/**
 * @jest-environment jsdom
 */

import DOM from "./../DOM/DOM";

const UI = DOM();

describe("Calling the createElement method... ", () => {});

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
