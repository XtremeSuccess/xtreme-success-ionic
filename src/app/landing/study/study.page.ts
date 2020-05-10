import { NavController } from '@ionic/angular';
import { url as URL } from './../../../server-config';
import { Course } from './../../models/courses/course';
import { CourseService } from './../../services/course/course.service';
import { Storage } from '@ionic/storage';
import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../models/user/user';
import { Subject } from './../../models/subjects/subject';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-study',
  templateUrl: './study.page.html',
  styleUrls: ['./study.page.scss'],
})
export class StudyPage implements OnInit {
  user: User;
  subjects: Subject[];
  url: string = URL;

  constructor(
    private courseService: CourseService,
    private storage: Storage,
    private readonly navController: NavController
  ) { }

  ngOnInit() {
    this.storage.get('user').then((user: string) => {
      this.user = JSON.parse(user);
      this.user.created_at = new Date(this.user.created_at).toLocaleDateString();
      this.courseService.getSingleCourse(this.user.course.id).subscribe((course: Course) => {
        this.subjects = course.subjects;
      }, (error) => console.log(error));
    });
  }

  showChapters(id: number) {
    this.navController.navigateForward('/landing/tabs/study/chapters', { queryParams: { id: id } });
  }

}
