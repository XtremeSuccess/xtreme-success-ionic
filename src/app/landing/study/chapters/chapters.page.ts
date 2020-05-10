import { Subject } from './../../../models/subjects/subject';
import { SubjectService } from './../../../services/subject/subject.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.page.html',
  styleUrls: ['./chapters.page.scss'],
})
export class ChaptersPage implements OnInit {
  id: number;
  subject: Subject;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"]
      this.getSubjectDetail(this.id);
    });
  }

  getSubjectDetail(id: number) {
    this.subjectService.getSubjectDetail(id).subscribe((data: Subject) => {
      this.subject = data;
    });
  }

  getChapterDetails(id: number) {
    this.navController.navigateForward('/landing/tabs/study/chapter-detail', { queryParams: { id: id } });
  }

  onBackButtonPressed() {
    this.navController.pop();
  }

}
