import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr-service.service';
import { Position } from './services/admin/alertify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'CamplyUI';
  constructor(private toastrService:CustomToastrService) {
    toastrService.message('Hello world!', 'Toastr fun!', { messageType: ToastrMessageType.Success, position: ToastrPosition.BottomRight });
  }

}
