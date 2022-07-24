import { Component, OnInit,ViewChild,TemplateRef} from '@angular/core';
import {startOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { Observable, of, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarView} from 'angular-calendar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ReceiptService } from '../services/receipt.service';
import { Receipt } from '../Models/receipt';
import { Product } from '../Models/Product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  productForm!: FormGroup;
  receipt:Receipt = new Receipt();
  product!:Product;
  productsList:Product[]=[];
  productsNames:{}[]=[];
  editedProduct:Product = new Product();

  constructor(
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private receiptService:ReceiptService,
    private productService:ProductService,
    private router:Router,
    private datepipe: DatePipe) {
    
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({});
    this.getAllProducts();
    this.getAllReceipts();

  }

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }

    let newDate = this.datepipe.transform(date, 'yyyy-MM-dd')
     this.router.navigate(['/DayReceipts/'+newDate])
    
  }


  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    // this.events = [
    //   ...this.events,
    //   {
    //     title: 'New event',
    //     start: startOfDay(new Date()),
    //     end: endOfDay(new Date()),
    //     color: colors.red,
    //     draggable: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //   },
    // ];

    

  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

/////////////////////////////////////////////////repeated form ///////////////////////////////////

  model = {
    products: [],
     clientName:''
  };
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      className: 'col-sm-4',
      key: 'clientName',
      type: 'input',
      templateOptions: {
        label: 'اسم العميل',
        required: true,
      },
    },
    {
      key: 'products',
      type: 'repeat',
      templateOptions: {
        addText: 'اضف منتج',
      },
      
      fieldArray: {
        fieldGroup: [
          {
            className: 'col-sm-4',
            type: 'select',
            key: 'productName',
            templateOptions: {
              label: 'اسم المنتج',
              required: true,
              options: this.getProductsNames(),
              valueProp: 'value',
              labelProp: 'label',
            },
          },
          {
            className: 'col-sm-4',
            type: 'input',
            key: 'productCost',
            templateOptions: {
              label: 'سعر المنتج',
              required: true,
              type: 'number',
            },
          },
          {
            className: 'col-sm-4',
            type: 'input',
            key: 'productAmount',
            templateOptions: {
              label: 'كمية المنتج',
              required: true,
              type: 'number',
            },
          },
          
        ],
      },
    },
  ];

  submit() {
      this.receipt.clientName = this.model.clientName
       this.receipt.soldProducts = this.model.products
        this.receiptService.postReceipt(this.receipt).subscribe({
         next:() =>{

          let tempProduct:any ;
          this.model.products.forEach( (product:Product) =>{
             this.productsList.forEach( prod =>{
              if(prod.productName == product.productName){
                tempProduct = prod
              }
             })
          
            if(tempProduct){
            this.editedProduct = tempProduct;
            this.editedProduct.productAmount = tempProduct.productAmount - product.productAmount
            this.productService.editProduct(this.editedProduct).subscribe()
            }
            
          })
          this.productForm.reset();
          document.getElementById('close')?.click();
          
          this.getAllReceipts();
         }
        });
       

  }

  getAllProducts(){
     this.productService.getProductList().subscribe(
      (res:Product[])=>{
        res.forEach( product =>{
             this.productsNames.push({label: product.productName, value: product.productName})
           })
        this.productsList=res
        }
    )
  }

  getAllReceipts(){
    this.events = []
    this.receiptService.getReceiptList().subscribe((res:Receipt[])=>{

      res.forEach( receipt =>{
        this.events.push({
          start: new Date(receipt.dayDate)  ,
          title: receipt.clientName,
          color: colors.red,
          draggable: true,
        })
      })
    })
  }

  getProductsNames(): Observable<{}[]> {

    return of(this.productsNames);
}

}
