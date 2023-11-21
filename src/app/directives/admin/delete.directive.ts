import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, FileUploadDialogState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private httpclient: HttpClientService,
    public dialog: MatDialog,
    private alertify: AlertifyService,
    private dialogservice: DialogService
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
    this.dialogservice.openDialog({
      componentType: DeleteDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
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
          (error: HttpErrorResponse) => {
            this.alertify.message("Silme işlemi sırasında bir hata oluştu", {
              dismissOther: true,
              messageType: MessageType.Error,
              position: Position.TopRight,
            });
          }
        );
      }
    });
  }
}
