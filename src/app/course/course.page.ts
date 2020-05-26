import { OrdersService } from './../services/orders/orders.service';
import { Order } from './../models/orders/order';
import { UserService } from './../services/user/user.service';
import { SubscriptionService } from './../services/subscription/subscription.service';
import { Storage } from '@ionic/storage';
import { User, UserDetail } from './../models/user/user';
import { Course } from './../models/courses/course';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course/course.service';
import { NavController, AlertController } from '@ionic/angular';

declare var RazorpayCheckout: any;

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {

  id: number;
  courseName: string = "";
  course: Course;
  user: User;

  purchased: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CourseService,
    private readonly storage: Storage,
    private readonly navController: NavController,
  ) { }

  ngOnInit() {
    this.storage.get('user').then(
      (user: string) => this.user = JSON.parse(user),
      (error: any) => console.log(error)
    );
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"]
      this.getCourseDetails(this.id)
    });
  }

  goToCheckout(courseId: number) {
    this.navController.navigateForward('/checkout', { queryParams: { id: courseId } });
  }

  getCourseDetails(id: number) {
    this.courseService.getSingleCourse(id).subscribe((data: any) => {
      this.course = data;
      this.courseName = data.name;
    });
  }

  backButtonClicked() {
    this.navController.pop()
  }


}
