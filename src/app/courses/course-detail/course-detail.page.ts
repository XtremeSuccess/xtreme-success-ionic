import { NavController } from '@ionic/angular';
import { CourseService } from './../../services/course/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {
  id: number;
  courseName: string = "";
  course: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CourseService,
    private readonly navController: NavController
  ) { }

  ngOnInit() {
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

}
