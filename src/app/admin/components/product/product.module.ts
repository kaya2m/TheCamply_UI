import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
@NgModule({
  declarations: [
    ProductComponent,
    CreateComponent,
    ListComponent,
    DeleteDirective,
    DeleteDialogComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ProductComponent}
    ]),
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    FileUploadModule
  ]
})
export class ProductModule { }
