import { User } from './../models/user/user';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from './../services/user/user.service';
import { SubscriptionService } from './../services/subscription/subscription.service';
import { OrdersService } from './../services/orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { Order } from '../models/orders/order';
import { Course } from '../models/courses/course';
import { UserDetail } from '../models/user/user';
import { error } from 'util';


declare var RazorpayCheckout: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  course: Course;
  user: User;
  courseIdParam: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CourseService,
    private readonly subscriptionService: SubscriptionService,
    private readonly userService: UserService,
    private readonly ordersService: OrdersService,
    private readonly storage: Storage,
    private readonly navController: NavController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.courseIdParam = params["id"];
      this.getCourseDetails(this.courseIdParam);
    }, (error: any) => console.log(error))
  }

  getCourseDetails(course_id: number) {
    this.courseService.getSingleCourse(course_id).subscribe(
      (course: Course) => {
        this.course = course;
      }, (error: any) => console.log(error)
    )
  }

  createOrder(course: Course) {
    this.ordersService.getOrderDetails(course.price).subscribe(
      (order: Order) => {
        this.payWithRazorpay(course, order);
      }
    );
  }

  razorpaySuccessHandler(response: any) {
    console.log(response);
    //TODO: Send the checksum to the server
  }

  addSubscription(payment_id) {
    let date: Date = new Date();
    let sub: any = {
      payment_id: payment_id,
      start_date: date.toISOString(),
      end_date: new Date(date.setFullYear(date.getFullYear() + this.course.duration)).toISOString(),
      course: this.course.id
    }
    this.subscriptionService.setSubscription(sub).subscribe((data: any) => {
      this.updateUserDetails(this.user.user_detail.id, { subscription: data.id });
    });
  }

  payWithRazorpay(course: Course, order: Order) {
    var options = {
      description: `Subscribe to ${course.name}`,
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: order.currency,
      key: "rzp_test_FFexwWi4LsHnuc", // your Key Id from Razorpay dashboard
      amount: order.amount,
      order_id: order.id,
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

    var cancelCallback = function (error) {
      let msg: string = error.description + ' (Error ' + error.code + ')'
      showAlert('Payment Failed', msg);
    };
    RazorpayCheckout.on('payment.success', this.razorpaySuccessHandler);
    RazorpayCheckout.on('payment.cancel', cancelCallback);
    RazorpayCheckout.open(options);
  }

  updateUserDetails(id: number, data: any) {
    this.userService.updateUserDetails(id, data).subscribe((userDetail: UserDetail) => {
      this.user.user_detail.subscription = data.subscription;
      this.storage.remove('user');
      this.storage.set('user', JSON.stringify(this.user)).then(() => {
        window.location.replace(window.location.origin);
      });
    });
  }

}
