/*
* set up the event listener for a card. If a card is clicked:
 - display the card's symbol (put this functionality in another function that you call from this one)
  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  - if the list already has another card, check to see if the two cards match
     if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
     if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
     increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)*/

     $(document).ready(function() {
     });
/*
      /* Create a list that holds all of your cards
      */
const deckCards = ["thumbs-up", "thumbs-up",
    "smile-o", "smile-o",
    "paper-plane-o", "paper-plane-o",
    "cube", "cube",
    "music", "music",
    "legal", "legal",
    "flag", "flag",
    "anchor", "anchor"
];

const deckBoard = document.querySelector(".deck");
var displayCards = [];
var cardsFlipped = 0;
var cardsMatched = 0;
var cardsUnmatched = [];
var cards = deckCards;

var modal = document.getElementById(".memoryTest");

Array.prototype.displayCardsShuffle = function() {
    var i = deckCards.length, j, temp;
    while (i-- > 0) { // changed from --i > 0 to include index '0' in array shuffle.
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
        //console.log(deckCards);
    }
}
//initialises the game
function newDeck() {
    //shuffles the cards
    deckCards.displayCardsShuffle();
    for (var i = 0; i < deckCards.length; i++) {
      deckBoard.innerHTML = "";
    }
    //Production of all cards programatically.
    for (var i = 0; i < deckCards.length; i++) {

        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = '<i class="fa fa-' + deckCards[i] + '"></i>';
        deckBoard.appendChild(card);
        //deactivate prevents clicking on the same card twice in succession and receiving a  'matched' alert.
        card.addEventListener('click', function() {
            displayCards.push(card);
            card.classList.add('open', 'show', 'deactivate');

            const secondCard = card;
            const firstCard = displayCards[0];

            // Count each 2 card Move (2 card clicks made when taking a game move).
            //function choose(card) {
              if (displayCards.length === 2) {
              //return
                    moveCounter();
                    moves++;
                    checkMatch(secondCard, firstCard);

                }
                //If cards matched, remain face up with matched background colour.
                function checkMatch(secondCard, firstCard) {
                      //Paired
                      if (secondCard.innerHTML === firstCard.innerHTML) {
                          displayCards.forEach(function(card) {
                            card.style.background = '#5BF30B';


                        });
                        //Cards Matched works as expected!!
                        secondCard.classList.add('match', 'deactivate');
                        firstCard.classList.add('match', 'deactivate');
                        //no-event - once cards matched unable to click again on mached cards
                        secondCard.classList.remove('open', 'show', 'no-event');
                        firstCard.classList.remove('open', 'show', 'no-event');
                        //alert("Matching pair!");

                        cardsMatched.push(secondCard, firstCard);

                        displayCards = [];
                        cardsunMatched = [];

                        //when all 16 cards have been paired, game is over.
                        gameComplete();


                      } else {
                        //alert("Unmatched pair!"); // now only requires 1 click to close alert box.

                        //Cards Unmatched works as expected!!


                          /*If cards unMatched - turnover both cards face down after a period of 600 millisecs,
                          with unmatched background colour to indicate cards were originally clicked, aiding the user's memory.*/
                          setTimeout(function() {
                                displayCards.forEach(function(card) {
                                secondCard.classList.add('unmatched');
                                firstCard.classList.add('unmatched');

                                secondCard.classList.remove('open', 'show', 'deactivate');
                                firstCard.classList.remove('open', 'show', 'deactivate');
                                card.style.background = '#800000';
                                activate();
                         });
                                secondCard.classList.remove('unmatched');
                                firstCard.classList.remove('unmatched');
                                deactivate();

                                displayCards = [];
                          }, 500);
                  //}
