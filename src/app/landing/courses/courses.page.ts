import { Course } from './../../models/courses/course';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CourseService } from 'src/app/services/course/course.service';

declare var RazorpayCheckout: any;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  key: string = "rzp_test_FFexwWi4LsHnuc";
  courses: Course[];

  constructor(
    private readonly router: NavController,
    private readonly courseService: CourseService
  ) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  showCourseDetails(id: number) {
    this.router.navigateForward('/courses/main/detail', { queryParams: { id: id } });
  }

  payWithRazorpay(course: Course) {
    var options = {
      description: 'Subscribe to a Course',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: "INR",
      key: "rzp_test_1DP5mmOlF5G5ag", // your Key Id from Razorpay dashboard
      amount: course.price * 100,
      name: course.name,
      prefill: {
        email: 'test@razorpay.com',
        contact: '9990009991',
        name: 'Razorpay'
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function () {
          alert('dismissed')
        }
      }
    };
    var successCallback = function (payment_id) {
      alert('payment_id: ' + payment_id);
    };

    var cancelCallback = function (error) {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
}
