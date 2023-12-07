import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import {MatDialog} from '@angular/material/dialog';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    ProductComponent,
    CreateComponent,
    ListComponent,
    DeleteDirective

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ProductComponent}
    ]),
    MatTableModule,
    MatPaginatorModule,
    DialogModule,
    FileUploadModule,
    NgxSpinnerModule
  ]
})
export class ProductModule { }
