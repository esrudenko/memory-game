import { cards } from "./data.js";

let firstCard = null;
let secondCard = null;
let isBoardLocked = false;
let moves = 0;
let pairs = 0;

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
newGameBtn.type = "button";
leaderboardBtn.type = "button";
logoImg.src = "./img/logo-orange.png";
logoImg.alt = "Fruit Match";
trophyImg.src = "./img/leaderboard-trophy.png";
trophyImg.alt = "";

header.append(logoWrapper, headerBtnsWrapper);
logoWrapper.append(logoImg, gameName);
headerBtnsWrapper.append(newGameBtn, leaderboardBtn);
leaderboardBtn.append(trophyImg, leaderboardName);

newGameBtn.addEventListener("click", startNewGame);

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
const pairsValue = createElement("p", "stat_value", "0 / 8");

movesValue.id = "moves_value";
pairsValue.id = "pairs_value";

movesBox.append(movesLabel, movesValue);
pairsBox.append(pairsLabel, pairsValue);
footer.append(movesBox, pairsBox);

//modal
const modalOverlay = createElement("div", "modal_overlay");
const modalContainer = createElement("div", "modal_container");
const closeModalBtn = createElement("button", "close_modal_btn", "×");
const trophyModalImg = createElement("img", "trophy_modal_img");
const modalTitle = createElement("h1", "modal_title", "You found all pairs!");
const modalText = createElement(
  "h1",
  "modal_text",
  "You completed the game in 0 moves!",
);
const modalBtns = createElement("div", "modal_btns");
const newGameBtnModal = createElement(
  "button",
  "new_game_btn_modal",
  "New Game",
);
const closeBtnModal = createElement("button", "close_btn_modal", "Close");

closeModalBtn.type = "button";
closeBtnModal.type = "button";
closeModalBtn.setAttribute("aria-label", "Close window");
trophyModalImg.src = "./img/trophy-with-fruits.png";
trophyModalImg.alt =
  "Golden trophy with a star, surrounded by glowing fruit icons.";
newGameBtnModal.type = "button";

modalOverlay.append(modalContainer);
modalContainer.append(
  closeModalBtn,
  trophyModalImg,
  modalTitle,
  modalText,
  modalBtns,
);
modalBtns.append(newGameBtnModal, closeBtnModal);

document.body.append(header, main, footer, modalOverlay);

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
  cards.forEach((card) => {
    deck.push(card);
    deck.push(card);
  });
}

function shuffle(array) {
  let m = array.length,
    t,
    i;
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

    card.addEventListener("click", flipCard);
  }
}

renderCards(deck);

function flipCard(e) {
  const clickedCard = e.target.closest(".card");
  if (isBoardLocked === true) return;

  if (firstCard === null) {
    firstCard = clickedCard;
    clickedCard.classList.add("is-flipped");
  } else if (firstCard !== null && secondCard === null) {
    secondCard = clickedCard;
    clickedCard.classList.add("is-flipped");

    if (secondCard.dataset.id === firstCard.dataset.id) {
      firstCard = null;
      secondCard = null;
      isBoardLocked = false;
      checkGameCompletion();
      moves++;
      document.querySelector("#moves_value").textContent = `${moves}`;
      pairs++;
      document.querySelector("#pairs_value").textContent = `${pairs} / 8`;
    } else {
      isBoardLocked = true;
      moves++;
      document.querySelector("#moves_value").textContent = `${moves}`;
      setTimeout(() => {
        firstCard.classList.remove("is-flipped");
        secondCard.classList.remove("is-flipped");
        firstCard = null;
        secondCard = null;
        isBoardLocked = false;
      }, 700);
    }
  }
}

const allCards = document.querySelectorAll(".card");

//modal
modalOverlay.addEventListener("click", (e) => {
  if (!e.target.closest(".modal_container")) {
    closeModal();
  }
  if (e.target.closest(".close_modal_btn")) {
    closeModal();
  }
  if (e.target.closest(".close_btn_modal")) {
    closeModal();
  }
  if (e.target.closest(".new_game_btn_modal")) {
    startNewGame();
  }
});

function checkGameCompletion() {
  if ([...allCards].every((card) => card.classList.contains("is-flipped"))) {
    modalOverlay.style.display = "flex";
    modalText.textContent = `You completed the game in ${moves + 1} moves!`;
  } else return;
}

function closeModal() {
  modalOverlay.style.display = "none";
}

function startNewGame() {
  closeModal();
  allCards.forEach((card) => card.classList.remove("is-flipped"));
  firstCard = null;
  secondCard = null;
  isBoardLocked = false;
  moves = 0;
  pairs = 0;
  document.querySelector("#moves_value").textContent = "0";
  document.querySelector("#pairs_value").textContent = "0 / 8";
}
