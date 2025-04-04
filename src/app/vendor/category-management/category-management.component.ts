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
  searchTerm: string = '';
  createCategoryName: string = '';

  constructor(private readonly categoryManagementService: CategoryManagementService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.categoryManagementService.getCategories().subscribe((response) => {
      this.filteredCategories = response;
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
    this.categoryManagementService
      .createCategory(this.createCategoryName)
      .subscribe({
        next: () => {
          this.toastr.success('Categoria creada correctamente.', 'Crear categoria');
          this.closeCreateCategoryModal();
          /* istanbul ignore next */
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: () => {
          this.toastr.error('El nombre de categoria ya está en uso.', 'Crear categoria');
        }
      });
  }

  searchCategories() {
    console.log(this.filteredCategories);

  }

}
