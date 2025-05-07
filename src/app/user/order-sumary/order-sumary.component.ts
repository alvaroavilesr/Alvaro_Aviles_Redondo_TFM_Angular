import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {CartService} from '../cart/cart.service';
import {OrderSummaryService} from './orderSummary.service';

@Component({
  selector: 'app-order-sumary',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './order-sumary.component.html',
  styleUrl: './order-sumary.component.css'
})
export class OrderSumaryComponent implements OnInit {
  selectedOrder: any = null;
  formattedDate: any = null;

  constructor(private readonly orderSummaryService: OrderSummaryService) {}

  ngOnInit(): void {
    this.loadOrderData();
  }

  loadOrderData() {
    const orderId = sessionStorage.getItem('orderId');
    this.orderSummaryService.getOrder(orderId).subscribe({
      next: (response) => {
        this.selectedOrder = response;
        this.selectedOrder.price = parseFloat(this.selectedOrder.price.toFixed(2));
        this.formattedDate = this.selectedOrder.date.split('T')[0].split('-').reverse().join('/');
      }
    });
  }
}
