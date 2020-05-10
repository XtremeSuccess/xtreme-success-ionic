import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudyPage } from './study.page';

const routes: Routes = [
  {
    path: '',
    component: StudyPage
  },
  {
    path: 'chapters',
    loadChildren: () => import('./chapters/chapters.module').then( m => m.ChaptersPageModule)
  },
  {
    path: 'chapter-detail',
    loadChildren: () => import('./chapter-detail/chapter-detail.module').then( m => m.ChapterDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyPageRoutingModule {}
