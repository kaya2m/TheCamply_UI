import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ProductModule,
    CustomerModule,
    OrderModule
  ]
})
export class ComponentsModule { }
