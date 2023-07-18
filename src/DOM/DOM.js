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
        cell.classList.remove("ship", "hit", "empty");
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
        if (!(parent instanceof HTMLElement)) return null;
        parent.replaceChildren();

        const board = gameboardModule.observeBoard();
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const newCell = createCell(parent);
                if (newCell) {
                    setCellValueClassName(newCell, board[i][j]);
                    newCell.addEventListener("click", () => {
                        attackCell(newCell, [i, j], gameboardModule);
                    });
                }
            }
        }
    };

    const attackCell = (element, position, gameboardModule) => {
        if (!(element instanceof HTMLElement)) return null;
        if (!checkValidGameboard(gameboardModule)) return null;

        let currentState, board;
        currentState = gameboardModule.getCellStateAt(position);
        if (!currentState) return null;
        board = gameboardModule.observeBoard();

        game.manualAttack(position, gameboardModule);

        board = gameboardModule.observeBoard();
        currentState = board[position[1]][position[0]];
        setCellValueClassName(element, currentState);
    };

    const checkValidGameboard = (gameboardModule) => {
        /* Duck-typed Gameboard module check */
        if (gameboardModule === null) return null;
        if (typeof gameboardModule !== "object") return null;
        if (!Object.hasOwn(gameboardModule, "observeBoard")) return null;
        return true;
    };

    const validateCoordinateInput = (position) => {
        if (
            Array.isArray(position) &&
            position.length === 2 &&
            Number.isInteger(position[0]) &&
            position[0] >= 0 &&
            position[0] < board.length &&
            Number.isInteger(position[1]) &&
            position[1] >= 0 &&
            position[1] < board.length
        ) {
            return true;
        }
        return false;
    };

    return {
        displayGame,
        createElement,
        createCell,
        createBoard,
        attackCell,
    };
};
export default DOM;
