import { cards } from "./data.js";

let firstCard = null;
let secondCard = null;
let mismatchTimerId = null;

let isBoardLocked = false;
let isResultSaved = false;

let moves = 0;
let pairs = 0;

const LEADERBOARD_KEY = "leaderboard";
const leaderboardData = getLeaderboardData();

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
leaderboardBtn.addEventListener("click", () => {
  updateLeaderboardTable();
  openModal(leaderboardOverlay);
});

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
const movesValue = createElement("p", "stat_value", "0");

const pairsBox = createElement("div", "stat_item");
const pairsLabel = createElement("p", "stat_label", "PAIRS");
const pairsValue = createElement("p", "stat_value", "0 / 8");

movesValue.id = "moves_value";
pairsValue.id = "pairs_value";

movesBox.append(movesLabel, movesValue);
pairsBox.append(pairsLabel, pairsValue);
footer.append(movesBox, pairsBox);

//modal "finish"
const modalOverlay = createElement("div", "modal_overlay");
const modalContainer = createElement("div", "modal_container");
const closeModalBtn = createElement("button", "close_modal_btn", "×");
const trophyModalImg = createElement("img", "trophy_modal_img");
const modalTitle = createElement("h2", "modal_title", "You found all pairs!");
const modalText = createElement(
  "p",
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

closeModalBtn.dataset.closeModal = "";
closeBtnModal.dataset.closeModal = "";
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

//modal "leaderboard"
const leaderboardOverlay = createElement("div", "leaderboard_overlay");
const leaderboardContainer = createElement("div", "leaderboard_container");
const closeLeaderboardBtnCross = createElement("button", "close_lb_btn", "×");
const leaderboardImg = createElement("img", "leaderboard_img");
const leaderboardTitle = createElement(
  "h2",
  "leaderboard_title",
  "Leaderboard",
);

const closeLeaderboardBtn = createElement(
  "button",
  "close_leaderboard_btn",
  "Close",
);

closeLeaderboardBtnCross.dataset.closeModal = "";
closeLeaderboardBtn.dataset.closeModal = "";
closeLeaderboardBtnCross.type = "button";
closeLeaderboardBtn.type = "button";
closeLeaderboardBtnCross.setAttribute("aria-label", "Close leaderboard");
leaderboardImg.src = "./img/leaderboard-trophy-modal.png";
leaderboardImg.alt =
  "Golden trophy with a star, surrounded by glowing fruit icons.";

leaderboardOverlay.append(leaderboardContainer);

leaderboardContainer.append(
  closeLeaderboardBtnCross,
  leaderboardImg,
  leaderboardTitle,
  closeLeaderboardBtn,
);

updateLeaderboardTable();

document.body.append(header, main, footer, modalOverlay, leaderboardOverlay);

function updateLeaderboardTable() {
  const oldContent = leaderboardContainer.querySelectorAll(
    ".leaderboard_table, .text_no_results",
  );

  oldContent.forEach((element) => {
    element.remove();
  });

  if (leaderboardData.length === 0) {
    const textNoResults = createElement(
      "p",
      "text_no_results",
      "No results yet.",
    );

    leaderboardContainer.insertBefore(textNoResults, closeLeaderboardBtn);
    return;
  }

  const topResults = [...leaderboardData]
    .sort((a, b) => a.moves - b.moves)
    .slice(0, 10);

  const leaderboardTable = createElement("table", "leaderboard_table");
  const thead = createElement("thead");
  const headerRow = createElement("tr");
  const thRank = createElement("th", "th_rank", "Rank");
  const thMoves = createElement("th", "th_moves", "Moves");
  const thDate = createElement("th", "th_date", "Date");

  const tbody = createElement("tbody");
  for (let i = 0; i < topResults.length; i++) {
    const resultRow = createElement("tr");
    const tdRank = createElement("td", "td_rank", `${i + 1}`);
    const tdMoves = createElement("td", "td_moves", `${topResults[i].moves}`);
    const tdDate = createElement("td", "td_date", `${topResults[i].date}`);

    tbody.append(resultRow);
    resultRow.append(tdRank, tdMoves, tdDate);
  }

  thead.append(headerRow);
  headerRow.append(thRank, thMoves, thDate);
  leaderboardTable.append(thead, tbody);
  closeLeaderboardBtn.before(leaderboardTable);
}

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

function updateCards() {
  allCards.forEach((card, index) => {
    const cardData = deck[index];
    const cardImage = card.querySelector(".card_front_img");

    card.dataset.id = cardData.id;
    cardImage.src = cardData.img;
    cardImage.alt = cardData.alt;
  });
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

  if (isBoardLocked || clickedCard.classList.contains("is-flipped")) return;
  clickedCard.classList.add("is-flipped");

  if (firstCard === null) {
    firstCard = clickedCard;
    return;
  }

  secondCard = clickedCard;

  moves++;
  movesValue.textContent = moves;

  if (secondCard.dataset.id === firstCard.dataset.id) {
    pairs++;
    pairsValue.textContent = `${pairs} / ${cards.length}`;
    firstCard = null;
    secondCard = null;
    checkGameCompletion();
    return;
  }
  isBoardLocked = true;
  mismatchTimerId = setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");
    firstCard = null;
    secondCard = null;
    isBoardLocked = false;
    mismatchTimerId = null;
  }, 700);
}

const allCards = document.querySelectorAll(".card");

//modal
function setupModal(modal) {
  modal.addEventListener("click", (event) => {
    const closeButton = event.target.closest("[data-close-modal]");
    const overlayClicked = event.target === modal;

    if (closeButton || overlayClicked) {
      closeModal(modal);
    }
  });
}

setupModal(modalOverlay);
setupModal(leaderboardOverlay);
newGameBtnModal.addEventListener("click", startNewGame);

function checkGameCompletion() {
  if (pairs === cards.length) {
    saveResultToLeaderboard(moves);

    openModal(modalOverlay);
    modalText.textContent = `You completed the game in ${moves} moves!`;
  }
}

function openModal(modal) {
  modal.style.display = "flex";
}

function closeModal(modal) {
  modal.style.display = "none";
}

function startNewGame() {
  if (mismatchTimerId !== null) {
    clearTimeout(mismatchTimerId);
    mismatchTimerId = null;
  }

  closeModal(modalOverlay);
  closeModal(leaderboardOverlay);
  allCards.forEach((card) => card.classList.remove("is-flipped"));
  firstCard = null;
  secondCard = null;
  isBoardLocked = false;
  moves = 0;
  pairs = 0;
  movesValue.textContent = "0";
  pairsValue.textContent = `0 / ${cards.length}`;
  shuffle(deck);
  updateCards();
  isResultSaved = false;
}

//localstorage
function getLeaderboardData() {
  return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
}

function saveResultToLeaderboard(moves) {
  if (isResultSaved) return;

  const dateToday = new Date().toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  leaderboardData.push({ moves, date: dateToday });
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboardData));
  isResultSaved = true;
}
