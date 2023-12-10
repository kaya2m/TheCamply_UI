import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr-service.service';
import { MessageType } from './services/admin/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{


  constructor(public authService: AuthService, 
    private toastr:CustomToastrService,
    private router:Router) {
    authService.identitycheck();
  }
  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identitycheck();
    this.router.navigate(["/"]);
    this.toastr.message("Başarıyla çıkış yaptınız.","Oturum Kapatıldı",{
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.TopRight
    });
    }
}
