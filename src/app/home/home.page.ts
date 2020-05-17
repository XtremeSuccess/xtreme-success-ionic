import { Platform } from '@ionic/angular';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  backButtonSubscription: any;
  loginForm: FormGroup;
  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }

  submitLoginForm() {
    this.authService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe();
  }
}
