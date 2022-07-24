import { Product } from "./Product";

export class Receipt {
    id: number=0;
    soldProducts:Product[]=[];
    clientName:string='';
    dayDate:Date = new Date(); 
}
