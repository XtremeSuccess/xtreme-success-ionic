import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesPage } from './courses.page';

const routes: Routes = [
  {
    path: 'main',
    component: CoursesPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./course-home/course-home.module').then(m => m.CourseHomePageModule)
      },
      {
        path: 'detail',
        loadChildren: () => import('./course-detail/course-detail.module').then(m => m.CourseDetailPageModule)
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/courses/main/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesPageRoutingModule { }
