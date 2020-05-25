import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService) { }

  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }

  getAuthentication(): boolean {
    return this.auth.isAuthenticated();
  }
}
