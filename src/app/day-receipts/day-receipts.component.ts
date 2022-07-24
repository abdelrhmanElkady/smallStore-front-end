import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Receipt } from '../Models/receipt';
import { ReceiptService } from '../services/receipt.service';

@Component({
  selector: 'app-day-receipts',
  templateUrl: './day-receipts.component.html',
  styleUrls: ['./day-receipts.component.css']
})
export class DayReceiptsComponent implements OnInit {

  receipts:Receipt[] = [];
  constructor(private route:ActivatedRoute,private receiptService:ReceiptService,) { }

  ngOnInit(): void {
      let dayDate:any;
      dayDate = this.route.snapshot.paramMap.get('id')
    this.receiptService.getDayReceipts(dayDate).subscribe( res=>{
      this.receipts = res

      
    })
  }

}
