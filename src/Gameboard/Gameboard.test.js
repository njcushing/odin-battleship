import Gameboard from "./Gameboard";

test.only("Ensure board is being returned correctly", () => {
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
