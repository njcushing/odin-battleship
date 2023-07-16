import Game from "./../Game/Game";

const DOM = () => {
    const game = Game();

    const ele = {
        base: null,
        boardArea: null,
        board1: null,
        board2: null,
    };
    const boardCells = {
        board1: [],
        board2: [],
    };

    const displayGame = () => {
        clearDisplay();
        ele.base = createElement("div", ["base"], document.body);
        createBoards();
    };

    const createElement = (type = "div", classes = [], parent = null) => {
        const newElement = document.createElement(type);
        classes.forEach((className) => newElement.classList.add(className));
        if (parent) parent.appendChild(newElement);
        return newElement;
    };

    const createCell = (value, arr, parent) => {
        if (!Array.isArray(arr)) return null;
        switch (value) {
            case 1:
                arr.push(createElement("div", ["cell", "ship"], parent));
                break;
            case 2:
                arr.push(createElement("div", ["cell", "hit"], parent));
                break;
            case 0:
            default:
                arr.push(createElement("div", ["cell", "empty"], parent));
                break;
        }
    };

    const clearDisplay = () => {
        if (ele.base) ele.base.removeElement();
    };

    const createBoards = () => {
        const boards = game.getGameboards();
        const board1 = boards[0].observeBoard();
        const board2 = boards[1].observeBoard();

        let b1 = boardCells.board1;
        let b2 = boardCells.board1;

        if (ele.boardArea) ele.boardArea.removeElement();
        ele.boardArea = createElement("div", ["board-area"], ele.base);
        ele.board1 = createElement("div", ["board-one"], ele.boardArea);
        ele.board2 = createElement("div", ["board-two"], ele.boardArea);

        b1 = [];
        for (let i = 0; i < board1.length; i++) {
            b1.push([]);
            for (let j = 0; j < board1[i].length; j++) {
                createCell(board1[i][j], b1, ele.board1);
            }
        }

        b2 = [];
        for (let i = 0; i < board2.length; i++) {
            b2.push([]);
            for (let j = 0; j < board2[i].length; j++) {
                createCell(board1[i][j], b2, ele.board2);
            }
        }
    };

    return {
        displayGame,
        createElement,
        createCell,
    };
};
export default DOM;
