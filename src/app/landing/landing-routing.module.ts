import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPage } from './landing.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: LandingPage,
    children: [
      {
        path: 'study',
        loadChildren: () => import('./study/study.module').then( m => m.StudyPageModule)
      },
      {
        path: 'exams',
        loadChildren: () => import('./exams/exams.module').then( m => m.ExamsPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/landing/tabs/study',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
