import { ADD_PLAYER, UPDATE_PLAYERS } from '../constants/action-types';

const initialState = {
    players: [],

}


export default function rootReducer(state = initialState, action){
    switch(action.type){
        case ADD_PLAYER: {
            let players = [];
            players.push(action.playerObject)
            return {
                ...state,
                players: {
                    players
                }
            }
        }
        case UPDATE_PLAYERS: {
            return {
                ...state,
                players: action.players
            }
        }
        default: return state
    }
}