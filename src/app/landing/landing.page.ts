import { NavController } from '@ionic/angular';
import { User } from './../models/user/user';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  user: User;
  constructor(
    private readonly storage: Storage,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.storage.get('user').then((user: string) => {
      this.user = JSON.parse(user);
      if (!this.user.user_detail.subscription) {
        this.navController.navigateForward(['/landing/tabs/courses']);
      }
    });
  }

}
