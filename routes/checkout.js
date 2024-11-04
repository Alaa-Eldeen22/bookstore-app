const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const DOMAIN = process.env.DOMAIN;

router.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.cart.map((item) => {
    return {
      price_data: {
        currency: "egp",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    /////////////////
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["EG"],
    },
    // shipping_options: [
    //   {
    //     shipping_rate_data: {
    //       type: "fixed_amount",
    //       fixed_amount: {
    //         amount: 0,
    //         currency: "egp",
    //       },
    //       display_name: "Free shipping",
    //       // Delivers between 5-7 business days
    //       delivery_estimate: {
    //         minimum: {
    //           unit: "business_day",
    //           value: 5,
    //         },
    //         maximum: {
    //           unit: "business_day",
    //           value: 7,
    //         },
    //       },
    //     },
    //   },
    //   {
    //     shipping_rate_data: {
    //       type: "fixed_amount",
    //       fixed_amount: {
    //         amount: 1500,
    //         currency: "egp",
    //       },
    //       display_name: "Next day air",
    //       // Delivers in exactly 1 business day
    //       delivery_estimate: {
    //         minimum: {
    //           unit: "business_day",
    //           value: 1,
    //         },
    //         maximum: {
    //           unit: "business_day",
    //           value: 1,
    //         },
    //       },
    //     },
    //   },
    // ],
    phone_number_collection: {
      enabled: true,
    },
    //////////////
    line_items,

    mode: "payment",
    success_url: `${DOMAIN}/checkout-success`,
    cancel_url: `${DOMAIN}/cart`, // To be modified
  });
  // console.log(session.url);
  res.send({ url: session.url });
});

module.exports = router;
