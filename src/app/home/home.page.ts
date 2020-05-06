import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string = "";
  password: string = "";
  constructor(private router: Router) {}

  submitLoginForm() {
    this.router.navigateByUrl('landing');
  }
}
