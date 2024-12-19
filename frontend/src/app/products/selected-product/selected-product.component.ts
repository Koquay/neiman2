import { Component, effect, inject, signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../product.model';
import { SelectedProductService } from './selected-product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

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
  private activatedRoute = inject(ActivatedRoute);
  private selectedProductService = inject(SelectedProductService)
  private cartService = inject(CartService)
  private toastr = inject(ToastrService);
  public selectedProduct = new ProductModel();
  public sizes: string[] = ['SMALL', 'MEDIUM', 'LARGE', 'X-LARGE', 'XX-LARGE', '3X-LARGE'];
  public quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public selectedSize = 'NONE';
  public selectedQuantity = 0;

  public selectedProductSubject = new Subject();

  private selectedProductEffect = effect(() => {
    this.selectedProduct = this.selectedProductService.selectedProductSignal();
    console.log('SelectedProductComponent.selectedProductXXX', this.selectedProduct)
  })

  ngOnInit() {
    this.setSelectedProduct()
  }

  private setSelectedProduct = () => {
    this.selectedProductSubject.subscribe(() => {
      const productId = this.activatedRoute.snapshot.paramMap.get('productId')
      console.log('selectedProductSubject.productId', productId)
    })
    const productId = this.activatedRoute.snapshot.paramMap.get('productId')
    console.log('productId', productId)

    this.selectedProductService.setSelectedProduct(productId as string)
  }

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
