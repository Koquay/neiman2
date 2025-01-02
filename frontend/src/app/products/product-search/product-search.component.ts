import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SelectedProductService } from '../selected-product/selected-product.service';
import { Router } from '@angular/router';
import { ProductModel } from '../product.model';
import { ProductSearchService } from './product-search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
  public searchField: string = '';
  public searchSubject = new Subject();
  private productSearchService = inject(ProductSearchService);
  private selectedProductService = inject(SelectedProductService)
  private router = inject(Router)
  public searchResults?: ProductModel[];
  public showSearchResult = false;

  ngOnInit() {
    this.handleSearch();
  }

  ngDoCheck() {
    this.searchSubject.next(this.searchField);
  }

  private handleSearch() {
    this.searchSubject.pipe(
      distinctUntilChanged(),
      debounceTime(600)
    ).subscribe(searchField => {
      if (searchField) {
        this.search()
      } else {
        this.clearSearchbox();
      }

    });
  }

  public search = () => {
    this.productSearchService.searchProducts(this.searchField).subscribe(results => {
      this.searchResults = results;
      console.log('this.searchResults', this.searchResults)
    })

    if (this.searchField) {
      this.showSearchResult = true;
    } else {
      this.showSearchResult = false;
    }
  }

  clearSearchbox = () => {
    this.searchResults = [];
    this.searchField = '';
    this.searchSubject.next(this.searchField);
    this.showSearchResult = false;
  }

  public gotoSelectedProduct = async (product: ProductModel) => {
    console.log('ProductfGalery.product for selectedProductsignal', product)
    await this.selectedProductService.setSelectedProduct(product);
    this.router.navigateByUrl('/selected-product');
  }
}
