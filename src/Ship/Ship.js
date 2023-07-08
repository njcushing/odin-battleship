const Ship = (len) => {
    let length = len;
    let hits = 0;
    let sunk = false;

    const hit = () => {
        hits++;
        isSunk();
    };

    const isSunk = () => {
        if (hits >= length) {
            sunk = true;
            return true;
        }
        return false;
    };
    isSunk();

    return {
        hit,
        isSunk,
    };
};
export default Ship;
