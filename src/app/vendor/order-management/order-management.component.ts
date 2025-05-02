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

  constructor(private readonly orderManagementService: OrderManagementService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.orderManagementService.getOrders().subscribe((response) => {
      console.log(response);
      this.orders = response;
      this.filteredOrders = this.orders;
    });
  }

  searchOrders(): void {
    console.log("Buscar!")
  }

  openDetailsProductModal(order: any): void {
    console.log("Detalles del producto: " + order)
  }

  openDeleteProductModal(order: any): void {
    console.log("Eliminar producto: " + order)
  }
}
