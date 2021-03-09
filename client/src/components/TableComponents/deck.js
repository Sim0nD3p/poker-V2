function importCards(r) {
    console.log('importing cards');
    let filePathName = r.keys();
    let source = filePathName.map(r);
    let array = [];
    for (let i = 0; i < filePathName.length; i++) {
        let name = filePathName[i].substring(2, 5);
        array[name] = source[i];
    }
    return array;
}

function importCardsBack(r){
    console.log(r.keys())
    let filePathName = r.keys();
    let source = filePathName.map(r);
    let array = [];
    for(let i = 0; i < filePathName.length; i++){
        let name = filePathName[i].substring(2, 4);
        array.push(source[i]);
        console.log(array);
    }
    return array
}

const cardsBack = importCardsBack(require.context('../../res/cardBack', false, /\.(png|jpe?g|svg)$/));

const cards = importCards(require.context('../../res/cards', false, /\.(png|jpe?g|svg)$/)); //cant touch that or it wont work
export class Deck {
    constructor() {
        this.cards = cards;
        this.cardsBack = cardsBack;
        this.suits = ['S', 'C', 'H', 'D'];
    }
    back(){
        return this.cardsBack[0]
    }
    cardFromFlop(card){
        let ca;
        let rd;
        if(card.number && card.suit){

        }
    }
    card(card) {
        if(card){
            let ca;
            if(card.number < 10){
                ca = '0' + card.number.toString();
            }
            else if (card.number >= 10){
                ca = card.number.toString()
            }
            let rd = this.suits[card.suit];
            let fileName = ca + rd;
            return this.cards[fileName]
        }
        else{
            return this.cardsBack[0];
        }
    }
}
