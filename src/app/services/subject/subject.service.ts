import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from 'src/server-config';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjectDetail(id: number) {
    return this.http.get(`${url}/subjects/${id}`);
  }

  getSingleChapter(id: number) {
    return this.http.get(`${url}/chapters/${id}`);
  }
}
