import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_User } from '../../contracts/user/Create_User';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from 'src/app/entites/User';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr-service.service';
import { TokenResponse } from '../../contracts/token/TokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClientService,
    private toastrService:CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClient.post<Create_User | User>(
      {
        controller: 'user'
      }, user
    );

    return await firstValueFrom(observable) as Create_User;
  }
  async login(UsernameOrEmail: string, password: string, callBackFunction?:()=>void): Promise<void> {
    const observable: Observable<any | TokenResponse> = this.httpClient.post<any | TokenResponse>(
      {
        controller: 'user',
        action: 'login'
      }, { UsernameOrEmail, password }
    );
    const tokenResponse : TokenResponse= await firstValueFrom(observable) as TokenResponse;
    console.log(tokenResponse.token.accessToken);  
    if(tokenResponse){
        localStorage.setItem("accessToken",tokenResponse.token.accessToken);

        this.toastrService.message("Giriş başarıyla sağlanmıştır", "Giriş Başarılı",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
          });
      }
      
    callBackFunction();
  }
  async googleLogin(user:SocialUser,callBackFunction?:()=>void): Promise<void> {
     const observable : Observable<SocialUser|TokenResponse>=   this.httpClient.post<SocialUser|TokenResponse>({
        action: "google-login",
        controller: "User"
      },user);
      debugger
      const tokenResponse : TokenResponse= await firstValueFrom(observable) as TokenResponse;
      if(tokenResponse){
        localStorage.setItem("accessToken",tokenResponse.token.accessToken);
        this.toastrService.message("Giriş başarıyla sağlanmıştır (Google_Login)", "Giriş Başarılı",{
            messageType:ToastrMessageType.Success,
            position:ToastrPosition.TopRight
            });
      }
      
  }

  async facebookLogin(user:SocialUser,callBackFunction?:()=>void): Promise<void> {
    const observable : Observable<SocialUser|TokenResponse> = this.httpClient.post<SocialUser|TokenResponse>({
      action: "facebook-login",
      controller: "User"
    },user);

    const tokenResponse : TokenResponse= await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      this.toastrService.message("Giriş başarıyla sağlanmıştır (Facebook_Login)", "Giriş Başarılı",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
          });
    }
  }
}
