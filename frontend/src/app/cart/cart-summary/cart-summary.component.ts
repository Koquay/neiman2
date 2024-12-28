import { Component, effect, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductModel } from '../../products/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss'
})
export class CartSummaryComponent {
  private cartService = inject(CartService);
  public cart: ProductModel[] = [];

  private cartEffect = effect(() => {
    this.cart = this.cartService.cartSignal();
    console.log('CartSummaryComponent.cart', this.cart)
  })

  public getCartSubtotal = () => {
    const subtotal = this.cart?.reduce((acc, product) => {
      return (acc += (product.price * product.quantity));
    }, 0);

    return subtotal || 0;
  }

  public getCartTotal = () => {
    const discount = this.cart?.reduce((acc, product) => {
      return (acc += (product.discount / 100 * product.price));
    }, 0);

    return this.getCartSubtotal() - this.getCartDiscount() + this.getTax();
  }

  public getCartDiscount = () => {
    const discount = this.cart?.reduce((acc, product) => {
      return (acc += (product.discount / 100 * product.price * product.quantity));
    }, 0);

    return discount || 0;
  }

  public getTax = () => {
    return this.getCartSubtotal() * .15
  }
}
