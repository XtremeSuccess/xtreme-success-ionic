import { url } from './../../../server-config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private readonly http: HttpClient) { }

  getSubscription(id: number) {
    return this.http.get(`${url}/subscriptions/${id}`);
  }

  setSubscription(data: any) {
    return this.http.post(`${url}/subscriptions`, data);
  }
}
