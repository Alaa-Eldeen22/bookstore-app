const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const DOMAIN = process.env.DOMAIN;
const validateCartItems = require("../middlewares/prepareCartData");

router.post("/create-checkout-session", validateCartItems, async (req, res) => {
  // const orderId = "123aaaa"
  const line_items = [
    {
      price_data: {
        currency: "egp",
        product_data: {
          name: "Order Total",
        },
        unit_amount: req.totalAmount,
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
    // metadat: { orderId },
  });

  res.send({ url: session.url });
});

module.exports = router;
