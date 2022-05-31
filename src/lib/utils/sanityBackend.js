import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  token: import.meta.env.VITE_SANITY_API_TOKEN,
  apiVersion: '2021-10-21',
  useCdn: false,
});

export default client;

// DANGER!!! Deletes all orders
// client.delete({ query: '*[_type == "order"]' }).then((res) => console.log(res));

const createOrder = async (data) => {
  data._type = 'order';
  data.contents = data.contents.map((item) => {
    return {
      product: {
        _type: 'reference',
        _ref: item._id,
      },
      quantity: item.quantity,
      _key: item._id + '-' + item.quantity,
    };
  });
  data.province = 'BC';
  data.country = 'Canada';
  data.payment = JSON.stringify({ received: false });
  if (data._id) {
    const order = await client.createOrReplace(data).then((res) => {
      return res;
    });
    return order;
  } else {
    const order = await client.create(data).then((res) => {
      return res;
    });
    return order;
  }
};

const updateOrderWithPayment = async ({ method, data, payment, status }) => {
  const updates = {
    status: status,
  };
  updates.paid = method === 'stripe' ? true : false;
  updates.payment =
    method === 'stripe'
      ? {
          method: 'stripe',
          received: true,
          amount: payment.paymentIntent.amount,
          paymentId: payment.paymentIntent.id,
          created: payment.paymentIntent.created,
          status: payment.paymentIntent.status,
          ...payment,
        }
      : {
          method: 'etransfer',
          amount: data.total,
          received: false,
        };
  updates.payment = JSON.stringify(updates.payment);
  const order = await client
    .patch(data._id)
    .set(updates)
    .commit()
    .then((res) => {
      return res;
    });
  return order;
};

const updateProductStock = async (contents) => {
  const promises = [];
  contents.forEach((item) => {
    promises.push(client.patch(item.product._ref).dec({ stock: item.quantity }).commit());
  });

  const products = Promise.all(promises)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('updateProductStock error', err);
      return err;
    });

  return products;
};

export { createOrder, updateOrderWithPayment, updateProductStock };
