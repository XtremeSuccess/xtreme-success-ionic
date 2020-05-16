import { Course } from './../../models/courses/course';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CourseService } from 'src/app/services/course/course.service';

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
    this.router.navigateForward('/course', { queryParams: { id: id } });
  }
}
