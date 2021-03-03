function importCards(r) {
    let filePathName = r.keys();
    let source = filePathName.map(r);
    let array = [];
    for (let i = 0; i < filePathName.length; i++) {
        let name = filePathName[i].substring(2, 5);
        array[name] = source[i];
    }
    return array;
}

const cards = importCards(require.context('../../res/cards', false, /\.(png|jpe?g|svg)$/)); //cant touch that or it wont work

export class Deck {
    constructor() {
        this.cards = cards;
    }
    card(cardName) {
        console.log();
        return this.cards[cardName]
    }
}
