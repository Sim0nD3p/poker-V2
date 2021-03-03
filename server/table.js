//import class deck
const Deck = require('./Deck');
const CardValues = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];
const suitsEnum = Object.freeze({ "spades": 0, "clubs": 1, "hearts": 2, "diamonds": 3 });

class Table {

    CardsOnTable = [];
    deck;
    totalPot = 0;
    currentPot = 0;
    playerPlaying = 0;
    maxBet = 0;
    raiseIndex=0;
    bigBlindIndex = 0;
    smallBlindIndex = 0;
    dealerIndex = 0;
    smallBlindValue = 0;

    /*
    const defaultSettings = {
    gameMode: 'drink', //drink, cash
    timer: null,  //whatever timer
    defaultBuyIn: 100,
    }
    */

    constructor( tableId, gameSettings, id ) {
        this.id = tableId;
        this.host = id;
        this.gameSettings = gameSettings;
        this.deck = new Deck()
        this.players = [];
        this.disconnectedPlayers = [];
        this.playerPlaying = 0;
    }

    addPlayer(playerObject) {
        console.log(playerObject);

    }

    AddCardToFlop() {
        if (this.CardsOnTable.length === 0) {
            this.deck.pop();
            this.CardsOnTable.push(this.deck.pop());
            this.CardsOnTable.push(this.deck.pop());
            this.CardsOnTable.push(this.deck.pop());
        }
        else if (this.CardsOnTable.length === 3 || this.CardsOnTable.length === 4) {
            this.deck.pop();
            this.CardsOnTable.push(this.deck.pop());
        }
        else {
            // METHOD FOR END OF GAME
            let [winnersIndex, winners] = this.GetWinnersIndex();
            let potTaken = 0;
            let egalite = false;
            let egaliteNumber = 0;
            for (let y = 0; y < this.players.length; y++) {

                //get number of equality
                let numberOfEquality = 0;
                let i = y + 1;
                while (i < this.players.length) {
                    if (this.players[winnersIndex[i]].bestHandScore === this.players[winnersIndex[y]].bestHandScore) {
                        numberOfEquality++;
                    }
                    else
                        break;
                    i++;
                }

                //assign money
                if (this.totalPot === potTaken) {
                    break;
                }
                else if (this.players[winnersIndex[y]].maxPot * (numberOfEquality + 1) <= this.totalPot - potTaken) {

                    for (let j = y; j < y + 1 + numberOfEquality; j++) {
                        this.players[winnersIndex[j]].balance += this.players[winnersIndex[j]].maxPot;
                        potTaken += this.players[winnersIndex[j]].maxPot;
                    }

                }
                else {
                    for (let j = y; j < y + 1 + numberOfEquality; j++) {
                        this.players[winnersIndex[j]].balance += (this.totalPot - potTaken) / (1 + numberOfEquality);
                    }
                    potTaken = this.totalPot;
                }
                y += numberOfEquality;
            }
            this.NewRound();
        }
    }
    Flop(){
            if(raiseIndex === this.playerPlaying){
                AddCardToFlop();
            }
            else{
                this.NextTurn();
            }

    }
    StartGame(){
        if(this.players.length <2)
            return;
        else if(this.players.length === 2){
            this.dealerIndex = 0;
            this.smallBlindIndex = 1;
            this.bigBlindIndex = 0;
        }
        else{
            this.dealerIndex = 0;
            this.smallBlindIndex = 1;
            this.bigBlindIndex = 2;
        }
    }

    NewRound() {
        this.deck = new Deck();
        this.players.forEach(Reset);
        for(let i = 0;i<this.players.length; i++){
            this.players[i].assignCards(this.deck.GetNextCard(), this.deck.GetNextCard());
        }
        if(this.players.length===1) {
            //END GAME
            return;
        }

        //Checks if number of players increased from 2
        if(this.players.length>2 && this.dealerIndex === this.bigBlindIndex){
            this.bigBlindIndex = this.PassOn(this.smallBlindIndex);
        }

        //Passes on Dealer BB and SB
        if(this.players.length===2){
            this.smallBlindIndex = this.PassOn(this.smallBlindIndex);
            this.dealerIndex = this.PassOn(this.dealerIndex);
            this.bigBlindIndex =  this.dealerIndex;
        }
        else{
            this.smallBlindIndex = this.PassOn(this.smallBlindIndex);
            this.dealerIndex = this.PassOn(this.dealerIndex);
            this.bigBlindIndex =  this.PassOn(this.bigBlindIndex);
        }

        this.playerPlaying = this.smallBlindIndex;
        this.Raise(this.smallBlindValue);
        this.playerPlaying = this.bigBlindIndex;
        this.Raise(this.smallBlindValue*2);
        this.playerPlaying = this.PassOn(this.bigBlindIndex);
        this.raiseIndex = this.playerPlaying;

    }
    NextTurn() {
        this.playerPlaying = this.PassOn(this.playerPlaying);
        if(this.playerPlaying === this.raiseIndex){
            this.AddCardToFlop();
        }
    }
    PassOn(element){
        if (element < this.players.length - 1) {
            element++;
        }
        else {
            element = 0;
        }
    }

    Check() {

    }
    Fold() {
        this.players[this.playerPlaying].isPlaying = false;
    }
    Raise(raise) {
        console.log(this.playerPlaying);
        console.log(this.players);
        if (this.players[this.playerPlaying].balance >= raise) {
            this.currentPot = this.currentPot + raise;
            this.players[this.playerPlaying].balance = this.players[this.playerPlaying].balance - raise;
            this.players[this.playerPlaying].currentBet += raise;
            this.players[this.playerPlaying].totalBet += raise;
            if(this.players[this.playerPlaying].currentBet>this.maxBet){
                this.maxBet = raise;
            }
            
        }
        else {
            this.currentPot = this.currentPot + this.players[this.playerPlaying].balance;
            this.players[this.playerPlaying].currentBet += this.players[this.playerPlaying].balance;
            this.players[this.playerPlaying].totalBet += this.players[this.playerPlaying].balance;
            this.players[this.playerPlaying].balance = 0;
        }
    }

    Call() {
        if (this.maxBet === 0) { 
            this.Check();
        }
        else{
            this.Raise(this.maxBet-this.players[this.playerPlaying].currentBet);
        }
    }

    BuyIn(playerName,buyIn){
        for(let i; i<this.players.length;i++){
            if(this.players[i].name===playerName){
                this.players[i].balance += buyIn;
            }
        }
    
     }

    SetHands() {
        let score = 0, desc, hand = [];
        for (let x = 0; x < this.players.length; x++) {
            [score, desc, hand] = this.FindBestHandTexasHoldEm(this.players[x].cardsInHand);
            this.players[x].bestHand = hand;
            this.players[x].bestHandDesc = desc;
            this.players[x].bestHandScore = score;
        }
    }

    GetWinnersIndex() {
        this.SetHands()
        let winners = this.players;
        winners.sort(function (a, b) { return b.bestHandScore - a.bestHandScore })
        let indexArray = [];
        for (let x = 0; x < winners.length; x++) {
            for (let y = 0; y < this.players; y++) {
                if (winners[x].id === this.players[y].id) {
                    indexArray.push(y);
                }
            }
        }

        return [indexArray, winners];
    }

    FindBestHandTexasHoldEm(holeCards) {
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
        let maxScore = 0;
        let maxDesc;
        let maxIndex;
        let score = 0;
        let desc;
        for (let k = 0; k < hands.length; k++) {
            [score, desc] = GetScore(hands[k])
            if (maxScore < score) {
                maxScore = score;
                maxIndex = k;
                maxDesc = desc;
            }
        }
        return [maxScore, maxDesc, hands[maxIndex]];
    };

    GetClientPlayersArray() {
        let array = [];
        for (let x = 0; x < this.players.length; x++) {
            array.push({
                name: this.players[x].name,
                id: this.players[x].id,
                balance: this.players[x].balance,
                isTurn: (x === this.playerPlaying),
                isHost: (x === 0),
                isBB: (x === this.bigBlindIndex),
                isSB: (x === this.smallBlindIndex),
                isDealer: (x === this.smallBlindIndex)
            });
        }
        return array;
    }
    GetIndexOfPlayerWithId(id) {

        for (let x = 0; x < this.players.length; x++) {
            if (this.players[x].id === id) {
                return x;
            }
        }
        return -1;
    }


}
function Reset(player) {
    player.cardsInHand = [];
    player.bestHand = [];
    player.bestHandDesc = "";
    player.bestHandScore = 0;
    player.isPlaying = true;

}

function GetScore(cards) {
    let score = 0;
    let cardNums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let cardSorts = [0, 0, 0, 0];
    let lowerAce = false;
    let i;
    for (i = 0; i < cards.length; i++) {
        cardNums[cards[i].number - 2]++;
        cardSorts[cards[i].suit]++;
        score += CardValues[cards[i].number - 2];
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
    for (k = 0; k + 4 < 13; k++) {
        if (cardNums[k] === 1 && cardNums[k + 1] === 1 && cardNums[k + 2] === 1 && cardNums[k + 3] === 1 && cardNums[k + 4] === 1) {
            ranks.straight = true;
            break;
        }
    }
    if (cardNums[0] === 1 && cardNums[1] === 1 && cardNums[2] === 1 && cardNums[3] === 1 && cardNums[12] === 1) {
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

    score += rankIndex * Math.pow(10, 13);
    let temp1 = 0, temp2 = 0;
    let TwoPairs = false;
    for (let n = 0; n < cardNums.length; n++) {

        if (cardNums[n] >= 3) {
            score += (n + 1) * Math.pow(10, 11);
        }
        if (cardNums[n] === 2) {
            if (!TwoPairs) {
                score += (n + 1) * Math.pow(10, 9)
                TwoPairs = true;
            }
            else {
                score += (n + 1) * Math.pow(10, 11);
            }

        }

    }
    return [score, rankDescription];
}

module.exports = Table;