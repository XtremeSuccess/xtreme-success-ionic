import { url } from './../../../server-config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getOrderDetails(amount: number) {
    return this.http.post(`${url}/orders`, {
      amount: amount
    });
  }
}
