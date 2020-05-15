import { Storage } from '@ionic/storage';
import { User } from './../models/user/user';
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

  getCourseDetails(id: number) {
    this.courseService.getSingleCourse(id).subscribe((data: any) => {
      this.course = data;
      this.courseName = data.name;
      console.log(data);
    })
  }

  backButtonClicked() {
    this.navController.pop()
  }

  payWithRazorpay(course: Course) {
    var options = {
      description: `Subscribe to ${course.name}`,
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: "INR",
      key: "rzp_test_1DP5mmOlF5G5ag", // your Key Id from Razorpay dashboard
      amount: course.price * 100,
      name: course.name,
      prefill: {
        email: this.user.email,
        contact: this.user.user_detail.mobile_number,
        name: `${this.user.user_detail.firstname} ${this.user.user_detail.lastname}`
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function () {
          showAlert('Payment Error', 'Payment Dismissed')
        }
      }
    };

    var showAlert = (header: string, message: string) => {
      let alert: AlertController = new AlertController();
      alert.create({
        message: message,
        header: header,
        buttons: ['OK']
      }).then(alert => alert.present());
    }

    var successCallback = function (payment_id) {
      showAlert('Success', 'payment_id: ' + payment_id);
    };

    var cancelCallback = function (error) {
      let msg: string = error.description + ' (Error ' + error.code + ')'
      showAlert('Payment Failed', msg);
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
}
