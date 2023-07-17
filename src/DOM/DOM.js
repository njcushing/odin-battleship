import Game from "./../Game/Game";

const DOM = () => {
    const game = Game();

    const ele = {
        base: null,
        boardArea: null,
        board1: null,
        board2: null,
    };

    const displayGame = () => {
        clearDisplay();
        ele.base = createElement("div", ["base"], document.body);
        ele.boardArea = createElement("div", ["board-area"], ele.base);
        ele.board1 = createElement("div", ["board-one"], ele.boardArea);
        ele.board2 = createElement("div", ["board-two"], ele.boardArea);
        createBoard(game.getGameboards()[0], boardCells.board1, ele.board1);
        createBoard(game.getGameboards()[1], boardCells.board2, ele.board2);
    };

    const createElement = (type = "div", classes = [], parent = null) => {
        const newElement = document.createElement(type);
        if (newElement instanceof HTMLUnknownElement) return null;
        if (Array.isArray(classes)) {
            classes.forEach((className) => {
                if (typeof className === "string") {
                    newElement.classList.add(className);
                }
            });
        }
        if (parent instanceof HTMLElement) parent.appendChild(newElement);
        return newElement;
    };

    const createCell = (value, parent) => {
        if (!(parent instanceof Element)) return null;
        switch (value) {
            case 1:
                createElement("div", ["cell", "ship"], parent);
                break;
            case 2:
                createElement("div", ["cell", "hit"], parent);
                break;
            case 0:
            default:
                createElement("div", ["cell", "empty"], parent);
                break;
        }
    };

    const clearDisplay = () => {
        if (ele.base) ele.base.removeElement();
    };

    const createBoard = (gameboardModule, parent) => {
        /* Duck-typed Gameboard module check */
        if (gameboardModule === null) return null;
        if (typeof gameboardModule !== "object") return null;
        if (!Object.hasOwn(gameboardModule, "observeBoard")) return null;

        if (!(parent instanceof Element)) return null;
        parent.replaceChildren();

        const board = gameboardModule.observeBoard();
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                createCell(board[i][j], parent);
            }
        }
    };

    return {
        displayGame,
        createElement,
        createCell,
        createBoard,
    };
};
export default DOM;
