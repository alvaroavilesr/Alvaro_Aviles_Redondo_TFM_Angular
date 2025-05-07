import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {CartService} from './cart.service';
import {OrderModel} from '../../shared/models/order.model';
import {Router} from '@angular/router';

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
  selectedProduct: any = null;
  isLoading: boolean = true;
  orderModel: OrderModel = {
    date: new Date(),
    address: '',
    itemIdsAndAmounts: []
  };
  constructor(private readonly cartService: CartService,
              private readonly toastr: ToastrService,
              private readonly router: Router) {}

  ngOnInit(): void {
    this.itemsAndAmounts = JSON.parse(<string>sessionStorage.getItem('itemsAndAmountsCart'));
    this.loadCart();
  }

  loadCart() {
    if (!this.itemsAndAmounts || this.itemsAndAmounts.length === 0) {
      this.cart = [];
      this.isLoading = false;
      return;
    }
    this.cartService.getItems().subscribe({
      next: (response) => {
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
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  closeDetailsProductModal(){
    const modalElement = document.getElementById('detailsProduct');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openDetailsProductModal(product: any) {
    this.selectedProduct = {...product}
    const modal = new (window as any).bootstrap.Modal(document.getElementById('detailsProduct'));
    modal.show();
  }

  closeDeleteFromCartModal(){
    const modalElement = document.getElementById('deleteFromCart');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openDeleteFromCartModal(product: any) {
    this.selectedProduct = {...product}
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteFromCart'));
    modal.show();
  }

  deleteProductFromCart() {
    let itemsAndAmountsCart = JSON.parse(<string>sessionStorage.getItem("itemsAndAmountsCart"));
    const newItemsAndAmountsCart = [];

    for (let i = 0; i < itemsAndAmountsCart.length; i += 2) {
      if (itemsAndAmountsCart[i] !== this.selectedProduct.itemId) {
        newItemsAndAmountsCart.push(itemsAndAmountsCart[i]);
        newItemsAndAmountsCart.push(itemsAndAmountsCart[i + 1]);
      }
    }

    sessionStorage.setItem("itemsAndAmountsCart", JSON.stringify(newItemsAndAmountsCart));

    this.itemsAndAmounts = newItemsAndAmountsCart;
    this.loadCart();

    this.closeDeleteFromCartModal();
    this.toastr.success('Producto eliminado del carrito.', 'Eliminar del carrito');
  }

  closeMakeOrderModal(){
    const modalElement = document.getElementById('makeOrder');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openMakeOrderModal() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('makeOrder'));
    modal.show();
  }

  makeOrder() {
    if (!this.orderModel.address || this.orderModel.address.trim() === '') {
      this.toastr.error('Por favor, introduce una dirección.', 'Hacer pedido');
    }else {
      this.orderModel.date = new Date();
      this.orderModel.itemIdsAndAmounts = this.itemsAndAmounts;
      this.cartService
        .makeOrder(this.orderModel)
        .subscribe({
          next: (response) => {
            sessionStorage.removeItem('itemsAndAmountsCart');
            sessionStorage.setItem('orderId', response.orderId);
            this.closeMakeOrderModal();
            this.router.navigate(['/orderSummary']);
          },
          error: () => {
            this.toastr.error('Ha ocurrido un error inesperado.', 'Hacer pedido');
          }
        });
    }
  }
}
