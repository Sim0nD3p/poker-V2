


class Player{

    name = "Nameless Player";
    id;
    card1;
    card2;
    hand = [];
    handType;

    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.hand = [];
    }

    assignCards(card1, card2) {
        this.card1 = card1;
        this.card2 = card2;

    }


}



