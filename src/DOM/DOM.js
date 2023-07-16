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

    return {
        displayGame,
        createElement,
        createCell,
    };
};
export default DOM;
