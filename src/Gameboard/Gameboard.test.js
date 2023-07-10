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
