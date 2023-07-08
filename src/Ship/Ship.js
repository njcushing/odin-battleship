const Ship = (len) => {
    let length = len;
    let hits = 0;

    const hit = () => {
        hits++;
        isSunk();
    };

    const isSunk = () => {
        if (hits >= length) {
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
