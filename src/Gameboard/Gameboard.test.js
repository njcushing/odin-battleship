import Gameboard from "./Gameboard";

test("Ensure board is being created & returned correctly", () => {
    const board1 = Gameboard(3);
    expect(board1.observeBoard()).toStrictEqual([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);
    const board2 = Gameboard(4);
    expect(board2.observeBoard()).toStrictEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);
    const board3 = Gameboard(3);
    expect(board3.observeBoard()).not.toStrictEqual([
        [0, 0],
        [0, 0],
    ]);
});

test("Ensure board is not manipulated by invalid placeShip arguments", () => {
    const board = Gameboard(8);
    const boardSame = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    board.placeShip(-1, [3, 3], false);
    board.placeShip(0, [3, 3], false);
    board.placeShip(9, [3, 3], false);
    board.placeShip(1.5, [3, 3], false);
    board.placeShip("test", [3, 3], false);
    expect(board.observeBoard()).toStrictEqual(boardSame);
    board.placeShip(4, ["test", 3], false);
    board.placeShip(4, [3, "test"], false);
    board.placeShip(4, [-1, 3], false);
    board.placeShip(4, [3, -1], false);
    board.placeShip(4, [7, 3], false);
    board.placeShip(4, [3, 9], false);
    board.placeShip(4, [10, 3], false);
    board.placeShip(4, [3, 10], false);
    board.placeShip(4, [2, 0.4], false);
    board.placeShip(4, [0.4, 2], false);
    board.placeShip(4, "test", false);
    expect(board.observeBoard()).toStrictEqual(boardSame);
    board.placeShip(4, [3, 3], 2);
    board.placeShip(4, [3, 3], 0.5);
    board.placeShip(4, [3, 3], "test");
    expect(board.observeBoard()).toStrictEqual(boardSame);
});

test("Ensure board is being manipulated correctly by valid placeShip arguments", () => {
    const board = Gameboard(8);
    board.placeShip(5, [3, 3], false);
    const x = {};
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.placeShip(4, [1, 6], false);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.placeShip(4, [7, 2], true);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.placeShip(3, [5, 7], false);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.placeShip(2, [7, 7], false);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.placeShip(4, [0, 1], false);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.placeShip(3, [0, 0], true);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.placeShip(4, [2, 3], false);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
});

test("Ensure board is not manipulated by invalid moveShip arguments", () => {
    const board = Gameboard(8);
    board.placeShip(5, [3, 3], false);
    const boardSame = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    board.moveShip(["test", 3], [3, 3], true);
    board.moveShip([3, "test"], [3, 3], true);
    board.moveShip([-1, 3], [3, 3], true);
    board.moveShip([3, -1], [3, 3], true);
    board.moveShip([7, 3], [3, 3], true);
    board.moveShip([3, 9], [3, 3], true);
    board.moveShip([10, 3], [3, 3], true);
    board.moveShip([3, 10], [3, 3], true);
    board.moveShip([2, 0.4], [3, 3], true);
    board.moveShip([0.4, 2], [3, 3], true);
    board.moveShip("test", [3, 3], true);
    expect(board.observeBoard()).toStrictEqual(boardSame);
    board.moveShip([3, 3], ["test", 3], true);
    board.moveShip([3, 3], [3, "test"], true);
    board.moveShip([3, 3], [-1, 3], true);
    board.moveShip([3, 3], [3, -1], true);
    board.moveShip([3, 3], [7, 3], false);
    board.moveShip([3, 3], [3, 9], true);
    board.moveShip([3, 3], [10, 3], true);
    board.moveShip([3, 3], [3, 10], true);
    board.moveShip([3, 3], [2, 0.4], true);
    board.moveShip([3, 3], [0.4, 2], true);
    board.moveShip([3, 3], "test", true);
    expect(board.observeBoard()).toStrictEqual(boardSame);
    board.moveShip([3, 3], [3, 3], 2);
    board.moveShip([3, 3], [3, 3], 0.5);
    board.moveShip([3, 3], [3, 3], "test");
    expect(board.observeBoard()).toStrictEqual(boardSame);
});

test("Ensure board is being manipulated correctly by valid moveShip arguments", () => {
    const board = Gameboard(8);
    board.placeShip(5, [3, 3], false);
    board.moveShip([3, 3], [3, 2], false);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.moveShip([5, 2], [4, 4], true);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.moveShip([4, 0], [0, 6], true);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.placeShip(5, [3, 3], false);
    board.moveShip([2, 6], [3, 3], false);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.moveShip([3, 3], [6, 3], false);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.moveShip([3, 3], [6, 3], true);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.moveShip([6, 3], [6, 6], false);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
});

test("Ensure board is not manipulated by invalid deleteShip arguments", () => {
    const board = Gameboard(8);
    board.placeShip(5, [3, 3], false);
    const boardSame = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    board.deleteShip(["test", 3]);
    board.deleteShip([3, "test"]);
    board.deleteShip([-1, 3]);
    board.deleteShip([3, -1]);
    board.deleteShip([10, 3]);
    board.deleteShip([3, 10]);
    board.deleteShip([2, 0.4]);
    board.deleteShip([0.4, 2]);
    board.deleteShip("test");
    expect(board.observeBoard()).toStrictEqual(boardSame);
});

test("Ensure board is being manipulated correctly by valid deleteShip arguments", () => {
    const board = Gameboard(8);
    board.placeShip(5, [3, 3], false);
    board.placeShip(3, [2, 6], false);
    board.placeShip(4, [7, 2], true);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.deleteShip([5, 2], true);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.deleteShip([1, 3], true);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.deleteShip([7, 4], true);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.deleteShip([2, 6], true);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
});

test("Ensure board is not manipulated by invalid receiveAttack arguments", () => {
    const board = Gameboard(8);
    board.placeShip(5, [3, 3], false);
    board.startGame();
    const boardSame = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    board.receiveAttack(["test", 3]);
    board.receiveAttack([3, "test"]);
    board.receiveAttack([-1, 3]);
    board.receiveAttack([3, -1]);
    board.receiveAttack([10, 3]);
    board.receiveAttack([3, 10]);
    board.receiveAttack([2, 0.4]);
    board.receiveAttack([0.4, 2]);
    board.receiveAttack("test");
    expect(board.observeBoard()).toStrictEqual(boardSame);
});

test("Ensure board is being manipulated correctly by valid receiveAttack arguments", () => {
    const board = Gameboard(8);
    board.placeShip(5, [3, 3], false);
    board.startGame();
    board.receiveAttack([5, 2]);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.receiveAttack([1, 0]);
    expect(board.observeBoard()).toStrictEqual([
        [0, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.receiveAttack([4, 6]);
    expect(board.observeBoard()).toStrictEqual([
        [0, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
});

test("Check for correct return value from checkDefeat method", () => {
    const board = Gameboard(8);
    board.placeShip(2, [3, 3], false);
    board.startGame();
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    board.receiveAttack([5, 2]);
    expect(board.checkDefeat()).toBe(false);
    board.receiveAttack([3, 3]);
    expect(board.checkDefeat()).toBe(false);
    board.receiveAttack([4, 3]);
    expect(board.checkDefeat()).toBe(true);
});

test("Check that the startGame method is restricting correct methods in each state", () => {
    const board = Gameboard(4);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);
    board.placeShip(2, [2, 2], false);
    board.receiveAttack([1, 3]);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 0],
    ]);
    board.startGame();
    board.placeShip(2, [2, 0], false);
    board.receiveAttack([1, 3]);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 2, 0, 0],
    ]);
});

test("Check that the resetBoard method is resetting board and gameStarted bool correctly", () => {
    const board = Gameboard(4);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);
    board.placeShip(2, [2, 2], false);
    board.placeShip(2, [1, 0], false);
    expect(board.observeBoard()).toStrictEqual([
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 0],
    ]);
    board.startGame();
    board.placeShip(2, [0, 2], true);
    expect(board.observeBoard()).toStrictEqual([
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 0],
    ]);
    board.resetBoard();
    board.placeShip(2, [1, 1], false);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);
});

test("Check that previousHits method returns array that has correctly tracked previous hits", () => {
    const board = Gameboard(4);
    board.placeShip(2, [1, 1], false);
    board.placeShip(2, [1, 3], false);
    expect(board.observeBoard()).toStrictEqual([
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 1, 1, 0],
    ]);
    board.receiveAttack([2, 1]);
    expect(board.previousHits()).toStrictEqual([]);
    board.startGame();
    board.receiveAttack([0, 0]);
    board.receiveAttack([2, 1]);
    board.receiveAttack([1, 2]);
    board.receiveAttack([2, 2]);
    board.receiveAttack([2, 3]);
    expect(board.previousHits()).toStrictEqual([
        [2, 1],
        [2, 3],
    ]);
    board.resetBoard();
    expect(board.previousHits()).toStrictEqual([]);
});
