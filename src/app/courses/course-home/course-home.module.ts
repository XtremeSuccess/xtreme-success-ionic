import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseHomePageRoutingModule } from './course-home-routing.module';

import { CourseHomePage } from './course-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseHomePageRoutingModule
  ],
  declarations: [CourseHomePage]
})
export class CourseHomePageModule {}
