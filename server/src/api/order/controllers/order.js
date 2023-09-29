"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userName, email } = ctx.request.body;
    let lineItems;
    let session;

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
          quantity: prod.count,
        };
      });

      lineItems = await Promise.all(productsAsync);
    } catch (err) {
      ctx.response.status = 500;
      return {
        error: { message: "Retrieve items info failure!", stack: err.stack },
      };
    }

    try {
      // Create a Stripe session
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.CLIENT_HOST}/confirmation`,
        cancel_url: `${process.env.CLIENT_HOST}`,
        customer_email: email,
        line_items: lineItems,
      });
    } catch (err) {
      ctx.response.status = 500;
      return {
        error: {
          message: "Create a Stripe session failure!",
          stack: err.stack,
        },
      };
    }

    try {
      // Log the item in Strapi
      await strapi.service("api::order.order").create({
        data: { userName, products, stripeSessionId: session.id },
      });

      return { id: session.id };
    } catch (err) {
      ctx.response.status = 500;
      return {
        error: { message: "Log the item in Strapi failure!", stack: err.stack },
      };
    }
  },
}));
