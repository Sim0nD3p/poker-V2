


class Player{

    name = "Nameless Player";
    id;
    cardsInHand= [];
    bestHand = [];
    handType;

    constructor(joinObject) {
        this.name = joinObject.name;
        this.id = joinObject.id;
        this.hand = [];
        this.cardsInHand = [];
    }

    assignCards(card1, card2) {
        this.cardsInHand.push(card1);
        this.cardsInHand.push(card2);

    }


}
module.exports = Player;


