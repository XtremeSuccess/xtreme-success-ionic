import { SubscriptionService } from './../../services/subscription/subscription.service';
import { NavController } from '@ionic/angular';
import { url as URL } from './../../../server-config';
import { Course } from './../../models/courses/course';
import { CourseService } from './../../services/course/course.service';
import { Storage } from '@ionic/storage';
import { AuthService } from './../../services/auth/auth.service';
import { User, UserDetail } from './../../models/user/user';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription/subscription';

@Component({
  selector: 'app-study',
  templateUrl: './study.page.html',
  styleUrls: ['./study.page.scss'],
})
export class StudyPage implements OnInit {
  user: User;
  course: Course;
  url: string = URL;

  constructor(
    private subscriptionService: SubscriptionService,
    private courseService: CourseService,
    private storage: Storage,
    private readonly navController: NavController
  ) { }

  ngOnInit() {
    this.storage.get('user').then((user: string) => {
      this.user = JSON.parse(user);
      this.user.created_at = new Date(this.user.created_at).toLocaleDateString();
      this.subscriptionService.getSubscription(this.user.user_detail.subscription).subscribe(
        (subscription: Subscription) => {
          this.courseService.getSingleCourse(subscription.course.id).subscribe((data: Course) => {
            this.course = data;
          }, (e) => console.log(e));
        }, (error) => console.log(error)
      );
    });
  }

  showChapters(id: number) {
    this.navController.navigateForward('/landing/tabs/study/chapters', { queryParams: { id: id } });
  }

}
