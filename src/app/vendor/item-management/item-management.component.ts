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
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  images: string[] = [];
  filteredProducts: any[] = [];
  products: any[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  createItemCategory: string = '';
  updateCategory: string = '';
  selectedCategory: string = 'Any';
  selectedProduct: any = null;
  createItemModel = {
    itemName: '',
    itemDescription: '',
    itemLongDescription: '',
    itemSize: '',
    itemPrice: '',
    itemImage: ''
  };
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
    this.loadImages();
  }

  loadImages(): void {
    this.images = [
      'CamisaAzul',
      'CamisaBlanca',
      'CamisetaAzul',
      'CamisetaBlanca',
      'CamisetaNegra',
      'GorraBlanca',
      'GorraRoja',
      'PoloBlanco',
      'PoloNegro',
      'SudaderaAzul',
      'SudaderaBlanca',
      'SudaderaGris',
      'SudaderaNegra',
      'Vaqueros1',
      'Vaqueros2'
    ]
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

  closeCreateProductModal(){
    const modalElement = document.getElementById('createItemModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openCreateProductModal() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('createItemModal'));
    modal.show();
  }

  createProduct() {
    if (!this.createItemModel.itemName || !this.createItemModel.itemDescription || !this.createItemModel.itemLongDescription ||
        !this.createItemModel.itemSize || !this.createItemModel.itemPrice || !this.createItemModel.itemImage || !this.createItemCategory) {
      this.toastr.error('Por favor, completa todos los campos.', 'Crear producto');
    }else{
      this.itemManagementService
        .createItem(this.createItemModel, this.createItemCategory)
        .subscribe({
          next: () => {
            this.toastr.success('Producto creado correctamente.', 'Crear producto');
            this.closeCreateProductModal();
            /* istanbul ignore next */
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },
          error: () => {
            this.toastr.error('Ha ocurrido un error inesperado', 'Crear producto');
          }
        });
    }
  }

  formatImageName(imagePath: string): string {
    const imageName = imagePath.split('/').pop()?.replace('.jpg', '') || '';
    return imageName.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  closeDeleteProductModal(){
    const modalElement = document.getElementById('deleteProduct');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openDeleteProductModal(product: any) {
    this.selectedProduct = {...product}
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteProduct'));
    modal.show();
  }

  deleteProduct() {
    this.itemManagementService
      .deleteItem(this.selectedProduct.itemId)
      .subscribe({
        next: () => {
          this.toastr.success('Producto eliminado correctamente.', 'Eliminar producto');
          this.closeDeleteProductModal();
          /* istanbul ignore next */
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: () => {
          this.toastr.error('El producto está asociado a un pedido.', 'Eliminar producto');
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

  closeUpdateProductModal(){
    const modalElement = document.getElementById('updateProductData');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openUpdateProductModal(product: any) {
    this.selectedProduct = {...product}
    const modal = new (window as any).bootstrap.Modal(document.getElementById('updateProductData'));
    modal.show();
  }

  updateProductData() {
    if (!this.selectedProduct.name || !this.selectedProduct.description || !this.selectedProduct.longDescription ||
        !this.selectedProduct.size || !this.selectedProduct.price || !this.selectedProduct.image || !this.selectedProduct.category) {
      this.toastr.error('Por favor, rellena todos los campos.', 'Modificar producto');
    }else{
      this.itemManagementService
        .updateItem(this.selectedProduct)
        .subscribe({
          next: () => {
            this.toastr.success('Producto modificado correctamente.', 'Modificar producto');
            this.closeUpdateProductModal();
            /* istanbul ignore next */
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },
          error: () => {
            this.toastr.error('Ha ocurrido un error inesperado.', 'Modificar producto');
          }
        });
    }
  }

  closeUpdateItemCategoryModal(){
    const modalElement = document.getElementById('updateItemCategory');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openUpdateItemCategoryModal(product: any) {
    this.selectedProduct = {...product}
    this.updateCategory = product.category.name;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('updateItemCategory'));
    modal.show();
  }

  updateItemCategory(){
    if (!this.updateCategory || this.updateCategory === '') {
      this.toastr.error('Por favor, rellena todos los campos.', 'Modificar categoria producto');
    }else{
      this.itemManagementService
        .updateItemCategory(this.selectedProduct.itemId, this.updateCategory)
        .subscribe({
          next: () => {
            this.toastr.success('Categoria modificada correctamente.', 'Modificar categoria producto');
            this.closeUpdateItemCategoryModal();
            /* istanbul ignore next */
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },
          error: () => {
            this.toastr.error('Ha ocurrido un error inesperado.', 'Modificar categoria producto');
          }
        });
    }
  }
}
