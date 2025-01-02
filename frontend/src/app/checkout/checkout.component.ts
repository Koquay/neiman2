import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckoutService } from './checkout.service';
import { CheckoutModel } from './checkout.model';
import { CommonModule } from '@angular/common';
import { CartSummaryComponent } from '../cart/cart-summary/cart-summary.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CartSummaryComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  private checkoutService = inject(CheckoutService);
  public checkoutData = new CheckoutModel();

  private checkoutEffect = effect(() => {
    this.checkoutData = this.checkoutService.checkoutSignal();
    console.log('CheckoutComponent.checkoutSignal()', this.checkoutData)
  })

  expirationMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  expirationYears = [
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
    "2034",
  ]

  public saveCheckoutData = () => {
    console.log('CheckoutComponent.checkoutData', this.checkoutData)
    this.checkoutService.saveCheckoutData(this.checkoutData)
  }

  public placeOrder = () => {
    console.log('checkoutData', this.checkoutData)
    this.checkoutService.placeOrder();
  }
}
