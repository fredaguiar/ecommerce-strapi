import { loadStripe } from '@stripe/stripe-js';
import { IAddressesAll, IItem } from '../components/global/Types';

const stripePromise = loadStripe(process.env.STRIPE_PUB_KEY as string);

const makePayment = async (values: IAddressesAll, items: IItem[]) => {
  const stripe = await stripePromise;
  if (!stripe) {
    alert('Payment gateway is down');
    return;
  }

  const requestBody = {
    userName: [values.billingAddress.firstName, values.billingAddress.lastName].join(' '),
    email: values.email,
    products: items.map((item) => ({ id: item.id, count: item.count }))
  };

  const result = await fetch(`${process.env.STRAPI_HOST}/api/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application-json' },
    body: JSON.stringify(requestBody)
  });
  const session = await result.json();

  await stripe?.redirectToCheckout({
    sessionId: session.id
  });
};

export { makePayment };
