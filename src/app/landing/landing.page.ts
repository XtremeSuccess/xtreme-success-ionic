import { NavController, Platform } from '@ionic/angular';
import { User } from './../models/user/user';
import { Storage } from '@ionic/storage';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit, OnDestroy, AfterViewInit {
  user: User;
  backButtonSubscription: any;
  constructor(
    private readonly platform: Platform,
    private readonly storage: Storage,
    private readonly navController: NavController
  ) { }

  ngOnInit() {
    this.storage.get('user').then((user: string) => {
      this.user = JSON.parse(user);
      if (!this.user.user_detail.subscription) {
        this.navController.navigateForward(['/landing/tabs/courses']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(1, () => {
      navigator['app'].exitApp();
    });
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }

}
