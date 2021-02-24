class Table{
    constructor(tableObject){
        this.id = tableObject.id;
        this.host = tableObject.host;
        this.gameSettings = tableObject.gameSettings;
        //this.deck = new Deck()
    }
    addPlayer(playerObject){
        console.log(playerObject);

    }
}

export default Table
