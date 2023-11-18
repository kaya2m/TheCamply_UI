import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Products } from 'src/app/services/contracts/List_Products';
declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {


constructor(private productService:ProductService, spinner : NgxSpinnerService, private alertifyService: AlertifyService) 
{ 
  super(spinner);
 }
 
 displayedColumns: string[] = ['name', 'price', 'stock', 'updatedDate', 'createDate','edit','delete'];
 
 dataSource : MatTableDataSource<List_Products>= null;

 @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;

 async getProductList(){
  this.showSpinner(SpinnerType.squareJellyBox);

  const allProducts: {totalCount:number,products:List_Products[]} = await this.productService.read(this.paginator? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
    () => this.hideSpinner(SpinnerType.squareJellyBox),
    errorMessage => this.alertifyService.message(errorMessage, {
      dismissOther: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    })
  );

  this.dataSource = new MatTableDataSource<List_Products>(allProducts.products);
  this.paginator.length = allProducts.totalCount;

 }
 async pageChanged(){
  await this.getProductList();
 }

//  delete(id: string,event ) {
//  const img :  HTMLImageElement = event.srcElement;
//  $(img.parentElement.parentElement).fadeOut(500);
//   }
 async ngOnInit() {
await this.getProductList();
}

}


