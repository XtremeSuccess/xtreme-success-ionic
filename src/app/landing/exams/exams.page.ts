import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.page.html',
  styleUrls: ['./exams.page.scss'],
})
export class ExamsPage implements OnInit {
  today: string = new Date().toLocaleDateString();
  constructor() { }

  ngOnInit() {
  }

}
