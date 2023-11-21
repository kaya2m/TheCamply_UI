import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private httpclient: HttpClientService,
    public dialog: MatDialog,
    private alertify : AlertifyService
  ) {

    const img = _renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/delete.png');
    img.setAttribute("style", "width:20px; height:20px; cursor:pointer; margin-left:10px; margin-top:5px;");
    _renderer.appendChild(element.nativeElement, img);

  }

  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();
@Input() controller: string;

  @HostListener('click')
  async onClick() {
    this.openDialog(async () => {
      const td: HTMLTableCellElement = this.element.nativeElement;
      this.httpclient.delete({ controller: this.controller }, this.id).subscribe(
        (data) => {
          $(td.parentElement).animate({
            opacity: 0,
            left: "+=50",
            height: "toggle",
            width: "toggle",
          }, 700, () => {
            this.callback.emit();
            this.alertify.message("Silme işlemi başarılı", {
              dismissOther: true,
              messageType: MessageType.Success,
              position: Position.TopRight,
            });
          });
        },
        (error : HttpErrorResponse) => {
          this.alertify.message("Silme işlemi sırasında bir hata oluştu", {
            dismissOther: true,
            messageType: MessageType.Error,
            position: Position.TopRight,
          });
        }
      );
    });
  }
  

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
