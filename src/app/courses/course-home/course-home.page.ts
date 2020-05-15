import { CourseService } from './../../services/course/course.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.page.html',
  styleUrls: ['./course-home.page.scss'],
})
export class CourseHomePage implements OnInit {

  courses: any;

  constructor(
    private readonly router: NavController,
    private readonly courseService: CourseService
  ) { }

  ngOnInit() {
    console.log('courses home module')
    this.courseService.getAllCourses().subscribe((data: any) => {
      this.courses = data;
    });

  }

  showCourseDetails(id: number) {
    this.router.navigateForward('/courses/main/detail', { queryParams: { id: id } });
  }

}
