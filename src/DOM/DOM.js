import Game from "./../Game/Game";
import PubSub from "pubsub-js";

const DOM = () => {
    const game = Game();
    let b1PlaceShipSize = 3;
    let b1PlaceShipRotation = false;
    let b1PlaceShipPosition = [0, 0];
    let b1HideShips = false;
    let b2PlaceShipSize = 3;
    let b2PlaceShipRotation = false;
    let b2PlaceShipPosition = [0, 0];
    let b2HideShips = false;
    let holdingShip = null;
    let cursorPosition = [0, 0];

    const createElement = (type, classes, parent) => {
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

    const ele = {
        base: createElement("div", ["btls-base"], document.body),
        title: null,
        boardArea: null,
        board1: null,
        b1XAxis: null,
        b1YAxis: null,
        b1ID: null,
        b1Buttons: null,
        b1ChangeStyleButton: null,
        b1HideShipsButton: null,
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
        b2HideShipsButton: null,
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
        mouseTrackModel: null,
    };

    const displayGame = () => {
        clearDisplay();
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
        createBoard(game.getGameboards()[0], 0, ele.board1, false);
        createBoard(game.getGameboards()[1], 1, ele.board2, false);
        createAxis(ele.b1XAxis, 0, 0, ele.boardArea);
        createAxis(ele.b1YAxis, 0, 1, ele.boardArea);
        createAxis(ele.b2XAxis, 1, 0, ele.boardArea);
        createAxis(ele.b2YAxis, 1, 1, ele.boardArea);

        ele.title.textContent = "BATTLESHIP";

        updatePlayerStyleButtonText(0);
        updatePlayerStyleButtonText(1);

        setInfoBoxTextContent("Welcome to Battleship!");

        createPlayerButtons(1, ele.b2Buttons);
        createPlayerButtons(0, ele.b1Buttons);

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

    const clearDisplay = () => {
        ele.base.remove();
        ele.base = createElement("div", ["btls-base"], document.body);
    };

    const startGame = () => {
        const boards = game.getGameboards();
        const players = game.getPlayers();
        if (
            (boards[0].totalNumberOfShips() < 1 &&
                players[0].getStyle() === "Manual") ||
            (boards[1].totalNumberOfShips() < 1 &&
                players[1].getStyle() === "Manual")
        ) {
            setInfoBoxTextContent(
                "Please ensure all Manual players have at least one ship before starting the game"
            );
        } else {
            game.startGame();
            if (game.isGameStarted()) {
                ele.boardArea.classList.remove("game-ended");
                setInfoBoxTextContent(
                    `Here we go! It's Player ${
                        game.getTurn() + 1
                    } to move first.`
                );
                if (players[0].getStyle() === "Computer") {
                    createBoard(game.getGameboards()[0], 0, ele.board1, true);
                }
                if (players[1].getStyle() === "Computer") {
                    createBoard(game.getGameboards()[1], 1, ele.board2, true);
                }
            }
        }
    };

    const endGame = () => {
        createBoard(game.getGameboards()[0], 0, ele.board1, false);
        createBoard(game.getGameboards()[1], 1, ele.board2, false);
        ele.boardArea.classList.add("game-ended");
    };

    const resetGame = () => {
        game.resetGame();
        createBoard(game.getGameboards()[0], 0, ele.board1, false);
        createBoard(game.getGameboards()[1], 1, ele.board2, false);
        ele.boardArea.classList.remove("game-ended");
        setInfoBoxTextContent(`Welcome to Battleship!`);
    };

    const setInfoBoxTextContent = (text) => {
        ele.infoBox.textContent = text;
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
                break;
            case 2:
                cell.classList.add("attacked");
                break;
            case 3:
                cell.classList.add("hit");
                break;
            case 0:
            default:
                cell.classList.add("empty");
        }
    };

    const createBoard = (gameboardModule, boardToAttack, parent, empty) => {
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
                setCellValueClassName(
                    newCell,
                    empty && board[i][j] === 1 ? 0 : board[i][j]
                );
                newCell.addEventListener("click", () => {
                    attackCell(newCell, [j, i], boardToAttack);
                    deleteShip([j, i], boardToAttack);
                });
                newCell.addEventListener("mouseup", () => {
                    if (holdingShip === boardToAttack) {
                        placeShip(
                            boardToAttack,
                            boardToAttack === 0
                                ? b1PlaceShipSize
                                : b2PlaceShipSize,
                            [j, i],
                            boardToAttack === 0
                                ? b1PlaceShipRotation
                                : b2PlaceShipRotation
                        );
                        holdingShip = null;
                        hideMouseTrackModel();
                    }
                });
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
            for (let i = 0; i < obsBoard[0].length; i++) {
                const ele = createElement("div", [`btls-axis-no`], element);
                ele.textContent = i;
            }
        }
        parent.appendChild(element);
    };

    const createPlayerButtons = (boardNo, parent) => {
        let styleButton, hideButton, no;
        no = boardNo + 1;
        styleButton = createElement(
            "button",
            [`btls-b${no}-change-style-button`],
            parent
        );
        styleButton.textContent = "Change Style";
        styleButton.addEventListener("click", () => {
            changePlayerStyle(boardNo);
        });
        hideButton = createElement(
            "button",
            [`btls-b${no}-hide-ships-button`],
            parent
        );
        hideButton.addEventListener("click", () => {
            toggleBoardHiddenShips(boardNo);
        });
        if (boardNo === 0) {
            ele.b1ChangeStyleButton = styleButton;
            ele.b1HideShipsButton = hideButton;
        } else {
            ele.b2ChangeStyleButton = styleButton;
            ele.b2HideShipsButton = hideButton;
        }
        const players = game.getPlayers();
        if (players[boardNo].getStyle() === "Computer")
            toggleBoardHiddenShips(boardNo);
        updatePlayerHideShipsButtonText(boardNo);
    };

    const createPlaceShipBox = (boardNo, parent) => {
        const no = boardNo + 1;
        let box = createElement("div", [`btls-b${no}-place-ship-box`], parent);
        boardNo === 0 ? (ele.b1PlaceShipBox = box) : (ele.b2PlaceShipBox = box);
        let model = createElement("div", [`btls-b${no}-place-ship-model`], box);
        model.style["display"] = "grid";
        model.addEventListener("mousedown", () => {
            holdingShip = boardNo;
            drawMouseTrackModel(
                boardNo === 0 ? b1PlaceShipSize : b2PlaceShipSize,
                boardNo === 0 ? b1PlaceShipRotation : b2PlaceShipRotation
            );
        });
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
            ["btls-model-cell"],
            boardNo === 0 ? b1PlaceShipSize : b2PlaceShipSize,
            boardNo === 0 ? b1PlaceShipRotation : b2PlaceShipRotation
        );
    };
    window.addEventListener("mouseup", () => {
        holdingShip = null;
        hideMouseTrackModel();
    });

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
            const intValue = parseInt(element.value);
            if (boardNo === 0) b1PlaceShipSize = intValue;
            else b2PlaceShipSize = intValue;
            updatePlaceShipModel(
                boardNo === 0 ? ele.b1PlaceShipModel : ele.b2PlaceShipModel,
                ["btls-model-cell"],
                boardNo === 0 ? b1PlaceShipSize : b2PlaceShipSize,
                boardNo === 0 ? b1PlaceShipRotation : b2PlaceShipRotation
            );
        });
        boardNo === 0
            ? (ele.b1PlaceShipSizeInput = element)
            : (ele.b2PlaceShipSizeInput = element);
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
            element.value = Math.min(9, Math.max(0, element.value));
            const intValue = parseInt(element.value);
            if (axis === 0) {
                if (boardNo === 0) b1PlaceShipPosition[0] = intValue;
                else b2PlaceShipPosition[0] = intValue;
            } else {
                if (boardNo === 0) b1PlaceShipPosition[1] = intValue;
                else b2PlaceShipPosition[1] = intValue;
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
                ["btls-model-cell"],
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
            placeShip(
                boardNo,
                boardNo === 0 ? b1PlaceShipSize : b2PlaceShipSize,
                boardNo === 0 ? b1PlaceShipPosition : b2PlaceShipPosition,
                boardNo === 0 ? b1PlaceShipRotation : b2PlaceShipRotation
            );
        });
        boardNo === 0
            ? (ele.b1PlaceShipPlaceButton = element)
            : (ele.b2PlaceShipPlaceButton = element);
    };

    const updatePlaceShipModel = (model, classes, size, rotation) => {
        model.replaceChildren();
        for (let i = 0; i < size; i++) {
            createElement("div", classes, model);
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

    const drawMouseTrackModel = (size, rotation) => {
        ele.mouseTrackModel = createElement(
            "div",
            ["btls-mouse-track-model"],
            ele.base
        );
        for (let i = 0; i < size; i++) {
            createElement(
                "div",
                ["btls-mouse-track-model-cell"],
                ele.mouseTrackModel
            );
        }
        ele.mouseTrackModel.style["pointer-events"] = "none";
        ele.mouseTrackModel.style["display"] = "grid";
        if (rotation) {
            ele.mouseTrackModel.style[
                "grid-template-rows"
            ] = `repeat(${size}, auto)`;
            ele.mouseTrackModel.style["grid-template-columns"] = "auto";
        } else {
            ele.mouseTrackModel.style["grid-template-rows"] = "auto";
            ele.mouseTrackModel.style[
                "grid-template-columns"
            ] = `repeat(${size}, auto)`;
        }
        ele.mouseTrackModel.style["position"] = "absolute";
        setMouseTrackModelPosition();
    };
    window.addEventListener("mousemove", (e) => {
        cursorPosition = [e.pageX, e.pageY];
        setMouseTrackModelPosition();
    });

    const setMouseTrackModelPosition = () => {
        if (ele.mouseTrackModel instanceof HTMLElement) {
            let rotation, cellCountOffset;

            if (holdingShip === null) return;
            if (holdingShip === 0) rotation = b1PlaceShipRotation;
            if (holdingShip === 1) rotation = b2PlaceShipRotation;

            cellCountOffset =
                (ele.mouseTrackModel.children.length -
                    ((ele.mouseTrackModel.children.length + 1) % 2)) /
                (ele.mouseTrackModel.children.length * 2);

            if (!rotation) {
                ele.mouseTrackModel.style["left"] = `${
                    cursorPosition[0] -
                    ele.mouseTrackModel.offsetWidth * cellCountOffset
                }px`;
                ele.mouseTrackModel.style["top"] = `${
                    cursorPosition[1] - ele.mouseTrackModel.offsetHeight / 2
                }px`;
            } else {
                ele.mouseTrackModel.style["left"] = `${
                    cursorPosition[0] - ele.mouseTrackModel.offsetWidth / 2
                }px`;
                ele.mouseTrackModel.style["top"] = `${
                    cursorPosition[1] -
                    ele.mouseTrackModel.offsetHeight * cellCountOffset
                }px`;
            }
        }
    };

    const hideMouseTrackModel = () => {
        if (ele.mouseTrackModel instanceof HTMLElement) {
            ele.mouseTrackModel.remove();
        }
    };

    const changePlayerStyle = (boardNo) => {
        if (game.isGameStarted() || game.isGameEnded()) return;
        const players = game.getPlayers();
        const currentStyle = players[boardNo].getStyle();
        const newStyle = currentStyle === "Manual" ? "Computer" : "Manual";
        players[boardNo].setStyle(newStyle);
        if (newStyle === "Computer") {
            toggleBoardHiddenShips(boardNo);
            game.getGameboards()[boardNo].resetBoard();
            createBoard(
                game.getGameboards()[boardNo],
                boardNo,
                boardNo === 0 ? ele.board1 : ele.board2,
                true
            );
        }
        updatePlayerStyleButtonText(boardNo);
    };

    const updatePlayerStyleButtonText = (boardNo) => {
        const players = game.getPlayers();
        if (boardNo === 0) {
            ele.b1ID.textContent = `Player One: ${players[boardNo].getStyle()}`;
        } else {
            ele.b2ID.textContent = `Player Two: ${players[boardNo].getStyle()}`;
        }
    };

    const toggleBoardHiddenShips = (boardNo) => {
        const board = boardNo === 0 ? ele.board1 : ele.board2;
        const players = game.getPlayers();
        if (players[boardNo].getStyle() === "Computer") {
            board.classList.add("ships-hidden");
            boardNo === 0 ? (b1HideShips = true) : (b2HideShips = true);
        } else {
            if (board.classList.contains("ships-hidden")) {
                board.classList.remove("ships-hidden");
                boardNo === 0 ? (b1HideShips = false) : (b2HideShips = false);
            } else {
                board.classList.add("ships-hidden");
                boardNo === 0 ? (b1HideShips = true) : (b2HideShips = true);
            }
        }
        updatePlayerHideShipsButtonText(boardNo);
    };

    const updatePlayerHideShipsButtonText = (boardNo) => {
        const hidden = boardNo === 0 ? b1HideShips : b2HideShips;
        const button =
            boardNo === 0 ? ele.b1HideShipsButton : ele.b2HideShipsButton;
        if (hidden) button.textContent = "Show Ships";
        else button.textContent = "Hide Ships";
    };

    const placeShip = (boardNo, size, position, rotation) => {
        if (game.getPlayers()[boardNo].getStyle() === "Computer") return;
        if (game.isGameStarted() || game.isGameEnded()) return;
        const boards = game.getGameboards();
        if (boards[boardNo].placeShip(size, position, rotation) === "max") {
            setInfoBoxTextContent(
                `Player ${boardNo + 1} cannot place any more ships.`
            );
        } else {
            boardNo === 0
                ? createBoard(game.getGameboards()[0], 0, ele.board1, false)
                : createBoard(game.getGameboards()[1], 1, ele.board2, false);
        }
    };

    const deleteShip = (position, boardNo) => {
        if (game.isGameStarted() || game.isGameEnded()) return;
        if (boardNo === 0 && b1HideShips) return null;
        if (boardNo === 1 && b2HideShips) return null;
        const boards = game.getGameboards();
        boards[boardNo].deleteShip(position);
        boardNo === 0
            ? createBoard(game.getGameboards()[0], 0, ele.board1, false)
            : createBoard(game.getGameboards()[1], 1, ele.board2, false);
    };

    const attackCell = (element, position, boardToAttack) => {
        if (game.isGameStarted() && !game.isGameEnded()) {
            const board = game.getGameboards()[boardToAttack];
            const sinks = board.previousSinks().length;
            if (game.manualAttack(boardToAttack, position) !== null) {
                const sunkShip = sinks !== board.previousSinks().length;
                updateAfterAttack(element, position, boardToAttack, sunkShip);
            }
        }
    };

    const computerAttacked = (topic, [...args]) => {
        if (game.isGameStarted() && !game.isGameEnded()) {
            const position = args[0];
            const boardNo = args[1];
            const sunk = args[2];
            const cell =
                boardNo === 0
                    ? ele.board1.children[position[1] * 10 + position[0]]
                    : ele.board2.children[position[1] * 10 + position[0]];
            updateAfterAttack(cell, position, boardNo, sunk);
        }
    };
    PubSub.subscribe("BATTLESHIP-COMPUTER-ATTACKED-POSITION", computerAttacked);

    const updateAfterAttack = (element, position, boardAttacked, sunk) => {
        let currentState, gameboardModule;
        gameboardModule = game.getGameboards()[boardAttacked];

        currentState = gameboardModule.getCellStateAt(position);
        setCellValueClassName(element, currentState);

        const sunkText = "The battleship was sunk!";

        setInfoBoxTextContent(
            `Player ${((game.getTurn() + 1) % 2) + 1} attacks position [${
                position[0]
            }, ${position[1]}]. It is ${
                currentState === 3 ? "" : "not "
            } a successful hit. ${sunk ? sunkText : ""} It's Player ${
                game.getTurn() + 1
            }'s move.`
        );

        if (game.isGameEnded()) {
            endGame();
            setInfoBoxTextContent(
                `The game has been won! Player ${
                    game.getTurn() + 1
                } is the winner!`
            );
        }
    };

    const checkValidGameboard = (gameboardModule) => {
        /* Duck-typed Gameboard module check */
        if (gameboardModule === null) return null;
        if (typeof gameboardModule !== "object") return null;
        if (!Object.hasOwn(gameboardModule, "observeBoard")) return null;
        return true;
    };

    return {
        ele,
        game,
        displayGame,
        createElement,
        createCell,
        createBoard,
    };
};
export default DOM;
