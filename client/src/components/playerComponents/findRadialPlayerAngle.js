import { tableWidth as W, tableHeight as H } from '../TableComponents/tableTop';

export default function findRadialPlayerAngle(x){
    let theta;
    if(Math.abs(x * W / 2) > ((W / 2) - (H / 2))){
        let adjacent = (Math.abs(x) * W / 2) + (H / 2) - (W / 2);
        let hyp = (H / 2);
        theta = Math.acos(adjacent / hyp);
    }
    return theta
}