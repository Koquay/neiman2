import { Component, effect, inject } from '@angular/core';
import { ProductModel } from '../products/product.model';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { DiscountPricePipe } from '../shared/pipes/discount-price.pipe';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DiscountPricePipe,
    CartSummaryComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService = inject(CartService);
  public cart: ProductModel[] = [];

  private cartEffect = effect(() => {
    this.cart = this.cartService.cartSignal();
    console.log('CartComponent.cart', this.cart)
  })

  public adjustQuantity = (productId: string, quantity: number, adjType: string) => {
    if (adjType === '+') {
      quantity++;
    } else if (adjType === '-') {
      if (quantity > 1) {
        quantity--
      } else {
        return;
      }
    }

    this.cartService.adjustQuantity(productId, quantity);
  }

  public removeFromCart = (productId: string) => {
    this.cartService.removeFromCart(productId);
  }

}
