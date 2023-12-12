import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
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


  constructor(private userService: UserService
    , spinner: NgxSpinnerService
    , private authService: AuthService
    , private activeRoute: ActivatedRoute
    , private router: Router,
    private socialAuthService: SocialAuthService) {
    super(spinner);
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.ballAtom);
      switch (user.provider) {
       
        case "GOOGLE":
          await this.userService.googleLogin(user);
          debugger

      this.activeRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"]
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        } else {
          this.router.navigate(["/"]);
        }
      });
          break;
        case "FACEBOOK":
          await this.userService.facebookLogin(user);
          console.log(user);
      this.activeRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"]
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        } else {
          this.router.navigate(["/"]);
        }
      });
      }
      this.authService.identitycheck();
      this.hideSpinner(SpinnerType.ballAtom);
    });

  }

  async login(UsernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.ballAtom);
    await this.userService.login(UsernameOrEmail, password, () => {
      this.authService.identitycheck();
      this.activeRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"]
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        }
        else {
          this.router.navigate(["/"]);
        }
      })
      this.hideSpinner(SpinnerType.ballAtom)
    });
  }
  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
    
}
