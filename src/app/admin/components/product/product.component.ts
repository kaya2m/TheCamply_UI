import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Create_Product } from 'src/app/services/contracts/Create_Product';
import { ListComponent } from './list/list.component';

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
    
  
}
@ViewChild(ListComponent) listComponent : ListComponent;
createdProduct(createdProduct: Create_Product) {
this.listComponent.getProductList();
}
}
