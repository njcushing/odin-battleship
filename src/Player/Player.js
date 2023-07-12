const Player = () => {
    let style = "Manual";

    const setStyle = (s) => {
        if (s !== "Manual" && s !== "Computer") return;
        style = s;
    };

    const getStyle = () => {
        return style;
    };

    return {
        setStyle,
        getStyle,
    };
};
export default Player;
