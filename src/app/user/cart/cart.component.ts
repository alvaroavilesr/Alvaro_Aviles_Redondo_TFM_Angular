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
  selectedProduct: any = null;
  isLoading: boolean = true;

  constructor(private readonly cartService: CartService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.itemsAndAmounts = JSON.parse(<string>sessionStorage.getItem('itemsAndAmountsCart'));
    this.loadCart();
  }

  loadCart() {
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
}
