import { Injectable, signal } from '@angular/core';
import { ProductModel } from './products/product.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public appSignal = signal<{
    neiman: {
      selectedProduct: ProductModel;
      cart: ProductModel[];
      // checkoutData: CheckoutModel;
      // user: AuthenticationModel;
    };
  }>({
    neiman: {
      selectedProduct: new ProductModel(),
      cart: [],
      // checkoutData: new CheckoutModel(),
      // user: new AuthenticationModel(),
    },
  });

  public restoreStateFromLocalStorage = () => {
    const neiman = JSON.parse(localStorage.getItem('neiman') as string);
    console.log('neiman', neiman)
    this.appSignal.set({ neiman: { ...neiman } });
    console.log('appSignal', this.appSignal())
  };
}
