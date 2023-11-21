import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { LayoutModule } from './layout/layout.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule
    
  ],
  exports: [
    LayoutModule,
    MatDialogModule
  ]
 
})
export class AdminModule { }
