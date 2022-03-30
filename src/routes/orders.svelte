<script>
  import { page } from '$app/stores';
  import formatMoney from '$lib/helpers/formatMoney';

  let orderNumber = $page.url.searchParams.get('order');
  let orderCode = $page.url.searchParams.get('code');
  console.log({ orderNumber, orderCode });

  // TODO: remove this
  let orderTemp = {
    id: 1,
    code: 'abc123', // code included with email to gate orders page
    email: 'example@example.com',
    name: 'John Someone',
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
    paid: true, // true, false (false will have empty payment object)
    payment: {
      id: 1,
      method: 'stripe', // stripe, etransfer
      paymentId: 'asdfasdf1234', // only for stripe payments?
      amount: 2500,
    },
    status: 'complete', // 'pending', 'fulfilling', 'complete', 'cancelled'
  };

  let orderResponse;

  const fetchOrder = async () => {
    // TODO: check order number and code in backend, return data or error
    // const response = await fetch('backend api endpoint')
    // if (response.status === 200) {
    //   return await response.json();
    // } else {
    //   throw new Error(response.statusText);
    // }
    // TODO: remove this
    const response = new Promise((resolve) => {
      setTimeout(() => {
        resolve(orderTemp);
      }, 100);
    });
    console.log(response);
    return await response;
  };

  function handleSubmit() {
    orderResponse = fetchOrder();
  }
</script>

<div>
  <h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">Orders</h1>
  <p class="font-semibold mb-4 ml-4 md:ml-8">Check the status of your order.</p>
  <div class="bg-white p-4 md:py-16 grid grid-cols-1 gap-4 items-center justify-center">
    {#if !orderResponse}
      <div class="mb-2 md:max-w-2xl md:w-full md:mx-auto">
        <label>
          Order Number
          <input type="text" name="order-number" placeholder="Your order number" bind:value={orderNumber} />
        </label>

        <label>
          Confirmation Code
          <input type="text" name="text" placeholder="Check your email" bind:value={orderCode} />
        </label>

        <button class="btn" disabled={!(orderNumber && orderCode)} type="button" on:click={handleSubmit}>
          Check Order
        </button>
      </div>
    {/if}
    {#await orderResponse}
      <!-- TODO: proper loading visual, maybe tailwind animate-spin -->
      <p>...loading</p>
    {:then order}
      {#if order}
        <div class="md:max-w-2xl md:w-full md:mx-auto">
          <h4 class="mb-2">Order #{order.id}</h4>
          <p class="mb-1"><span class="font-semibold">Ordered By: </span>{order.name}</p>
          <p class="mb-1 mt-4 font-semibold">Items:</p>
          <div class="flex flex-col gap-2 mb-4">
            {#each order.contents as item}
              <div class="grow flex justify-between items-center">
                <p class="m-0 mr-2">
                  {item.name}
                  {#if item.quantity > 1}
                    <span class="font-semibold">&times;{item.quantity}</span>
                  {/if}
                </p>
                <p class="m-0 font-semibold">{formatMoney(item.price * item.quantity)}</p>
              </div>
            {/each}
          </div>
          <p class="mb-1"><span class="font-semibold">Total: </span>{formatMoney(order.total, false)}</p>
          {#if order.paid}
            <p class="mb-1 capitalize"><span class="font-semibold">Payment Method: </span>{order.payment.method}</p>
          {:else}
            <p class="mb-1 font-semibold text-red-600">Unpaid</p>
          {/if}
          <p class="mb-1 capitalize"><span class="font-semibold">Status: </span>{order.status}</p>
        </div>
      {/if}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</div>
