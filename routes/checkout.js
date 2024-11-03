const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const DOMAIN = process.env.DOMAIN;

router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "usd",
          product_data: {
            name: "Design data intensive applications",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${DOMAIN}/checkout-success`,
    cancel_url: `${DOMAIN}/cart`, // To be modified
  });
  // console.log(session.url);
  res.send({ url: session.url });
});

module.exports = router;
