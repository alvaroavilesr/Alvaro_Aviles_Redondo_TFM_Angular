import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ItemManagementService} from './item-management.service';

@Component({
  selector: 'app-item-management',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './item-management.component.html',
  styleUrl: './item-management.component.css'
})
export class ItemManagementComponent implements OnInit {
  filteredProducts: any[] = [];
  products: any[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'Any';

  constructor(private readonly itemManagementService: ItemManagementService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.itemManagementService.getItems().subscribe((response) => {
      this.products = response;
      this.filteredProducts = this.products;
    });
    this.itemManagementService.getCategories().subscribe((response) => {
      this.categories = response;
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
      const matchesCategory = this.selectedCategory === 'Any' || product.category.name === this.selectedCategory;
      return matchesSearchTerm && matchesCategory;
    });
  }
}
