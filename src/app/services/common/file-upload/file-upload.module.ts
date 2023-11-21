import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    DialogModule,
    
  ],
  exports: [
    FileUploadComponent
  ] 
})
export class FileUploadModule { }
