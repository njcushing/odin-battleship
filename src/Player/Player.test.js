import Player from "./Player";

test("Check setStyle method is changing the style of the Player correctly & only when argument is valid", () => {
    const player = Player();
    player.setStyle("Manual");
    player.setStyle(0.1);
    player.setStyle(8);
    player.setStyle([]);
    player.setStyle({});
    player.setStyle("test");
    expect(player.getStyle()).toBe("Manual");
    player.setStyle("Computer");
    expect(player.getStyle()).toBe("Computer");
});
