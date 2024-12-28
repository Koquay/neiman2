import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { CheckoutModel } from './checkout.model';
import { saveStateToLocalStorage } from '../shared/utils/localStorageUtils';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  public checkoutSignal = signal<CheckoutModel>(new CheckoutModel());
  // private cartService = inject(CartService);
  private appService = inject(AppService)
  // private httpClient = inject(HttpClient);
  // private toastr = inject(ToastrService)
  private url = '/api/order';

  private appEffect = effect(() => {
    let checkoutData: CheckoutModel = this.appService.appSignal().neiman.checkoutData;

    untracked(() => {
      this.checkoutSignal.set({ ...checkoutData })
    });

  });

  public saveCheckoutData = (checkoutData: CheckoutModel) => {
    this.checkoutSignal.set({ ...checkoutData })
    console.log('CheckoutService.checkoutSignal()', this.checkoutSignal())
    saveStateToLocalStorage({ checkoutData: this.checkoutSignal() })
  }
}
