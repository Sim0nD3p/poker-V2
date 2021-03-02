import { tableWidth as W, tableHeight as H } from '../TableComponents/tableTop';
import findRadialPlayerAngle from './findRadialPlayerAngle';

export default function findPlayerPos(x, placement){
    let alpha = (W / 2) - (H / 2);
    let xPos, yPos, y;
    if(Math.abs(x * W / 2) > alpha){        
        let r = H / 2;
        let opp = Math.abs(x * W / 2) + (H / 2) - (W / 2);
        let sqrt = Math.round(Math.pow(r, 2) - Math.pow(opp, 2));
        y = Math.sqrt(sqrt);
    } else {
        y = (H / 2);
    }
    if(placement > 0){
        y = -1 * y;
    }

    xPos = x * (W / 2);
    yPos = y;
    let object = [xPos, yPos];
    return object


}