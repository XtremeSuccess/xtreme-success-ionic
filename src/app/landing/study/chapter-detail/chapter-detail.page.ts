import { Chapter } from './../../../models/chapters/chapter';
import { SubjectService } from './../../../services/subject/subject.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.page.html',
  styleUrls: ['./chapter-detail.page.scss'],
})
export class ChapterDetailPage implements OnInit {
  id: number;
  chapter: Chapter;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly navController: NavController,
    private readonly subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"]
      this.getChapterDetails(this.id);
    });
  }

  getChapterDetails(id: number) {
    this.subjectService.getSingleChapter(id).subscribe((data: Chapter) => {
      this.chapter = data;
      console.log(this.chapter.chapter_details.text)
    });
  }

  onBackButtonPressed() {
    this.navController.pop();
  }
}
