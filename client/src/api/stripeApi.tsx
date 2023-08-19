import { loadStripe } from '@stripe/stripe-js';
import { IAddressesAll, IItem } from '../components/global/Types';

const stripePromise = loadStripe(process.env.STRIPE_PUB_KEY as string);

const makePayment = async (values: IAddressesAll, cartItems: IItem[]) => {
  const stripe = await stripePromise;
  if (!stripe) {
    alert('Payment gateway is down');
    return;
  }

  const requestBody = {
    userName: [values.billingAddress.firstName, values.billingAddress.lastName].join(' '),
    email: values.email,
    products: cartItems.map((cartItem) => ({ id: cartItem.id, count: cartItem.count }))
  };

  const result = await fetch(`${process.env.STRAPI_HOST}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });
  const session = await result.json();

  await stripe?.redirectToCheckout({
    sessionId: session.id
  });
};

export { makePayment };
