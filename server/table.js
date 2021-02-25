//import class deck
const Deck = require('./Deck');
const CardValues = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];
const suitsEnum = Object.freeze({"spades":0, "clubs":1, "hearts":2, "diamonds":3});
class Table{

    CardsOnTable = [];

    constructor({ tableId, gameSettings, id }){
        this.id = tableId;
        this.host = id;
        this.gameSettings = gameSettings;
        this.deck = new Deck()
        this.players = [];
    }
    addPlayer(playerObject){
        console.log(playerObject);

    }
    SetHands(){
        for(let x=0;x<this.players.length; x++){
            this.players[x].bestHand = this.findBestHandTexasHoldEm(this.players[x].cardsInHand)[0];
        }
    }
    GetWinner(){
        let maxScore = 0, maxDesc, maxHand = [];
        let score = 0, desc, hand = [];
        let maxIndex;
        for(let x=0;x<this.players.length; x++) {
            [score, desc, hand] = this.findBestHandTexasHoldEm(this.players[x].cardsInHand);
            if(maxScore<score){
                maxIndex = x;
                maxScore = score;
                maxDesc = desc;
                maxHand = hand;
            }
        }
        return maxDesc, maxHand, this.players[maxIndex]; //only returns 1 winner, change for ties
    }

    findBestHandTexasHoldEm(holeCards){
        let board = this.CardsOnTable;
        const hands = [];
        hands.push(board);
        for (let c = 0; c < 2; c += 1) {
            for (let b = 0; b < 5; b += 1) {
                const newHand = [...board];
                newHand[b] = holeCards[c];
                hands.push(newHand);
            }
        }
        for (let b = 0; b < 4; b += 1) {
            for (let r = b + 1; r < 5; r += 1) {
                const newHand = [...board];
                newHand[b] = holeCards[0];
                newHand[r] = holeCards[1];
                hands.push(newHand);
            }
        }
        let maxScore=0;
        let maxDesc;
        let maxIndex;
        let score = 0;
        let desc;
        for(let k=0;k<hands.length;k++)
        {
            [score, desc] = GetScore(hands[k])
            if(maxScore<score)
            {
                maxScore = score;
                maxIndex = k;
                maxDesc = desc;
            }
        }
        return maxScore, maxDesc, hands[maxIndex];
    };

}
function GetScore(cards)
{
    let cardNums = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    let cardSorts = [0,0,0,0];
    let lowerAce = false;
    let i;
    for(i=0;i<cards.length;i++) {
        cardNums[cards[i].number-2]++;
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
    return score, rankDescription;
}



module.exports = Table;