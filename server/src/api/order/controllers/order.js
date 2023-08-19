"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userName, email } = ctx.request.body;
    try {
      // retrieve item info
      const productsAsync = products.map(async (prod) => {
        const item = await strapi.service("api::item.item").findOne(prod.id);

        /**
         * Prebuilt checkout page
         * https://stripe.com/docs/checkout/quickstart
         * https://stripe.com/docs/api/checkout/sessions/create
         */
        return {
          price_data: {
            currency: "cad",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: products.count,
        };
      });

      const lineItems = await Promise.all(productsAsync);

      // Create a Stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.CLIENT_HOST}/checkout/success`,
        cancel_url: `${process.env.CLIENT_HOST}`,
        customer_email: email,
        line_items: lineItems,
      });

      // create the item in Strapi
      await strapi.service("api::order.order").create({
        data: { userName, products, stripeSessionId: session.id },
      });

      return { id: session.id };
    } catch (err) {
      ctx.response.status = 500;
      return { error: { message: "Payment failure!" } };
    }
  },
}));
