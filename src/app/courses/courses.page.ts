import { CourseService } from './../services/course/course.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonNav } from '@ionic/angular';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  constructor(
  ) { }

  ngOnInit() {
    console.log('Courses module loaded');
  }

}
