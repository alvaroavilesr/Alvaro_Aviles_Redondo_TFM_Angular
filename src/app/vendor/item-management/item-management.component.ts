import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ItemManagementService} from './item-management.service';

@Component({
  selector: 'app-item-management',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './item-management.component.html',
  styleUrl: './item-management.component.css'
})
export class ItemManagementComponent implements OnInit {
  filteredProducts: any[] = [];
  products: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'Any';

  constructor(private readonly itemManagementService: ItemManagementService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.itemManagementService.getItems().subscribe((response) => {
      console.log(response)
      this.products = response;
      this.filteredProducts = this.products;
    });
  }

  filterProductsByCategory(category: string) {
    this.selectedCategory = category;
    this.searchTerm = '';
    this.applyFilters();
  }

  searchProducts() {
    this.selectedCategory = 'Any';
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearchTerm = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'Any' || product.category === this.selectedCategory;
      return matchesSearchTerm && matchesCategory;
    });
  }
}
