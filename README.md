# memory-game Fruit Match
Fruit Match is a cheerful memory game where you flip cards and find matching pairs of fruit. Test your memory, keep track of your moves, and see how quickly you can match them all! The HTML structure is created dynamically with JavaScript, and the game is built using CSS and JavaScript.

## Features

- Random card shuffling at the beginning of each game
- Smooth card-flip animation
- Move and matched-pair counters
- Victory modal with the final result
- Ability to restart the game
- Leaderboard with the top 10 results
- Results saved in `localStorage`
- Responsive layout for desktop and mobile devices

## How to Play

1. Click a card to reveal the fruit.
2. Open a second card.
3. If the images match, the cards remain open.
4. If the images do not match, they flip back after a short delay.
5. Find all 8 matching pairs to complete the game.
6. Try to finish the game using as few moves as possible.

## Run Locally

### Prerequisites

- [Git](https://git-scm.com/downloads) installed on your computer
- [Visual Studio Code](https://code.visualstudio.com/) installed
- The **Live Server** extension installed in Visual Studio Code

### Steps

1. Open a bash terminal or command prompt on your computer.

2. Clone the repository:

   ```bash
   git clone https://github.com/esrudenko/memory-game.git

3. Go to the project directory:

   ```bash
   cd memory-game

4. Switch to the memory-game branch:

   ```bash
   git switch memory-game

5. Open the project folder in Visual Studio Code. You can use this command:

   ```bash
   code .
   
   If the code command is unavailable, open Visual Studio Code, select File → Open Folder, and choose the memory-game folder.

6. Open index.html in Visual Studio Code.

7. Right-click inside the editor and select Open with Live Server. The game will open in your default browser.