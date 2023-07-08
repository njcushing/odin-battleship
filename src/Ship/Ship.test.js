import Ship from "./Ship";

test("Create new ship and check sunk state - test 1", () => {
    const newShip = Ship(3);
    expect(newShip.isSunk()).toBe(false);
});

test("Create new ship and check sunk state - test 2", () => {
    const newShip = Ship(0);
    expect(newShip.isSunk()).toBe(true);
});

test("Create new ship and check sunk state - test 3", () => {
    const newShip = Ship(-7);
    expect(newShip.isSunk()).toBe(true);
});

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
