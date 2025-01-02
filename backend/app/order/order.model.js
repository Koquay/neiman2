const mongoose = require("mongoose");

const { ObjectId, Number } = mongoose.Schema.Types;

const OrdersSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,    
  },
    deliveryAddress: {
      firstName: String,
      lastName: String,
      phone: String,
      address1: String,
      address2: String,
      useAsBillingAddress: Boolean,
  },
  paymentMethod: {
      paymentType: String,
      cardNumber: String,
      expMonth: String,
      expYear: String,
      CVV: String,
      defaultCreditCard: Boolean,
  },
  cart: [
    {
        _id: {
          type: ObjectId,
          ref: "Product",
          required: true,
        },
        quantity:String
      },
  ]

});

mongoose.model("Order", OrdersSchema, "orders");
