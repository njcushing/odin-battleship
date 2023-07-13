import Game from "./../Game/Game";

test("Ensure Game can create two Player objects from module and assign their default play styles correctly", () => {
    const game = Game();
    expect(game.getPlayers()[0].getStyle()).toBe("Manual");
    expect(game.getPlayers()[1].getStyle()).toBe("Computer");
});
