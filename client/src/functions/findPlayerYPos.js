import { tableWidth as W, tableHeight as H } from '../components/graphic/tableTop';
import findRadialPlayerAngle from './findRadialPlayerAngle';

export default function findPlayerYPos(x, placement){
    console.log(`findPosition! w: ${W}, h:${H}`);
    const angle = findRadialPlayerAngle(x);
    let alpha = (W / 2) - (H / 2);
    const spacing = 30;
    var spaceX = 0;
    var spaceY = 0;
    let y;
    if(Math.abs(x * W / 2) > alpha){
        if(x < 0) {
            spaceX = -1 * spacing * Math.cos(angle);
        } else if(x > 0){
            spaceX = spacing * Math.cos(angle);
        }
        if(placement < 0){
            spaceY = spacing * Math.sin(angle);
        } else if(placement > 0){
            spaceY = -1 * spacing * Math.sin(angle)
        }
        
        
        console.log(`x: ${x} is on the curve`);
        let r = H / 2;
        let opp = Math.abs(x * W / 2) + (H / 2) - (W / 2);
        let sqrt = Math.round(Math.pow(r, 2) - Math.pow(opp, 2));
        y = Math.sqrt(sqrt);
        console.log(`this is y: ${y}`);


         
        

    } else {
        console.log(`x: ${x} is not on the cuvre`);
        if(placement < 0){
            spaceY = spacing
        } else if(placement > 0){
            spaceY = -1 * spacing
        } else if(placement == 0){
            spaceY = 0;
        }
    }
    let xPos = x * (W / 2);
    xPos = xPos + spaceX;
    let yPos = y + spaceY;
    let object = [xPos, yPos];
    return object


}