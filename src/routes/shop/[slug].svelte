<script context="module">
  export async function load({ url, params, props, fetch, session, stuff }) {
    try {
      // TODO: fetch product
      // const product = await fetch ${params.slug} from backend;
      const product = {
        id: 1,
        name: '900g Sourdough Batard',
        slug: '900g-sourdough-batard',
        description: "I can't guarantee it'll be as pretty as the picture, but I can guarantee it'll taste good.",
        image: {
          url: 'sample image url', // multiple sizes?
        },
        price: 1000, // in cents
        stock: 2,
      };

      return {
        props: {
          product,
        },
        stuff: { title: product.name },
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

  export let product;
</script>

<div>
  <h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">
    {product.name}
  </h1>
  <p class="font-semibold mb-4 ml-4 md:ml-8">
    {product.description}
  </p>
  <div class="flex flex-col bg-white p-4 rounded-5 shadow-blur">
    <!-- TODO: display proper image -->
    <div class="block w-100 h-[300px] bg-gray-400" />
    <!-- end temp image -->
    <div class="flex justify-between items-center mt-4">
      <!-- TODO: disable add to cart if stock is 0 -->
      <p class="font-semibold m-0 mr-4">In Stock: {product.stock}</p>
      <a class="btn" href="/#">Add to cart - {formatMoney(product.price)}</a>
    </div>
  </div>
</div>
