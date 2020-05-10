import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/server-config';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCourses() {
    return this.http.get(`${url}`);
  }

  getSingleCourse(id: number) {
    return this.http.get(`${url}/courses/${id}`)
  }
}
