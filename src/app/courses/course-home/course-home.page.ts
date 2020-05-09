import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.page.html',
  styleUrls: ['./course-home.page.scss'],
})
export class CourseHomePage implements OnInit {

  constructor(
    private readonly router: NavController
  ) { }

  ngOnInit() {
  }

  showCourseDetails() {
    this.router.navigateForward('/courses/main/detail', { queryParams: { id: 1 } });
  }

}
