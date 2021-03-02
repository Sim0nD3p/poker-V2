


class Player{

    name = "Nameless Player";
    cardsInHand= [];
    bestHand = [];
    bestHandDesc;
    bestHandScore;
    isPlaying;
    balance; //player's money
    currentBet=0;

    maxPot = 0;

    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.hand = [];
        this.cardsInHand = [];
        this.isPlaying = true;
    }

    assignCards(card1, card2) {
        this.cardsInHand.push(card1);
        this.cardsInHand.push(card2);

    }


}
module.exports = Player;


