/* Author: Christian M Rapp | CMR Web Studio
   Date: 4/26/23
   Program: war-game.js
   
   This game is automated, no user input is required. Game only plays 26 rounds. 
   Once cards are played, they are removed from the deck. A standard deck of 52 cards is dealt so that both players have 26 cards.
   In war, each card has one of thirteen possible predetermined values starting at two (the lowest value) through Ace (the highest value).
   Card suits are the traditional Hearts, Diamonds, Clubs & Spades.
   During each round, both players play a card from the top of their hand face up. The player who plays the card of the higher rank wins the round.
   Unlike the traditional game where the losing player's cards are taken by the winner of the round, used are removed from play. 
   The player with the highest value card wins a point for the round. If the player's cards are equal, no points are awarded. 
   When the game is finished a winner or a draw is determined.
*/
 
// create a class for a player
class Player {
    constructor (name, score) {
        this.name = name;
        this.score = score;
        this.hand = [];     //array to hold players hand of cards
    }

    //return player name and card and remove card from front of deck
    describe() {
        if (this.hand.length != 0) {
            console.log(`${this.name}: ${this.hand[0].key} of ${this.hand[0].suit}`);
            this.hand.shift();
        }        
    }

    //increment player's score
    incrementScore(){
        this.score += 1;
    }
}

//create a class for a playing card
class Card {
    constructor (suit, value, key){
        this.suit = suit;       //card suit
        this.value = value;     //value of card
        this.key = key;         //text values for face cards
    }
}

// instantiate a new Deck and populate with the standard 52 cards
class Deck {
    constructor () {
        this.deck = [];       //deck is an array

        //create an array of suits
        let suit = ['♥', '♦', '♣', '♠']    

        //create an array of numerical card values 
        let value = ['1', '2', '3', '4','5','6','7','8','9','10','11', '12', '13'];

        //create an array of keys for translating face card values to text
        let key = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen', 'King'];

        //combine above information to create a card and complete building the deck using a nested array
        for(let i=0; i < suit.length; i++){
            for (let j=0; j < value.length; j++){                
                this.deck.push(new Card(suit[i], value[j], key[j]));
            }
        }
    }

    shuffleDeck() {
        //create a 'random' shuffle of the deck by swapping locations 500 times

        for (let i=0; i < 500; i++){
            let pos1 = Math.floor((Math.random() * this.deck.length));
            let pos2 = Math.floor((Math.random() * this.deck.length));

            let tempPos = this.deck[pos1];

            this.deck[pos1] = this.deck[pos2];
            this.deck[pos2] = tempPos;
        }
    }
}


class warGame {
    constructor() {
        this.gameDeck = new Deck();
        
    }

    start() {
        
        const player1 = new Player('Player 1', 0);
        const player2 = new Player('Player 2', 0);

        console.log('♥ ♣ ♦ ♠  A   G A M E   O F   W A R  ♥ ♣ ♦ ♠');
        console.log(this.displayScores(player1, player2));

        //shuffle the deck
        this.gameDeck.shuffleDeck();

        //deal cards to players
        this.dealCards(this.gameDeck, player1, player2);

        //play the game
        for(let i=0; i<26; i++){

            console.log('\nROUND ' + (i+1));
            var p1Card = player1.hand[0].value;
            var p2Card = player2.hand[0].value;

            console.log('P1 Card: ' + p1Card);
            console.log('P2 Card: ' + p2Card);
            
           //show player hands
            player1.describe();
            player2.describe();

            //calculate scores
            this.calculateScore(player1, player2, p1Card, p2Card);

            //display scores
            console.log(this.displayScores(player1, player2));
        }
        
        //display game results
        this.displayResults(player1, player2);
    }

    dealCards(gameDeck, player1, player2) {
        var i = 0;

        while(i < 52 ){
            player1.hand.push(this.gameDeck.deck[i]);
            player2.hand.push(this.gameDeck.deck[i+1]);
            i+=2;       
        }
    }

    //compare player hands and calculate scores | Increment winning player's score | Display scores
    calculateScore(player1, player2, p1Card, p2Card){
        if (p1Card > p2Card) {
            console.log(`${player1.name} wins the hand!`);
            player1.incrementScore();
        } else if (p1Card < p2Card){
            console.log(`${player2.name} wins the hand!`);
            player2.incrementScore();
        } else {
            console.log('The hand is a draw.')
        }
    }

    displayScores(player1, player2){
        return `${player1.name} score: ${player1.score}    ${player2.name} score: ${player2.score}`;
    }

    displayResults(player1, player2){
        if (player1.score > player2.score) {
            console.log(`${player1.name} wins the game with a score of ${player1.score}!`);
        } else if (player2.score> player1.score){
            console.log(`${player2.name} wins the game with a score of ${player2.score}!`);
        } else {
           console.log(`Both players ended the game with a score of ${player1.score}. | This game is a Draw.`);
        }
    }
} 

let war = new warGame();
war.start();