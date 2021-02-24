class Deck{

    suits = ["spades", "clubs", "hearts", "diamonds"];
    cards = [];

    constructor(){
        let i;
        let j;
        for(i=2; i<15; i++)
        {
            for(j=0;j<this.suits.length;j++)
            {
                this.cards.push(new Card(i+1, this.suits[j]));
            }
        }
        shuffle(this.cards)

    }

    GetNextCard()
    {
        return this.cards.pop();
    }

}
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}