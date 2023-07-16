/**
 * @jest-environment jsdom
 */

import DOM from "./../DOM/DOM";

const UI = DOM();

describe("Calling the createCell method... ", () => {
    describe("If the first argument (gameboard cell value)...  ", () => {
        test("Is not a valid value, it should still create the cell", () => {
            const mockParent = document.createElement("div");
            const testChild = UI.createCell("test", [], mockParent);
            expect(mockParent.children.length).toBe(1);
        });
        test("Is default or 0, the cell should contain the 'empty' class", () => {
            const mockParent = document.createElement("div");
            const testChild = UI.createCell(0, [], mockParent);
            expect(mockParent.children[0].classList).toContain("empty");
        });
        test("Is 1, the cell should contain the 'ship' class", () => {
            const mockParent = document.createElement("div");
            const testChild = UI.createCell(1, [], mockParent);
            expect(mockParent.children[0].classList).toContain("ship");
        });
        test("Is 2, the cell should contain the 'hit' class", () => {
            const mockParent = document.createElement("div");
            const testChild = UI.createCell(2, [], mockParent);
            expect(mockParent.children[0].classList).toContain("hit");
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
