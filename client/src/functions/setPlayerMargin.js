import { tableHeight as H, tableWidth as W } from '../components/graphic/tableTop';
import findRadialPlayerAngle from './findRadialPlayerAngle';

export default function setPlayerMargin(x, placement){
    const spacing = 200;
    var spaceX = 0;
    var spaceY = 0;
    if (Math.abs(x * W / 2) > ((W / 2) - (H / 2))) {
        if(Math.abs(x) !== 1){

            const angle = findRadialPlayerAngle(x);
            console.log(`this is the angle ${angle}`);
            
            if (x < 0) {  //we go left so spacing is negative
                spaceX = -1 * spacing * Math.cos(angle);
            } else if (x > 0) {
                spaceX = spacing * Math.cos(angle);
            }
            if (placement < 0) {      //we go down spacing is positive
                spaceY = spacing * Math.sin(angle);
            } else if (placement > 0) {
                spaceY = -1 * spacing * Math.sin(angle);
            }
        } else if(Math.abs(x) == 1){
            spaceX = x * spacing;
        }
    } else{
        if(placement < 0){
            spaceY = 1 * spacing / 2;
        } else if(placement > 0){
            spaceY = -1 * spacing / 2;
        }
    }
        return [spaceX, spaceY]
}