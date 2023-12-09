import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_User } from '../../contracts/user/Create_User';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from 'src/app/entites/User';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr-service.service';
import { Token } from '../../contracts/token/Token';
import { TokenResponse } from '../../contracts/token/TokenResponse';

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
}
