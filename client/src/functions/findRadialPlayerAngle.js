import { tableWidth as W, tableHeight as H } from '../components/graphic/tableTop';

export default function findRadialPlayerAngle(x){
    let adjacent = (Math.abs(x) * W / 2) + (H / 2) - (W / 2);
    let hyp = (H / 2);
    let theta = Math.acos(adjacent / hyp);
    console.log(hyp);
    console.log(adjacent);
    console.log(theta); 
    return theta
}