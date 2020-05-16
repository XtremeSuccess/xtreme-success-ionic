import { User } from './../../models/user/user';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginService implements CanActivate {

  constructor(
    private readonly storage: Storage
  ) { }

  canActivate(): boolean {
    this.storage.get('user').then((data: string) => {
      let user: User = JSON.parse(data);
      if (user.user_detail.subscription) {
        return true;
      } else {
        return false;
      }
    });
    return false;
  }
}
