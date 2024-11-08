const stripe = require("stripe")(process.env.STRIPE_KEY);
const DOMAIN = process.env.DOMAIN;

class PaymentService {
  async createStripeSession(orderId, totalAmount) {
    const line_items = [
      {
        price_data: {
          currency: "egp",
          product_data: {
            name: "Order Total",
          },
          unit_amount: totalAmount * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${DOMAIN}/checkout-success`,
      cancel_url: `${DOMAIN}/cart`,
      metadata: { orderId: orderId },
    });

    return session.url;
  }
}

module.exports = PaymentService;
