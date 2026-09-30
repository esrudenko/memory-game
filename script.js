import { cards } from "./data.js";

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

//CREATE RANDOM CARDS
let deck = [];

function createDeck() {
  cards.forEach(card => {
    deck.push(card);
    deck.push(card);
  })
}

function shuffle(array) {

  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
}

createDeck();
shuffle(deck);

//RENDER CARDS
function renderCards(deck) {
  for (let i = 0; i < deck.length; i++) {
    const card = createElement("div", "card");
    const cardInner = createElement("div", "card_inner");
    const cardFront = createElement("div", "card_front");
    const cardFrontImg = createElement("img", "card_front_img");
    const cardBack = createElement("div", "card_back");
    const cardBackImg = createElement("img", "card_back_img");

    gameBoard.append(card);
    card.append(cardInner);
    cardInner.append(cardFront, cardBack);
    cardFront.append(cardFrontImg);
    cardBack.append(cardBackImg);

    card.dataset.id = deck[i].id;
    cardFrontImg.src = deck[i].img;
    cardFrontImg.alt = deck[i].alt;
    cardBackImg.src = "./img/card-back.png";
    cardBackImg.alt = "";
  }
}

renderCards(deck);