import { Component, effect, inject, signal, SimpleChanges } from '@angular/core';
import { ProductModel } from '../product.model';
import { SelectedProductService } from './selected-product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductGalleryService } from '../product-gallery/product-gallery.service';

@Component({
  selector: 'app-selected-product',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './selected-product.component.html',
  styleUrl: './selected-product.component.scss'
})
export class SelectedProductComponent {
  private selectedProductService = inject(SelectedProductService)
  private productGalleryService = inject(ProductGalleryService)
  private cartService = inject(CartService)
  private toastr = inject(ToastrService);
  public selectedProduct = new ProductModel();
  public sizes: string[] = ['SMALL', 'MEDIUM', 'LARGE', 'X-LARGE', 'XX-LARGE', '3X-LARGE'];
  public quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public selectedSize = 'NONE';
  public selectedQuantity = 0;

  private selectedProductEffect = effect(() => {
    this.selectedProduct = this.selectedProductService.selectedProductSignal();
    console.log('SelectedProductComponent.selectedProductXXX', this.selectedProduct)
  })

  private productGalleryEffect = effect(() => {
    const selectedProduct = this.productGalleryService.productSignal().selectedProduct;
    if (selectedProduct._id) {
      this.selectedProduct = selectedProduct;
      this.selectedProductService.setSelectedProduct(selectedProduct)
      console.log('SelectedProductComponent.selectedProductZZZ', this.selectedProduct)
    }

  })

  public setSelectedSize = (size: string) => {
    this.selectedSize = size;
    console.log('selectedSize', this.selectedSize)
  }

  public setSelectedQuantity = (quantity: number) => {
    this.selectedQuantity = quantity;
    console.log('selectedQuantity', this.selectedQuantity)
  }

  public addToCart = () => {
    if (this.selectedSize === 'NONE') {

      this.toastr.warning("Please select a size. ", "Warning");
      return;
    }
    if (this.selectedQuantity === 0) {
      this.toastr.warning("Please select a quantity. ", "Warning");
      return;
    }

    this.selectedProduct.size = this.selectedSize;
    this.selectedProduct.quantity = this.selectedQuantity;

    this.cartService.addToCart(this.selectedProduct as ProductModel);
  }


}
