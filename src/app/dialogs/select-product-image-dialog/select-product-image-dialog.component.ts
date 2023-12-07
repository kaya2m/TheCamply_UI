import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from 'rxjs';
import { SpinnerType } from '../../base/base.component';
import { DialogService } from '../../services/common/dialog.service';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
import { List_Product_Image } from 'src/app/services/contracts/List_Product_Image';

declare var $: any
@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit{

constructor( dialog : MatDialogRef<SelectProductImageDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: SelectProductImageDialogState|string,
  private productService:ProductService,
  private spinner: NgxSpinnerService,
  private dialogService:DialogService){
  super(dialog);
 
}

@Output() options:Partial<FileUploadOptions> = {
  accept:".png, .jpg, .jpeg, .gif",
  action:"upload",
  controller:"products",
  explanation:"Ürün resimlerini yüklemek için tıklayınız veya sürükleyiniz.",
  isAdminPage:true,
  queryString:"id="+this.data

}
images : List_Product_Image[];
async ngOnInit() {
  this.spinner.show(SpinnerType.ballAtom);
  this.images = await this.productService.readImage(this.data as string,
    ()=>this.spinner.hide(SpinnerType.ballAtom));
}
async deleteImage(imageId: string, event: any) {

  this.dialogService.openDialog({
    componentType: DeleteDialogComponent,
    data: DeleteState.Yes,
    afterClosed: async () => {
      this.spinner.show(SpinnerType.ballAtom)
      await this.productService.deleteImage(this.data as string, imageId, () => {
        this.spinner.hide(SpinnerType.ballAtom);
        var card = $(event.srcElement).parent().parent();
        card.fadeOut(500);
      });
    }
  })
}
}
export enum SelectProductImageDialogState{
 Close
}