import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {CartService} from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  products: any[] = [];
  cart: any[] = [];
  itemsAndAmounts: any[] = [];

  constructor(private readonly cartService: CartService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.itemsAndAmounts = JSON.parse(<string>sessionStorage.getItem('itemsAndAmountsCart'));
    this.loadCart();
  }

  loadCart() {
    this.cartService.getItems().subscribe((response) => {
      this.products = response;

      const quantityByProductId = new Map<number, number>();

      for (let i = 0; i < this.itemsAndAmounts.length; i += 2) {
        const productId = this.itemsAndAmounts[i];
        const quantity = this.itemsAndAmounts[i + 1];

        if (quantityByProductId.has(productId)) {
          quantityByProductId.set(productId, quantityByProductId.get(productId)! + quantity);
        } else {
          quantityByProductId.set(productId, quantity);
        }
      }

      this.cart = this.products
        .filter(product => quantityByProductId.has(product.itemId))
        .map(product => ({
          ...product,
          quantity: quantityByProductId.get(product.itemId)
        }));
    });
  }

  openDetailsProductModal(product: any) {

  }

  openDeleteFromCartModal(product: any) {

  }
}
