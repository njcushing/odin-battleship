import Ship from "./ship";

test("Increment hits until ship sinks", () => {
    const newShip = Ship(3);
    expect(newShip.isSunk()).toBe(false);
    newShip.hit();
    expect(newShip.isSunk()).toBe(false);
    newShip.hit();
    expect(newShip.isSunk()).toBe(false);
    newShip.hit();
    expect(newShip.isSunk()).toBe(true);
});
