document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const dealButton = document.getElementById('deal');
    const hitButton = document.getElementById('hit');
    const standButton = document.getElementById('stand');
    const playerCardsElement = document.getElementById('player-cards');
    const dealerCardsElement = document.getElementById('dealer-cards');
    const playerPointsElement = document.getElementById('player-points');
    const dealerPointsElement = document.getElementById('dealer-points');
    const resultElement = document.getElementById('result');
  
    let deck = [];
    let playerCards = [];
    let dealerCards = [];
    let playerPoints = 0;
    let dealerPoints = 0;
    let gameOver = false;
  
    // Create a deck of cards
    function createDeck() {
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
      const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
      for (let suit of suits) {
        for (let value of values) {
          deck.push({ suit, value });
        }
      }
  
      shuffleDeck();
    }
  
    // Shuffle the deck of cards
    function shuffleDeck() {
      for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    }
  
    // Start a new game
    function startGame() {
      gameOver = false;
      resultElement.textContent = '';
      playerCards = [getNextCard(), getNextCard()];
      dealerCards = [getNextCard(), getNextCard()];
      playerPoints = calculatePoints(playerCards);
      dealerPoints = calculatePoints(dealerCards);
  
      renderGame();
  
      if (playerPoints === 21) {
        endGame();
      }
    }
  
    // Get the next card from the deck
    function getNextCard() {
      return deck.shift();
    }
  
    // Calculate the points in a hand
    function calculatePoints(cards) {
      let points = 0;
      let hasAce = false;
  
      for (let card of cards) {
        points += getCardValue(card);
  
        if (card.value === 'A') {
          hasAce = true;
        }
      }
  
      if (hasAce && points <= 11) {
        points += 10;
      }
  
      return points;
    }
  
    // Get the value of a card
    function getCardValue(card) {
      switch (card.value) {
        case 'A':
          return 1;
        case '2':
          return 2;
        case '3':
          return 3;
        case '4':
          return 4;
        case '5':
          return 5;
        case '6':
          return 6;
        case '7':
          return 7;
        case '8':
          return 8;
        case '9':
          return 9;
        default:
          return 10;
      }
    }
  
    // Render the game on the screen
    function renderGame() {
      renderCards(playerCards, playerCardsElement, playerPointsElement);
      renderCards(dealerCards, dealerCardsElement, dealerPointsElement);
    }
  
    // Render the cards and points on the screen
    function renderCards(cards, cardsElement, pointsElement) {
        cardsElement.innerHTML = '';
    
        for (let card of cards) {
        let cardElement = document.createElement('li');
        let imageElement = document.createElement('img');
        imageElement.src = `cards/${card.value}${card.suit[0]}.png`;
        imageElement.alt = `${card.value} of ${card.suit}`;
        imageElement.classList.add('card-image');
        cardElement.appendChild(imageElement);
        cardsElement.appendChild(cardElement);
        }
    
        pointsElement.textContent = `Points: ${calculatePoints(cards)}`;
    }
  
  
  
  
    // End the game and display the result
    function endGame() {
      gameOver = true;
  
      while (dealerPoints < 17) {
        dealerCards.push(getNextCard());
        dealerPoints = calculatePoints(dealerCards);
        renderGame();
      }
  
      if (playerPoints == 21){
        resultElement.textContent = 'Blackjack!';
      } else if (playerPoints > 21) {
        resultElement.textContent = 'You bust! You lose.';
      } else if (dealerPoints > 21) {
        resultElement.textContent = 'Dealer busts! You win.';
      } else if (playerPoints > dealerPoints) {
        resultElement.textContent = 'You win.';
      } else if (playerPoints < dealerPoints) {
        resultElement.textContent = 'You lose.';
      } else {
        resultElement.textContent = 'It\'s a tie.';
      }
    }
  
    // Event listeners for game buttons
    dealButton.addEventListener('click', () => {
      if (gameOver) {
        createDeck();
        startGame();
      }
    });
  
    hitButton.addEventListener('click', () => {
      if (!gameOver) {
        playerCards.push(getNextCard());
        playerPoints = calculatePoints(playerCards);
        renderGame();
  
        if (playerPoints >= 21) {
          endGame();
        }
      }
    });
  
    standButton.addEventListener('click', () => {
      if (!gameOver) {
        endGame();
      }
    });
  
    // Start the game
    createDeck();
    startGame();
  });
  