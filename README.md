# odin-battleship

-- BATTLESHIP --

*Notes*
- While I am quite happy with the actual functionality of the game in terms of how it plays and the AI of computer-controlled boards (not a perfect AI, but still quite a challenge), the styling could use some work. I may come back to this project in the future to update the styling, but since this project was mainly to practise testing with Jest, I think the simplistic styling is enough to guide the user on how to play for now.


-- HOW TO PLAY --

- Each board can be controlled by either a human or computer. By clicking the 'Change Style' button beside each board (only when the game is not in a 'started' or 'ended' state), this play style can be switched between human and computer.


- Human players must have at least one ship on the board before the game can start. There is also a maximum number of ships a player can have (currently 6). Computer-controlled boards will automatically generate a randomised board (currently between 4 and 6 ships) when the game starts. Any attempts to place a ship on a computer-controlled board will not work, and switching from a human-controlled board to a computer-controlled one while ships are on that board will erase those existing ships.


- Ships can be added to the board using the 'Place Ship Box' area to the side of each board. There is an option for size, which has a minimum and maximum of 1 and the width/height of the board, respectively, a 'Rotate Ship' button that rotates the ship to be placed (switching it between vertical and horizontal) and coordinate inputs for both the X and Y-axis positions for the ship to be placed. Clicking the 'Place Ship' button will place it at the desired position. A model is displayed in each box that shows how the design of the ship to be placed currently looks.
*It is worth noting that ships will be placed from the MIDDLE. For example, a horizontal length 3 ship placed at [1, 1] will occupy the tiles [0, 1], [1, 1] and [2, 1]. Even-number-length ships will be weighted towards a greater X and Y coordinate; for example a horizontal length 4 ship placed at [1, 1] will occupy the tiles [0, 1], [1, 1], [2, 1] and [3, 1].


- Ships can also be dragged on to the board from their model.


- Ships can be deleted from the board before the game starts (and as long as the game is not in its 'ended' state) by clicking them on the board.


- At any time, a human-controlled board can have its ships 'hidden' from view by clicking the 'Hide/Show Ships' button next to that board. This is useful for playing with 2 players, as after one player designs their board, they can hide it, hand the device off to the other player who can then also design their board and hide it. Then, by pressing 'Start Game', the game can be played without either player being able to see the other player's ships.


- A computer's board is ALWAYS hidden until the end of the game. Switching a board's style to computer-controlled will automatically set the board to 'hidden', and it cannot be changed back while the board is computer-controlled.


- When all human-controlled boards have at least one ship, pressing 'Start Game' will begin the game. Clicking a cell on the opposing board will 'attack' the board at that position if it is that player's turn. The turn will then be switched to the other player. Computer-controlled boards have a delay of 2 seconds before attacking automatically.


- When a ship is successfully hit and/or sunk, the information string in the middle of the board will notify the players appropriately.


- The game will end when one of the boards has no remaining ships. This will put the game into an 'ended' state, where the winner will be announced, and nothing else can be done. This also reveals any ships that were not completely sunk on the winning player's board.


- Clicking 'Reset Game' will reset both boards, and the players can now create a new board of ships for the next game.


- It is possible to have two computer-controlled boards face each other by setting the play styles of both boards appropriately.
