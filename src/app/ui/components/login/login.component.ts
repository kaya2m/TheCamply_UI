import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
constructor(private userService:UserService
  ,spinner :NgxSpinnerService
  , private authService : AuthService
  ,private activeRoute:ActivatedRoute
  ,private router:Router) { 
super(spinner);
}

async login(UsernameOrEmail: string,password: string) {
this.showSpinner(SpinnerType.ballAtom);
  await this.userService.login(UsernameOrEmail,password,()=>{
    this.authService.identitycheck();
    this.activeRoute.queryParams.subscribe(params => {
      const returnUrl:string= params["returnUrl"]
      if(returnUrl){
        this.router.navigate([returnUrl]);
      }
      else{
        this.router.navigate(["/"]);
      }
    })
    this.hideSpinner(SpinnerType.ballAtom)});
  }
}
