import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-study',
  templateUrl: './study.page.html',
  styleUrls: ['./study.page.scss'],
})
export class StudyPage implements OnInit {
  subjects: string[] = [
    'Bengali',
    'English',
    'Physical Science',
    'Life Science',
    'Mathematics',
    'History',
    'Geography'
  ];
  constructor() { }

  ngOnInit() {
  }

}
