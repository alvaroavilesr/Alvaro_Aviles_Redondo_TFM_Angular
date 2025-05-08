import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {OwnOrdersService} from './own-orders.service';

@Component({
  selector: 'app-own-orders',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './own-orders.component.html',
  styleUrl: './own-orders.component.css'
})
export class OwnOrdersComponent implements OnInit {
  filteredOrders: any[] = [];
  orders: any[] = [];
  selectedOrder: any = null;
  formattedDate: any = null;
  isLoading: boolean = true;

  constructor(private readonly ownOrdersService: OwnOrdersService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ownOrdersService.getUserOrders().subscribe({
      next: (response) => {
        this.orders = response;
        this.filteredOrders = this.orders;
        this.filteredOrders.forEach(order => {
          if (order.price != null && !isNaN(order.price)) {
            order.price = parseFloat(order.price.toFixed(2));
          }
        });
        this.isLoading = false;
      }, error: () => {
        this.isLoading = false;
      }
    });
  }

  closeDetailsOrderModal(){
    const modalElement = document.getElementById('detailsOrder');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openDetailsOrderModal(order: any) {
    this.selectedOrder = {...order}
    this.selectedOrder.price = parseFloat(this.selectedOrder.price.toFixed(2));
    this.formattedDate = this.selectedOrder.date.split('T')[0].split('-').reverse().join('/');
    const modal = new (window as any).bootstrap.Modal(document.getElementById('detailsOrder'));
    modal.show();
  }

  closeDeleteOrderModal(){
    const modalElement = document.getElementById('deleteOrder');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openDeleteOrderModal(order: any) {
    this.selectedOrder = {...order}
    this.selectedOrder.price = parseFloat(this.selectedOrder.price.toFixed(2));
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteOrder'));
    modal.show();
  }

  deleteOrder() {
    this.ownOrdersService
      .deleteOrder(this.selectedOrder.orderId)
      .subscribe({
        next: () => {
          this.toastr.success('Pedido cancelado correctamente.', 'Cancelar pedido');
          this.closeDeleteOrderModal();
          this.loadOrders();
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error inesperado.', 'Cancelar pedido');
        }
      });
  }
}
