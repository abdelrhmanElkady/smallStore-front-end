import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/Product';




@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly url:string = 'https://small-store.herokuapp.com/api/Products';
  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get<Product[]>(this.url);
  }

  postProduct(productObj:Product){
    return this.http.post(this.url,productObj);
  }

  deleteProdcut(productId:number){
    return this.http.delete(`${this.url}/${productId}`)
  }

  editProduct(product:Product){
    return this.http.put(`${this.url}/${product.id}`,product)
  }
}
