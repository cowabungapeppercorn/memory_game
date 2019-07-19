const cards = document.querySelectorAll(".card");
const newButton = document.querySelector('#newGameButton');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let currentScore = 0;

function addClickListener() {
    cards.forEach(card => card.addEventListener('click', flipCard));
}

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.toggle('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.cage === secondCard.dataset.cage;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCards();
    }, 1500);
}

function resetCards() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetAllCards() {
    cards.forEach(card => {
        if(card.classList.contains('flip')){
            card.classList.remove('flip');
        }
    });
    addClickListener();
}

function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 20);
        card.style.order = randomPosition;
    });
};

function newGame() {
    resetAllCards();
    lockBoard = true;
    setTimeout(() => {
        shuffle();
        resetCards();
    }, 1500);
}

shuffle();
addClickListener();
newButton.addEventListener('click', newGame);