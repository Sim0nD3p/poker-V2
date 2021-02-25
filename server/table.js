//import class deck
const Deck = require('./Deck');
const CardValues = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];
const suitsEnum = Object.freeze({"spades":0, "clubs":1, "hearts":2, "diamonds":3});
class Table{

    CardsOnTable = [];

    constructor(newTableObject){
        this.id = newTableObject.id;
        this.host = newTableObject.host;
        this.gameSettings = newTableObject.gameSettings;
        this.deck = new Deck()
        this.players = [];
    }
    addPlayer(playerObject){
        console.log(playerObject);

    }
    GetWinner()
    {
        
    }

}
function GetScore(cards)
{
    let cardNums = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    let cardSorts = [0,0,0,0];
    let lowerAce = false;
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
        lowerAce = true;
    }
    ranks.straight_flush = ranks.flush && ranks.straight;
    ranks.full_house = ranks.pair && ranks.trips;

    let rankIndex = 0;
    let rankDescription = "";
    Object.keys(ranks).every((key, index) => {     //to check if it works
        rankIndex = 10 - index;
        rankDescription = key;
        return !ranks[key];
    });
    let score = rankIndex*Math.pow(10, 13);
    let temp1=0, temp2=0;
    let TwoPairs = false;
    for(let n=0;n<cardNums.length;n++)
    {
        if(cardNums[n] >= 2){
            if(!TwoPairs){
                score+= (n+1)*Math.pow(10, 9)
                TwoPairs = true;
            }
            else{
                score += (n+1)*Math.pow(10, 11);
            }

        }

    }
    return score;
}
module.exports = Table;