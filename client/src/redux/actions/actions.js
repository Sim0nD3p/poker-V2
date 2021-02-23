import { ADD_PLAYER, UPDATE_PLAYERS } from '../constants/action-types';

export function addPlayer(playerObject){
    return {
        type: ADD_PLAYER,
        playerObject
    }
}
export function updatePlayers(players){
    return {
        type: UPDATE_PLAYERS,
        players
    }
}