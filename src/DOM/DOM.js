import Game from "./../Game/Game";

const DOM = () => {
    const game = Game();

    const ele = {
        base: null,
        title: null,
        boardArea: null,
        board1: null,
        b1XAxis: null,
        b1YAxis: null,
        board1ID: null,
        infoBox: null,
        board2: null,
        b2XAxis: null,
        b2YAxis: null,
        board2ID: null,
        buttons: null,
        startButton: null,
        resetButton: null,
    };

    const displayGame = () => {
        clearDisplay();
        ele.base = createElement("div", ["btls-base"], document.body);
        ele.title = createElement("div", ["btls-title"], ele.base);
        ele.boardArea = createElement("div", ["btls-board-area"], ele.base);
        ele.board2 = createElement("div", ["btls-board-two"], ele.boardArea);
        ele.b2XAxis = createElement("div", ["btls-axis-2-x"], ele.boardArea);
        ele.b2YAxis = createElement("div", ["btls-axis-2-y"], ele.boardArea);
        ele.board2ID = createElement("div", ["btls-b2-id"], ele.boardArea);
        ele.infoBox = createElement("div", ["btls-info-box"], ele.boardArea);
        ele.board1ID = createElement("div", ["btls-b1-id"], ele.boardArea);
        ele.board1 = createElement("div", ["btls-board-one"], ele.boardArea);
        ele.b1XAxis = createElement("div", ["btls-axis-1-x"], ele.boardArea);
        ele.b1YAxis = createElement("div", ["btls-axis-1-y"], ele.boardArea);
        createBoard(game.getGameboards()[0], 0, ele.board1);
        createBoard(game.getGameboards()[1], 1, ele.board2);
        createAxis(ele.b1XAxis, 0, 0, ele.boardArea);
        createAxis(ele.b1YAxis, 0, 1, ele.boardArea);
        createAxis(ele.b2XAxis, 1, 0, ele.boardArea);
        createAxis(ele.b2YAxis, 1, 1, ele.boardArea);

        ele.title.textContent = "BATTLESHIP";

        const players = game.getPlayers();
        ele.board2ID.textContent = `Player Two: ${players[1].getStyle()}`;
        ele.board1ID.textContent = `Player One: ${players[0].getStyle()}`;

        ele.infoBox.textContent = "Welcome to Battleship!";

        ele.buttons = createElement("div", ["btls-buttons"], ele.base);
        ele.startButton = createElement("button", ["btls-start"], ele.buttons);
        ele.startButton.addEventListener("click", startGame);
        ele.resetButton = createElement("button", ["btls-reset"], ele.buttons);
        ele.resetButton.addEventListener("click", resetGame);
        ele.startButton.textContent = "Start Game";
        ele.resetButton.textContent = "Reset Game";
    };

    const startGame = () => {
        const boards = game.getGameboards();
        if (
            boards[0].totalNumberOfShips() < 1 ||
            boards[1].totalNumberOfShips() < 1
        ) {
            ele.infoBox.textContent =
                "Please ensure all Manual players have at least one ship before starting the game";
            return;
        }
        game.startGame();
    };

    const endGame = () => {};

    const resetGame = () => {
        game.resetGame();
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

    const createBoard = (gameboardModule, boardToAttack, parent) => {
        if (!checkValidGameboard(gameboardModule)) return null;
        if (
            !(
                Number.isInteger(boardToAttack) &&
                boardToAttack >= 0 &&
                boardToAttack <= 1
            )
        )
            return null;
        if (!(parent instanceof HTMLElement)) return null;
        parent.replaceChildren();

        const board = gameboardModule.observeBoard();
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const newCell = createCell(parent);
                if (newCell) {
                    setCellValueClassName(newCell, board[i][j]);
                    newCell.addEventListener("click", () => {
                        attackCell(newCell, [j, i], boardToAttack);
                    });
                }
            }
        }
    };

    const createAxis = (element, boardNo, axis, parent) => {
        const board = game.getGameboards()[boardNo];
        const obsBoard = board.observeBoard();
        if (axis === 0) {
            for (let i = 0; i < obsBoard.length; i++) {
                const ele = createElement("div", [`btls-axis-no`], element);
                ele.textContent = i;
            }
        } else {
            if (obsBoard.length > 0) {
                for (let i = 0; i < obsBoard[0].length; i++) {
                    const ele = createElement("div", [`btls-axis-no`], element);
                    ele.textContent = i;
                }
            }
        }
        parent.appendChild(element);
    };

    const attackCell = (element, position, boardToAttack) => {
        if (!(element instanceof HTMLElement)) return null;
        if (
            !(
                Number.isInteger(boardToAttack) &&
                boardToAttack >= 0 &&
                boardToAttack <= 1
            )
        )
            return null;

        let currentState, gameboardModule;
        gameboardModule = game.getGameboards()[boardToAttack];
        currentState = gameboardModule.getCellStateAt(position);
        if (currentState === null) return null;

        game.manualAttack(boardToAttack, position);

        currentState = gameboardModule.getCellStateAt(position);
        setCellValueClassName(element, currentState);
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
        attackCell,
    };
};
export default DOM;
