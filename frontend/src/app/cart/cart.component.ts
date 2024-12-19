import { Component, effect, inject } from '@angular/core';
import { ProductModel } from '../products/product.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
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
}
