<script context="module">
  export async function load({ url, params, props, fetch, session, stuff }) {
    try {
      // TODO: fetch order
      // const order = await fetch ${params.number} from backend;
      const order = {
        id: 1,
        code: 'abc123', // code included with email to gate orders page
        email: 'example@example.com',
        contents: [
          // products
          {
            id: 1,
            name: '900g Sourdough Batard',
            slug: '900g-sourdough-batard',
            image: {
              url: 'sample image url', // multiple sizes?
            },
            price: 1000, // in cents
            quantity: 2,
          },
          {
            id: 2,
            name: 'Pumpkin Loaf',
            slug: 'pumpkin-loaf',
            image: {
              url: 'sample image url', // multiple sizes?
            },
            price: 500, // in cents
            quantity: 1,
          },
        ],
        total: 2500,
        payment: {
          id: 1,
          method: '', // stripe, etransfer
          paymentId: 'asdfasdf1234', // only for stripe payments?
          amount: 2500,
        },
      };

      return {
        props: {
          order,
        },
      };
    } catch (e) {
      // return {
      // 	redirect: '/posts',
      // 	status: 307
      // };
      return {
        error: 'Product not found',
        status: 404,
      };
    }
  }
</script>

<script>
  import formatMoney from '$lib/helpers/formatMoney';

  export let order;
</script>

{JSON.stringify(order)}
