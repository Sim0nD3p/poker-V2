//import class deck
const Deck = require('./Deck');
const CardValues = [-1, -1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];
const suitsEnum = Object.freeze({"spades":0, "clubs":1, "hearts":2, "diamonds":3});
class Table{

    CardsOnTable = [];

    constructor(newTableObject){
        this.id = newTableObject.id;
        this.host = newTableObject.host;
        this.gameSettings = newTableObject.gameSettings;
        this.deck = new Deck()
    }
    addPlayer(playerObject){
        console.log(playerObject);

    }
    GetScore(cards)
    {
        let cardNums = [0,0,0,0,0,0,0,0,0,0,0,0,0];
        let cardSorts = [0,0,0,0];
        let i;
        for(i=0;i<cards.length;i++) {
            cardNums[cards[i].number]++;
            cardSorts[cards[i].suit]++;
        }
        const ranks = {
            royal_flush: false,
            straight_flush: false,
            quads: cardNums.some((count) => count === 4),
            full_house: false,
            flush: cardSorts.some((count) => count === 5),
            straight: false,
            trips: cardNums.some((count) => count === 3),
            two_pairs: cardNums.filter((count) => count === 2).length === 2,
            pair: cardNums.filter((count) => count === 2).length === 1,
            high_card: true,
        };

        let k;
        for(k=0;k+4<13;k++){
            if(cardNums[k] === 1 && cardNums[k+1] === 1 && cardNums[k+2] === 1 && cardNums[k+3] === 1 && cardNums[k+4] === 1){
                ranks.straight = true;
                break;
            }
        }
        if(cardNums[0] === 1 && cardNums[1] === 1 && cardNums[2] === 1 && cardNums[3] === 1 && cardNums[12] === 1){
            ranks.straight = true;
        }

        ranks.straight_flush = ranks.flush && ranks.straight;
        ranks.full_house = ranks.pair && ranks.trips;
    }
}

module.exports = Table;
