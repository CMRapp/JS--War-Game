/* 
  Copyright (c) 2023 Christian M Rapp | CMR Web Studio
  Author:  Christian M Rapp
  Subject:  JS Mocha/Chai Testing for War Game
*/

const expect = chai.expect;
const assert = chai.assert;

describe('War Game Unit Tests', () => {
    describe('Should claculate player scores', () => {
        it('#Should calculate scores and determine highest score or a tie score', () => {
            function calculateScore(player1, player2){
                
                    if (player1  > player2) {
                        return `Player1 wins the hand!`;
                    } else if (player1 < player2){
                        return `Player2 wins the hand!`;
                    } else {
                        return (`The hand is a draw.`);
                    }
                
            }//end function
            
            //Tests
            expect(calculateScore(10, 11)).to.equal(`Player2 wins the hand!`);
            expect(calculateScore(100, 11)).to.equal(`Player1 wins the hand!`);
            expect(calculateScore(11, 11)).to.equal(`The hand is a draw.`);
        });
    });
});