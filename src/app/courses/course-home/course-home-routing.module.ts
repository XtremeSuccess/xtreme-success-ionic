import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseHomePage } from './course-home.page';

const routes: Routes = [
  {
    path: '',
    component: CourseHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseHomePageRoutingModule {}
