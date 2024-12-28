import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice',
  standalone: true
})
export class DiscountPricePipe implements PipeTransform {

  transform(price: number, quantity: number, discount: number = 0): unknown {
    let itemPrice = price * quantity;
    let discountPrice = itemPrice - (discount / 100 * itemPrice)

    return '$' + discountPrice.toFixed(2);
  }

}
