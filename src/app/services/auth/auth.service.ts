import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { url } from './../../../server-config';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);
  user = null;


  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController
  ) {
    this.plt.ready().then(() => {
      this.checkToken()
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    })
  }

  register(username: string, email: string, password: string) {
    return this.http.post(`${url}/auth/local/register`, {
      username: username,
      email: email,
      password: password
    });
  }

  login(email: string, password: string) {
    return this.http.post(`${url}/auth/local`, {
      identifier: email,
      password: password
    }).pipe(
      tap(res => {
        this.storage.set(TOKEN_KEY, res['jwt']);
        this.user = this.helper.decodeToken(res['jwt']);
        this.authenticationState.next(true);
      }),
      catchError(e => {
        this.showAlert('Invalid email or password');
        console.log(e);
        throw new Error(e);
      })
    );
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
