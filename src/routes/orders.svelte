<script context="module">
  export function load() {
    return {
      stuff: { title: 'Orders' },
    };
  }
</script>

<script>
  import { page } from '$app/stores';
  import Spinner from '$lib/components/Spinner.svelte';
  import { urlFor } from '$lib/utils/sanityImage';
  import formatPhoneNumber from '$lib/helpers/formatPhoneNumber';
  import formatMoney from '$lib/helpers/formatMoney';

  let orderCode = $page.url.searchParams.get('order');
  let orderEmail = $page.url.searchParams.get('email');

  let orderResponse;

  const fetchOrder = async () => {
    const order = await fetch('/api/order/search', {
      method: 'POST',
      body: JSON.stringify({ id: orderCode, email: orderEmail }),
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error('Order not found');
      });
    return order;
  };

  function handleSubmit() {
    orderResponse = fetchOrder();
  }
</script>

<div>
  <h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">Orders</h1>
  <p class="font-semibold mb-4 ml-4 md:ml-8">Check the status of your order.</p>
  <div class="bg-white p-4 md:py-16 grid grid-cols-1 gap-4 items-center justify-center shadow-blur rounded-5">
    {#if !orderResponse}
      <div class="mb-2 md:max-w-2xl md:w-full md:mx-auto">
        <label>
          Order Code
          <input type="text" name="order-code" placeholder="Check your order email" bind:value={orderCode} />
        </label>

        <label>
          Email
          <input type="email" name="email" placeholder="Your email address" bind:value={orderEmail} />
        </label>

        <button class="btn" disabled={!(orderCode && orderEmail)} type="button" on:click={handleSubmit}>
          Check Order
        </button>
      </div>
    {/if}
    {#await orderResponse}
      <div class="flex items-center justify-center md:max-w-2xl md:w-full md:mx-auto">
        <div class="flex mt-4">
          <Spinner />
          <p class="font-semibold ml-2">Loading...</p>
        </div>
      </div>
    {:then order}
      {#if order}
        <div class="md:max-w-2xl md:w-full md:mx-auto">
          <h4 class="mb-2">Your Order</h4>
          <p class="mb-1 capitalize"><span class="font-semibold">Order status: </span>{order.status}</p>
          <p class="mb-1"><span class="font-semibold">Name: </span>{order.firstName} {order.lastName}</p>
          <p class="mb-1"><span class="font-semibold">Email: </span>{order.email}</p>
          <p class="mb-1"><span class="font-semibold">Phone: </span>{formatPhoneNumber(order.phoneNumber)}</p>
          <p class="mb-1 mt-4 font-semibold">Items:</p>
          {#each order.contents as item (item._id)}
            <div class="item flex items-center bg-white">
              <img
                src={urlFor(item.product.image).width(64).height(64).url()}
                alt={item.product.image.alt}
                class="aspect-square mr-2 rounded-5"
              />
              <div class="grow flex justify-between items-center">
                <p class="m-0 mr-2">
                  {item.product.name}
                  <span class="font-semibold">&times;{item.quantity}</span>
                </p>
                <p class="m-0 font-semibold">{formatMoney(item.product.price * item.quantity)}</p>
              </div>
            </div>
          {/each}
          <p class="m-0 mb-4 mt-1 text-lg font-semibold">Total: {formatMoney(order.total, false)}</p>

          {#if order?.payment.method === 'stripe'}
            <!-- // FIXME: add details for stripe -->
          {:else}
            <p class="mb-1"><span class="font-semibold">Payment Method: </span>e-Transfer</p>
            <p class="mb-1 font-semibold {order.paid ? 'text-green-600' : 'text-red-600'}">
              {order.paid ? 'Paid' : 'Unpaid'}
            </p>
          {/if}
        </div>
      {/if}
    {:catch error}
      <div class="mb-2 md:max-w-2xl md:w-full md:mx-auto text-center">
        <p class="text-red-600 font-semibold">{error.message}</p>
        <button type="button" class="btn" on:click={() => (orderResponse = null)}>Back</button>
      </div>
    {/await}
  </div>
</div>
