import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {OrderManagementService} from './order-management.service';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent implements OnInit {
  filteredOrders: any[] = [];
  orders: any[] = [];
  searchTerm: string = '';
  selectedOrder: any = null;
  formattedDate: any = null;
  isLoading: boolean = true;

  constructor(private readonly orderManagementService: OrderManagementService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderManagementService.getOrders().subscribe({
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

  searchOrders() {
    this.filteredOrders = this.orders.filter(order => {
      return order.userName.toLowerCase().includes(this.searchTerm.toLowerCase());
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
    this.orderManagementService
      .deleteOrder(this.selectedOrder.orderId)
      .subscribe({
        next: () => {
          this.toastr.success('Pedido eliminado correctamente.', 'Eliminar pedido');
          this.closeDeleteOrderModal();
          this.loadOrders();
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error inesperado.', 'Eliminar pedido');
        }
      });
  }
}
