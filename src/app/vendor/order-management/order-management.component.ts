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

  constructor(private readonly orderManagementService: OrderManagementService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.orderManagementService.getOrders().subscribe((response) => {
      console.log(response);
      this.orders = response;
      this.filteredOrders = this.orders;
    });
  }

  searchOrders() {
    this.filteredOrders = this.orders.filter(order => {
      return order.userName.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  openDetailsOrderModal(order: any): void {
    console.log("Detalles del producto: " + order)
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
          /* istanbul ignore next */
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error inesperado.', 'Eliminar pedido');
        }
      });
  }
}
