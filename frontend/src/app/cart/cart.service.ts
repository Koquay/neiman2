import { inject, Injectable, signal } from '@angular/core';
import { ProductModel } from '../products/product.model';
import { saveStateToLocalStorage } from '../shared/utils/localStorageUtils';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartSignal = signal<ProductModel[]>([])
  private toastr = inject(ToastrService)

  public addToCart = (product: ProductModel) => {
    let cartProducts = this.cartSignal().filter(prod => prod._id !== product._id);
    // cartProducts = [...cartProducts, product]

    this.cartSignal.set([...cartProducts, product])
    saveStateToLocalStorage({ cart: this.cartSignal() })

    console.log('CartService.cartSignal', this.cartSignal())
    this.toastr.success(product.name + ' added to cart', 'Cart')
  }

}
