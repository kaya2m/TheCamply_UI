import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_User } from '../../contracts/user/Create_User';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from 'src/app/entites/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClientService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClient.post<Create_User | User>(
      {
        controller: 'user'
      }, user
    );

    return await firstValueFrom(observable) as Create_User;
  }
}
