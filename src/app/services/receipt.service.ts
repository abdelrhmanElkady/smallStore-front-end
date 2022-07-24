import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receipt } from '../Models/receipt';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private readonly url:string = 'https://small-store.herokuapp.com/api/Receipts';
  constructor(private http: HttpClient) { }

  getReceiptList(){
    return this.http.get<Receipt[]>(this.url);
  }

  postReceipt(receipt:Receipt){
    return this.http.post(this.url,receipt);
  }

  getDayReceipts(dayDate:Date){
    return this.http.get<Receipt[]>(this.url+"/day/"+dayDate);
  }
}

