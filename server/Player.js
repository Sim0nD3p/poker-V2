


class Player{

    name = "Nameless Player";
    id;
    card1;
    card2;
    hand = [];
    handType;

    constructor(joinObject) {
        this.name = joinObject.name;
        this.id = joinObject.id;
        this.hand = [];
    }

    assignCards(card1, card2) {
        this.card1 = card1;
        this.card2 = card2;

    }


}
module.exports = Player;


