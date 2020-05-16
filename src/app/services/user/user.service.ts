import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/server-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getMyself() {
    return this.http.get(`${url}/users/me`);
  }

  getUser(id: number) {
    return this.http.get(`${url}/users/${id}`);
  }

  setUserDetails(data: any) {
    return this.http.post(`${url}/user-details`, {
      firstname: data.firstname,
      lastname: data.lastname,
      parent_name: data.parent_name,
      school_name: data.school_name,
      address: data.address,
      mobile_number: data.mobile_number,
    });
  }
}
