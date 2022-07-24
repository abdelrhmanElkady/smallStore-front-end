import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '../Models/Product';

import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit,OnDestroy {

  productSubscribtion: Subscription = new Subscription;
  productsList:Product[]=[];
  productObj:Product = new Product();
  productForm!: FormGroup;
  editMode:boolean = false;

  constructor(private productService:ProductService,private formBuilder: FormBuilder) { }
  
  

  ngOnInit(): void {

    this.getAllProducts();

    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productCost: ['', Validators.required],
      productAmount: ['', Validators.required]
    });
  }

  getAllProducts(){
    this.productSubscribtion = this.productService.getProductList().subscribe({
      next:(res:Product[])=>{
        this.productsList=res
        
      }
    })
  }

  addProduct(){
    this.editMode = false;

    this.productObj.productName = this.productForm.value.productName;
    this.productObj.productCost = this.productForm.value.productCost;
    this.productObj.productAmount = this.productForm.value.productAmount;
    this.productService.postProduct(this.productObj).subscribe({
      next:()=>{
        this.getAllProducts();
      }
    }); 


    this.productForm.reset();
    document.getElementById('close')?.click();
  }

  onEdit(product:Product) {
    this.editMode = true;
    this.productObj.id = product.id;

    this.productForm.controls['productName'].setValue(product.productName);
    this.productForm.controls['productCost'].setValue(product.productCost);
    this.productForm.controls['productAmount'].setValue(product.productAmount);
  }

  EditProduct(){
    this.productObj.productName = this.productForm.value.productName;
    this.productObj.productCost = this.productForm.value.productCost;
    this.productObj.productAmount = this.productForm.value.productAmount;
   
    this.productService.editProduct(this.productObj).subscribe({
      next:()=>{
        this.editMode = false;
        this.productObj.id = 0;
        document.getElementById('close')?.click();
        this.productForm.reset();
        this.getAllProducts();
      }
    })
  }

  onDelete(product:Product){
    this.productService.deleteProdcut(product.id).subscribe({
      next:()=>{
        this.getAllProducts();
      }
    })
  }

  close() {
    this.editMode = false;
    this.productForm.reset();
  }

  ngOnDestroy(): void {
    this.productSubscribtion.unsubscribe();
  }

  
  

}
