import { AuthGuardService } from './auth-guard.service';
import { NavController } from '@ionic/angular';
import { User } from './../../models/user/user';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginService implements CanActivate {

  constructor(
    private router: NavController,
    private authGuard: AuthGuardService
  ) { }

  canActivate(): boolean {
    if (this.authGuard.getAuthentication()) {
      this.router.navigateRoot(['/landing']);
      return false;
    }
    return true;
  }
}
