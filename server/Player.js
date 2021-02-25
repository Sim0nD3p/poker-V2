


class Player{

    name = "Nameless Player";
    id;
    cardsInHand= [];
    bestHand = [];
    bestHandDesc;
    bestHandScore;

    constructor({name, id}) {
        this.name = name;
        this.id = id;
        this.hand = [];
        this.cardsInHand = [];
    }

    assignCards(card1, card2) {
        this.cardsInHand.push(card1);
        this.cardsInHand.push(card2);

    }


}
module.exports = Player;


