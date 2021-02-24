//import class deck
const Deck = require('./Deck');
class Table{
    constructor(newTableObject){
        this.id = newTableObject.id;
        this.host = newTableObject.host;
        this.gameSettings = newTableObject.gameSettings;
        this.deck = new Deck()
    }
    addPlayer(playerObject){
        console.log(playerObject);

    }
}

module.exports = Table;
