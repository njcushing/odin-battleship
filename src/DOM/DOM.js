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
        ele.base = createElement("div", ["btls-base"], document.body);
        ele.boardArea = createElement("div", ["btls-board-area"], ele.base);
        ele.board1 = createElement("div", ["btls-board-one"], ele.boardArea);
        ele.board2 = createElement("div", ["btls-board-two"], ele.boardArea);
        createBoard(game.getGameboards()[0], ele.board1);
        createBoard(game.getGameboards()[1], ele.board2);
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

    const createCell = (parent) => {
        if (!(parent instanceof Element)) return null;
        return createElement("div", ["btls-cell"], parent);
    };

    const setCellValueClassName = (cell, value) => {
        switch (value) {
            case 1:
                cell.classList.add("ship");
            case 2:
                cell.classList.add("hit");
            case 0:
            default:
                cell.classList.add("empty");
        }
    };

    const clearDisplay = () => {
        if (ele.base) ele.base.removeElement();
    };

    const createBoard = (gameboardModule, parent) => {
        if (!checkValidGameboard(gameboardModule)) return null;
        if (!(parent instanceof Element)) return null;
        parent.replaceChildren();

        const board = gameboardModule.observeBoard();
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const newCell = createCell(parent);
                if (newCell) {
                    setCellValueClassName(newCell, board[i][j]);
                    newCell.addEventListener("click", () => {
                        updateCell(newCell, [i, j], gameboardModule);
                    });
                }
            }
        }
    };

    const updateCell = (element, position, gameboardModule) => {
        let board, currentState;
        board = gameboardModule.observeBoard();
        currentState = board[position[1]][position[0]];
        if (!currentState) return null;
        game.manualAttack(position, gameboardModule);
        board = gameboardModule.observeBoard();
        currentState = board[position[1]][position[0]];
        element.setAttribute();
    };

    const checkValidGameboard = (gameboardModule) => {
        /* Duck-typed Gameboard module check */
        if (gameboardModule === null) return null;
        if (typeof gameboardModule !== "object") return null;
        if (!Object.hasOwn(gameboardModule, "observeBoard")) return null;
        return true;
    };

    return {
        displayGame,
        createElement,
        createCell,
        createBoard,
        updateCell,
    };
};
export default DOM;
