// CREATE STRUCTURE
//header
const header = createElement("header", "header_wrapper");

const logoWrapper = createElement("div", "logo_wrapper");
const logoImg = createElement("img", "logo_img");
const gameName = createElement("h1", "game_name", "Fruit Match");

const headerBtnsWrapper = createElement("div", "header_btns_wrapper");
const newGameBtn = createElement("button", "new_game_btn", "New Game");
const leaderboardBtn = createElement("button", "leaderboard_btn");
const trophyImg = createElement("img", "trophy_img");
const leaderboardName = createElement(
  "span",
  "leaderboard_name",
  "Leaderboard",
);

logoImg.src = "./img/logo-orange.png";
logoImg.alt = "Fruit Match";
trophyImg.src = "./img/leaderboard-trophy.png";
trophyImg.alt = "";

header.append(logoWrapper, headerBtnsWrapper);
logoWrapper.append(logoImg, gameName);
headerBtnsWrapper.append(newGameBtn, leaderboardBtn);
leaderboardBtn.append(trophyImg, leaderboardName);

//main
const main = createElement("main", "main_wrapper");

const mainHeader = createElement("div", "main_header");
const leaveLeftImg = createElement("img", "leave_left_img");
const mainHeaderContent = createElement("div", "main_header_content");
const mainHeaderTitle = createElement(
  "h2",
  "main_header_title",
  "Find all pairs",
);
const mainHeaderText = createElement(
  "p",
  "main_header_text",
  "A little game for a sunny day",
);
const leaveRightImg = createElement("img", "leave_right_img");

const gameBoard = createElement("div", "game_board");

leaveLeftImg.src = "./img/leave-right.png";
leaveLeftImg.alt = "";
leaveRightImg.src = "./img/leave-left.png";
leaveRightImg.alt = "";

main.append(mainHeader, gameBoard);
mainHeader.append(leaveLeftImg, mainHeaderContent, leaveRightImg);
mainHeaderContent.append(mainHeaderTitle, mainHeaderText);

for (let i = 0; i < 16; i++) {
  const card = createElement("div", "card");
  gameBoard.append(card);
  const cardImg = createElement("img", "card_img");
  card.append(cardImg);
  cardImg.src = "./img/card-back.png";
  cardImg.alt = "";
}

//footer
const footer = createElement("footer", "footer_wrapper");

const movesBox = createElement("div", "stat_item");
const movesLabel = createElement("p", "stat_label", "MOVES");
const movesValue = createElement("p", "stat_value", "00");

const pairsBox = createElement("div", "stat_item");
const pairsLabel = createElement("p", "stat_label", "PAIRS");
const pairsValue = createElement("p", "stat_value", "0 / 0");

movesValue.id = "moves_value";
pairsValue.id = "pairs_value";

movesBox.append(movesLabel, movesValue);
pairsBox.append(pairsLabel, pairsValue);
footer.append(movesBox, pairsBox);

document.body.append(header, main, footer);

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.classList.add(className);
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}
