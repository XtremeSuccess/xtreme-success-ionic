import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCourses() {
    return this.http.get('http://192.168.2.4:1337/courses');
  }

  getSingleCourse(id: number) {
    return this.http.get(`http://192.168.2.4:1337/courses/${id}`)
  }
}
