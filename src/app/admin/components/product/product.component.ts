import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  extends BaseComponent  implements OnInit{

  constructor(spinner : NgxSpinnerService, private httpClient : HttpClientService) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballAtom);
    this.httpClient.get({controller:"products"})
    .subscribe(data=>console.log(data));

  //  this.httpClient.post({
  //   controller:"products"
  // },{
  //   name:"PAsta Süsü",
  //   price:100,
  //   stock:100
  // }).subscribe();
 
  this.httpClient.put({
    controller:"products",
  },{
    id:"0af14641-f0e3-4c99-ab4b-ed20b3dfcfaa",
    name:"Çilek",
    price:100,
    stock:100
  }).subscribe();
}}
