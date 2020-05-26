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

  getOrderDetails(amount: number, course: number) {
    return this.http.post(`${url}/orders`, {
      amount: amount,
      course: course
    });
  }

  verifyOrder(orderVerifyData: any) {
    return this.http.post(`${url}/orders/verify`, orderVerifyData);
  }

  getOrdersByParams(data: any) {
    return this.http.get(`${url}/orders`, { params: data });
  }

  getSingleOrder(orderId: number) {
    return this.http.get(`${url}/orders/${orderId}`);
  }
}
