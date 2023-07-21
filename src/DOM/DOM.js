import Game from "./../Game/Game";

const DOM = () => {
    const game = Game();
    let b1PlaceShipSize = 3;
    let b1PlaceShipRotation = false;
    let b1PlaceShipPosition = [0, 0];
    let b2PlaceShipSize = 3;
    let b2PlaceShipRotation = false;
    let b2PlaceShipPosition = [0, 0];

    const ele = {
        base: null,
        historyBox: null,
        title: null,
        boardArea: null,
        board1: null,
        b1XAxis: null,
        b1YAxis: null,
        b1ID: null,
        b1Buttons: null,
        b1ChangeStyleButton: null,
        b1HideBoardButton: null,
        b1PlaceShipBox: null,
        b1PlaceShipModel: null,
        b1PlaceShipSizeInput: null,
        b1PlaceShipRotationButton: null,
        b1PlaceShipXCoordInput: null,
        b1PlaceShipYCoordInput: null,
        b1PlaceShipPlaceButton: null,
        infoBox: null,
        board2: null,
        b2XAxis: null,
        b2YAxis: null,
        b2ID: null,
        b2Buttons: null,
        b2ChangeStyleButton: null,
        b2HideBoardButton: null,
        b2PlaceShipBox: null,
        b2PlaceShipModel: null,
        b2PlaceShipSizeInput: null,
        b2PlaceShipRotationButton: null,
        b2PlaceShipXCoordInput: null,
        b2PlaceShipYCoordInput: null,
        b2PlaceShipPlaceButton: null,
        buttons: null,
        startButton: null,
        resetButton: null,
    };

    const displayGame = () => {
        clearDisplay();
        ele.base = createElement("div", ["btls-base"], document.body);
        ele.historyBox = createElement("div", ["btls-history-box"], ele.base);
        ele.title = createElement("div", ["btls-title"], ele.base);
        ele.boardArea = createElement("div", ["btls-board-area"], ele.base);
        ele.board2 = createElement("div", ["btls-board-two"], ele.boardArea);
        ele.b2XAxis = createElement("div", ["btls-axis-2-x"], ele.boardArea);
        ele.b2YAxis = createElement("div", ["btls-axis-2-y"], ele.boardArea);
        ele.b2Buttons = createElement("div", ["btls-b2-btns"], ele.boardArea);
        ele.b2ID = createElement("div", ["btls-b2-id"], ele.boardArea);
        ele.infoBox = createElement("div", ["btls-info-box"], ele.boardArea);
        ele.b1ID = createElement("div", ["btls-b1-id"], ele.boardArea);
        ele.board1 = createElement("div", ["btls-board-one"], ele.boardArea);
        ele.b1XAxis = createElement("div", ["btls-axis-1-x"], ele.boardArea);
        ele.b1YAxis = createElement("div", ["btls-axis-1-y"], ele.boardArea);
        ele.b1Buttons = createElement("div", ["btls-b1-btns"], ele.boardArea);
        createBoard(game.getGameboards()[0], 0, ele.board1);
        createBoard(game.getGameboards()[1], 1, ele.board2);
        createAxis(ele.b1XAxis, 0, 0, ele.boardArea);
        createAxis(ele.b1YAxis, 0, 1, ele.boardArea);
        createAxis(ele.b2XAxis, 1, 0, ele.boardArea);
        createAxis(ele.b2YAxis, 1, 1, ele.boardArea);

        ele.title.textContent = "BATTLESHIP";

        const players = game.getPlayers();
        ele.b2ID.textContent = `Player Two: ${players[1].getStyle()}`;
        ele.b1ID.textContent = `Player One: ${players[0].getStyle()}`;

        ele.infoBox.textContent = "Welcome to Battleship!";

        createPlayerButtons(
            ele.b2ChangeStyleButton,
            ele.b2HideBoardButton,
            1,
            ele.b2Buttons
        );
        createPlayerButtons(
            ele.b1ChangeStyleButton,
            ele.b1HideBoardButton,
            1,
            ele.b1Buttons
        );

        ele.buttons = createElement("div", ["btls-buttons"], ele.base);
        ele.startButton = createElement("button", ["btls-start"], ele.buttons);
        ele.startButton.addEventListener("click", startGame);
        ele.resetButton = createElement("button", ["btls-reset"], ele.buttons);
        ele.resetButton.addEventListener("click", resetGame);
        ele.startButton.textContent = "Start Game";
        ele.resetButton.textContent = "Reset Game";

        createPlaceShipBox(0, ele.boardArea);
        createPlaceShipBox(1, ele.boardArea);
    };

    const startGame = () => {
        const boards = game.getGameboards();
        if (
            boards[0].totalNumberOfShips() < 1 ||
            boards[1].totalNumberOfShips() < 1
        ) {
            ele.infoBox.textContent =
                "Please ensure all Manual players have at least one ship before starting the game";
            return null;
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

    const createPlayerButtons = (styleButton, hideButton, boardNo, parent) => {
        const no = boardNo;
        styleButton = createElement(
            "button",
            [`btls-b${boardNo}-change-style-button`],
            parent
        );
        styleButton.textContent = "Change Style";
        hideButton = createElement(
            "button",
            [`btls-b${boardNo}-hide-board-button`],
            parent
        );
        hideButton.textContent = "Hide Board";
    };

    const createPlaceShipBox = (boardNo, parent) => {
        const no = boardNo + 1;
        let box = createElement("div", [`btls-b${no}-place-ship-box`], parent);
        boardNo === 0 ? (ele.b1PlaceShipBox = box) : (ele.b2PlaceShipBox = box);
        let model = createElement("div", [`btls-b${no}-place-ship-model`], box);
        model.style["display"] = "grid";
        boardNo === 0
            ? (ele.b1PlaceShipModel = model)
            : (ele.b2PlaceShipModel = model);
        createPlaceShipBoxSizeLabelInput(boardNo, box);
        createPlaceShipBoxCoordLabelInput(boardNo, 0, box);
        createPlaceShipBoxCoordLabelInput(boardNo, 1, box);
        createPlaceShipBoxRotationButton(boardNo, box);
        createPlaceShipBoxPlaceButton(boardNo, box);
        updatePlaceShipModel(
            boardNo === 0 ? ele.b1PlaceShipModel : ele.b2PlaceShipModel,
            boardNo === 0 ? b1PlaceShipSize : b2PlaceShipSize,
            boardNo === 0 ? b1PlaceShipRotation : b2PlaceShipRotation
        );
    };

    const createPlaceShipBoxSizeLabelInput = (boardNo, box) => {
        let label, element, no;
        no = boardNo + 1;
        label = createElement(
            "label",
            [`btls-b${no}-place-ship-size-label`],
            box
        );
        label.textContent = "Size";
        label.setAttribute("for", `btls-b${no}-place-ship-size`);
        element = createElement("input", [`btls-b${no}-place-ship-size`], box);
        element.setAttribute("id", `btls-b${no}-place-ship-size`);
        element.setAttribute("type", "number");
        element.value = boardNo === 0 ? b1PlaceShipSize : b2PlaceShipSize;
        element.addEventListener("input", () => {
            element.value = Math.min(10, Math.max(1, element.value));
            if (boardNo === 0) b1PlaceShipSize = element.value;
            else b2PlaceShipSize = element.value;
            updatePlaceShipModel(
                boardNo === 0 ? ele.b1PlaceShipModel : ele.b2PlaceShipModel,
                boardNo === 0 ? b1PlaceShipSize : b2PlaceShipSize,
                boardNo === 0 ? b1PlaceShipRotation : b2PlaceShipRotation
            );
        });
        boardNo === 0
            ? (ele.b1PlaceShipSizeInput = element)
            : (ele.b1PlaceShipSizeInput = element);
    };

    const createPlaceShipBoxCoordLabelInput = (boardNo, axis, box) => {
        let label, element, no, char;
        no = boardNo + 1;
        char = axis === 0 ? "x" : "y";
        label = createElement(
            "label",
            [`btls-b${no}-place-ship-${char}-coord-label`],
            box
        );
        label.textContent = `${char.toUpperCase()}-Coord: `;
        label.setAttribute("for", `btls-b${no}-place-ship-${char}-coord`);
        element = createElement(
            "input",
            [`btls-b${no}-place-ship-${char}-coord`],
            box
        );
        element.setAttribute("id", `btls-b${no}-place-ship-${char}-coord`);
        element.setAttribute("type", "number");
        if (axis === 0)
            element.value =
                boardNo === 0 ? b1PlaceShipPosition[0] : b2PlaceShipPosition[0];
        else
            element.value =
                boardNo === 0 ? b1PlaceShipPosition[1] : b2PlaceShipPosition[1];
        element.addEventListener("input", () => {
            element.value = Math.min(10, Math.max(1, element.value));
            if (axis === 0) {
                if (boardNo === 0) b1PlaceShipPosition[0] = element.value;
                else b2PlaceShipPosition[0] = element.value;
            } else {
                if (boardNo === 0) b1PlaceShipPosition[1] = element.value;
                else b2PlaceShipPosition[1] = element.value;
            }
        });
        if (axis === 0) {
            if (boardNo === 0) ele.b1PlaceShipXCoordInput = element;
            else ele.b2PlaceShipXCoordInput = element;
        } else {
            if (boardNo === 0) ele.b1PlaceShipYCoordInput = element;
            else ele.b2PlaceShipYCoordInput = element;
        }
    };

    const createPlaceShipBoxRotationButton = (boardNo, box) => {
        let element, no;
        no = boardNo + 1;
        element = createElement(
            "button",
            [`btls-b${no}-place-ship-rotation`],
            box
        );
        element.textContent = "Rotate Ship";
        element.addEventListener("click", () => {
            if (boardNo === 0) b1PlaceShipRotation = !b1PlaceShipRotation;
            else b2PlaceShipRotation = !b2PlaceShipRotation;
            updatePlaceShipModel(
                boardNo === 0 ? ele.b1PlaceShipModel : ele.b2PlaceShipModel,
                boardNo === 0 ? b1PlaceShipSize : b2PlaceShipSize,
                boardNo === 0 ? b1PlaceShipRotation : b2PlaceShipRotation
            );
        });
        boardNo === 0
            ? (ele.b1PlaceShipRotationButton = element)
            : (ele.b2PlaceShipRotationButton = element);
    };

    const createPlaceShipBoxPlaceButton = (boardNo, box) => {
        let element, no;
        no = boardNo + 1;
        element = createElement("button", [`btls-b${no}-place-ship`], box);
        element.textContent = "Place Ship";
        element.addEventListener("click", () => {
            if (boardNo === 0) b1PlaceShipRotation = !b1PlaceShipRotation;
            else b2PlaceShipRotation = !b2PlaceShipRotation;
        });
        boardNo === 0
            ? (ele.b1PlaceShipPlaceButton = element)
            : (ele.b2PlaceShipPlaceButton = element);
    };

    const updatePlaceShipModel = (model, size, rotation) => {
        model.replaceChildren();
        for (let i = 0; i < size; i++) {
            createElement("div", ["btls-model-cell"], model);
        }
        if (rotation) {
            model.style["grid-template-rows"] = `repeat(${size}, auto)`;
            model.style["grid-template-columns"] = "auto";
            model.style["width"] = `10%`;
            model.style["height"] = `${10 * size}%`;
        } else {
            model.style["grid-template-rows"] = "auto";
            model.style["grid-template-columns"] = `repeat(${size}, auto)`;
            model.style["width"] = `${10 * size}%`;
            model.style["height"] = `10%`;
        }
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
