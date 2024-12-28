import { ProductModel } from "../products/product.model";

export class CheckoutModel {

    deliveryAddress = {
        firstName: '',
        lastName: '',
        phone: '',
        address1: '',
        address2: '',
        useAsBillingAddress: true,
    };

    paymentMethod = {
        paymentType: 'Credit Card',
        cardNumber: '',
        expMonth: null,
        expYear: null,
        CVV: '',
        defaultCreditCard: true,
    };

    cart: ProductModel[] = [];
}