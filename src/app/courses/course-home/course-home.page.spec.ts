import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourseHomePage } from './course-home.page';

describe('CourseHomePage', () => {
  let component: CourseHomePage;
  let fixture: ComponentFixture<CourseHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
