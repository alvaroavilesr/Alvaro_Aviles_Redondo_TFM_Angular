import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {CategoryManagementService} from './category-management.service';

@Component({
  selector: 'app-vendor-home',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent implements OnInit {

  protected readonly sessionStorage = sessionStorage;
  filteredCategories: any[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  createCategoryName: string = '';
  updateCategoryName: string = '';
  selectedCategory: any = null;
  isLoading: boolean = true;

  constructor(private readonly categoryManagementService: CategoryManagementService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryManagementService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        this.filteredCategories = response;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  closeCreateCategoryModal(){
    const modalElement = document.getElementById('createCategoryModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openCreateCategoryModal() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('createCategoryModal'));
    modal.show();
  }

  createCategory() {
    if (!this.createCategoryName) {
      this.toastr.error('Por favor, rellena todos los campos.', 'Crear categoria');
    }else{
      this.categoryManagementService
        .createCategory(this.createCategoryName)
        .subscribe({
          next: () => {
            this.toastr.success('Categoria creada correctamente.', 'Crear categoria');
            this.closeCreateCategoryModal();
            this.loadCategories();
          },
          error: () => {
            this.toastr.error('El nombre de categoria ya está en uso.', 'Crear categoria');
          }
        });
    }
  }

  searchCategories() {
    this.filteredCategories = this.categories.filter(category => {
      return category.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  closeUpdateCategoryModal(){
    const modalElement = document.getElementById('updateCategoryName');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openUpdateCategoryModal(category: any) {
    this.updateCategoryName = category.name;
    this.selectedCategory = {...category}
    const modal = new (window as any).bootstrap.Modal(document.getElementById('updateCategoryName'));
    modal.show();
  }

  updateCategory() {
    if (!this.updateCategoryName) {
      this.toastr.error('Por favor, rellena todos los campos.', 'Modificar categoria');
    }else{
      this.categoryManagementService
        .updateCategory(this.updateCategoryName, this.selectedCategory.categoryId)
        .subscribe({
          next: () => {
            this.toastr.success('Categoria modificada correctamente.', 'Modificar categoria');
            this.closeUpdateCategoryModal();
            this.loadCategories();
          },
          error: () => {
            this.toastr.error('El nombre de categoria ya está en uso.', 'Modificar categoria');
          }
        });
    }
  }

  closeDeleteCategoryModal(){
    const modalElement = document.getElementById('deleteCategory');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openDeleteCategoryModal(category: any) {
    this.selectedCategory = {...category}
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteCategory'));
    modal.show();
  }

  deleteCategory() {
    this.categoryManagementService
      .deleteCategory(this.selectedCategory.categoryId)
      .subscribe({
        next: () => {
          this.toastr.success('Categoria eliminada correctamente.', 'Eliminar categoria');
          this.closeDeleteCategoryModal();
          this.loadCategories();
        },
        error: () => {
          this.toastr.error('La categoría ya esta asociada a un producto.', 'Eliminar categoria');
        }
      });
  }
}
