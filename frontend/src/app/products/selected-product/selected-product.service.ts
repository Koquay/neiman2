import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { ProductGalleryService } from '../product-gallery/product-gallery.service';
import { ProductModel } from '../product.model';
import { saveStateToLocalStorage } from '../../shared/utils/localStorageUtils';
import { AppService } from '../../app.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SelectedProductService {
  private appService = inject(AppService);
  private httpClient = inject(HttpClient);

  public selectedProductSignal = signal(<ProductModel>
    new ProductModel(),
  );

  private productGalleryService = inject(ProductGalleryService);
  public selectedProduct?: ProductModel;
  private url = '/api/product';

  private appEffect = effect(() => {
    let selectedProduct: ProductModel = this.appService.appSignal().neiman.selectedProduct;

    untracked(() => {
      this.selectedProductSignal.set({ ...selectedProduct })
    });

    console.log('SelectedProductService.selectProductSignal from localStorage', this.selectedProductSignal())

  });


  public setSelectedProduct = (selectedProduct: ProductModel) => {
    // this.selectedProductSignal.set({ ...selectedProduct });
    // console.log('SelectedProductService.selectedProductSignal', this.selectedProductSignal());
    saveStateToLocalStorage({ selectedProduct: selectedProduct })
  };



  // public setSelectedProduct = async (productId: string) => {
  //   const selectedProduct =
  //     this.productGalleryService.getSelectedProduct(productId);

  //   //In the event user refreshes screen, get product from backend
  //   if (!selectedProduct) {
  //     await this.getSelectedProduct(productId);
  //     return;
  //   }
  //   this.selectedProductSignal.set({ ...selectedProduct });
  //   console.log('SelectedProductService.selectedProductSignal', this.selectedProductSignal());
  //   saveStateToLocalStorage({ selectedProduct: this.selectedProductSignal() })
  // };

  // private getSelectedProduct = (productId: string) => {
  //   this.httpClient.get<ProductModel>(`${this.url}/${productId}`).pipe(
  //     tap(selectedProduct => {
  //       console.log('selected selectedProduct from backend', selectedProduct)
  //       this.selectedProductSignal.set({ ...selectedProduct });
  //       console.log('SelectedProductService.selectedProductSignal', this.selectedProductSignal());
  //       saveStateToLocalStorage({ selectedProduct: this.selectedProductSignal() })
  //     })
  //   ).subscribe()
  // }
}
