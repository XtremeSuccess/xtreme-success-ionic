import { NavController, AlertController } from '@ionic/angular';
import { User } from './../../models/user/user';
import { Storage } from '@ionic/storage';
import { OrdersService } from './../../services/orders/orders.service';
import { Order } from './../../models/orders/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: Order[];
  user: User;

  constructor(
    private readonly orderService: OrdersService,
    private readonly storage: Storage,
    private readonly navController: NavController,
    private readonly alertController: AlertController
  ) { }

  ngOnInit() {
    this.storage.get('user').then(
      (data: string) => {
        this.user = JSON.parse(data);
        this.orderService.getOrdersByParams({ user: this.user.id }).subscribe(
          (orders: Order[]) => {
            this.orders = orders;
          }
        )
      }
    )
  }

  goToCheckout(courseId: number, order: Order) {
    if (order.status === 'paid') {
      this.alertController.create({
        message: 'Order Already Paid',
        buttons: ['Cancel']
      }).then(alert => alert.present());
    } else {
      this.navController.navigateForward('/checkout', { queryParams: { id: courseId, order: order.id } });
    }
  }

}
