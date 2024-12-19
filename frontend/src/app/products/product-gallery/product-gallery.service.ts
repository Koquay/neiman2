import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProductSidebarData } from '../product-sidebar/product-sidebar.service';
import { catchError, tap } from 'rxjs';
import { ProductModel } from '../product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductGalleryService {
  public productSignal = signal<{
    products: ProductModel[];
    productCount: number;
  }>({ products: [], productCount: 0 });

  private httpClient = inject(HttpClient);
  private url = '/api/product';

  public getSelectedProduct = (productId:string) => {

    let selectedProduct:ProductModel = (this.productSignal().products.find(product => product._id === productId) as ProductModel);
    return selectedProduct
  }

  public getProducts = (productSidebarData: ProductSidebarData) => {
    const sidebarDataFilters = this.getSelectedFilters(productSidebarData);

    const params = new HttpParams({
      fromObject: { sidebarDataFilters },
    });

    return this.httpClient
      .get<{ products: ProductModel[]; productCount: number }>(this.url, {
        params,
      })
      .pipe(
        tap((productData) => {
          console.log('productData', productData);
          this.productSignal.set({ ...productData });
          console.log('ProductService.productSignal', this.productSignal())
          // this.productCount = this.productSignal().productCount;
        }),
        catchError((error) => {
          //console.log('error', error);
          // this.toastr.error('Problem getting products', 'Get Products')
          throw error;
        })
      );
  };

  private getSelectedFilters(productSidebarData: ProductSidebarData) {
    //console.log('ProductService.getSelectedFilters', productSidebarData);

    const category = productSidebarData.categories.currentCategory;

    const priceFilters = productSidebarData.priceFilter.priceRange.filter(
      (range) => range.checked
    );

    console.log('ProductGalleryService.priceFilters', priceFilters);

    const priceRanges = [];
    for (let priceRange of priceFilters) {
      priceRanges.push(priceRange.range);
    }

    // const ratingFilters = productSidebarData.ratings.ratings.filter(
    //   (filter:any) => filter.checked
    // );
    //console.log('ProductService.ratingFilters', ratingFilters);

    // const ratings:number[] = [];

    // for (let rating of ratingFilters) {
    //   ratings.push(rating.rating);
    // }

    const filters = {
      category,
      priceRanges,
      // ratings,
      pageNo: productSidebarData.pageNo,
      pageSize: productSidebarData.pageSize,
    };

    console.log('filters', filters);
    return JSON.stringify(filters);
  }
}
