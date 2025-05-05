import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ToastrService} from 'ngx-toastr';
import {ShopService} from './shop.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgIf
    ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  filteredProducts: any[] = [];
  products: any[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'Any';
  selectedProduct: any = null;

  constructor(private readonly shopService: ShopService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.shopService.getItems().subscribe((response) => {
      this.products = response;
      this.filteredProducts = this.products;
    });
    this.shopService.getCategories().subscribe((response) => {
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

  addToCart(product: any) {
    console.log('Product added to cart:', product);
  }
}
