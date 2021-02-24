import React from "react";
import {Container, Paper, Typography} from "@material-ui/core";

class Player{

    name = "Nameless Player";
    id;
    card1;
    card2;
    hand = [];
    handType;

    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    assignCards(card1, card2) {
        this.card1 = card1;
        this.card2 = card2;

    }

    updateHand()
    {

    }
    isRoyalFlush()
    {

    }

}