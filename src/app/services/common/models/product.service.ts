import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/Create_Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClientService)
  {

  }
  create(product: Create_Product, successCallBack: any) {
    this.httpClient.post({
      controller: "products"
    }, product)
      .subscribe(result => {
        successCallBack();
      });
  }
}
