import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
declare var alertify: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

constructor(private alertify: AlertifyService, spinner : NgxSpinnerService) {
  super(spinner);
}
  ngOnInit() {
this.alertify.message("Welcome to Camply Dashboard",{messageType:MessageType.Success,
  position:Position.TopCenter,
  delay:3,
  dismissOther:true});
  this.showSpinner(SpinnerType.ballAtom);
  }
  
}
