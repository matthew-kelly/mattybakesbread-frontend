<script context="module">
  export async function load({ url, params, props, fetch, session, stuff }) {
    try {
      //  TODO: fetch live cart data
      let cart = {
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
      };

      return {
        props: {
          cart,
        },
      };
    } catch (e) {
      // return {
      // 	redirect: '/posts',
      // 	status: 307
      // };
      return {
        error: '// TODO: proper error message',
        status: 404,
      };
    }
  }
</script>

<script>
  import formatMoney from '$lib/helpers/formatMoney';
  import { writable } from 'svelte/store';
  import CartItem from '../lib/components/CartItem.svelte';

  export let cart;
  const cartStore = writable(cart);

  function removeFromCart(index) {
    if ($cartStore.contents[index].quantity > 1) {
      // reduce quantity
      // FIXME: use live cart
      $cartStore.contents[index].quantity -= 1;
      updateTotal();
    } else {
      // remove from cart
      // FIXME: use live cart
      let contents = $cartStore.contents.filter((item, i) => i !== index);
      $cartStore.contents = contents;
      updateTotal();
    }
  }
  function updateTotal() {
    let total = 0;
    $cartStore.contents.forEach((item) => {
      total += item.price * item.quantity;
    });
    $cartStore.total = total;
  }
</script>

<div class="flex flex-col">
  <h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">Cart</h1>
  <!-- <p class="font-semibold mb-4 ml-4 md:ml-8">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p> -->
  <div class="bg-white md:shadow-blur p-4 flex flex-col justify-between absolute md:static inset-0 top-[48px]">
    {#if !$cartStore.contents.length}
      <p class="text-center font-semibold text-h5 mt-4">Your cart is empty</p>
    {/if}
    <div class="flex flex-col gap-4">
      {#each $cartStore.contents as item, index}
        <CartItem {item} on:drag-delete={() => removeFromCart(index)}>
          <div class="flex items-center bg-white pr-1  hover:-translate-x-[53px] transition duration-200 ease-in-out">
            <!-- <img class="grow-0 mr-1" src={item.image.url} alt={item.name} /> -->
            <div class="relative w-16 h-0 pt-[64px] bg-gray-400 mr-2" />
            <div class="grow flex justify-between items-center">
              <p class="m-0 mr-2">
                {item.name}
                {#if item.quantity > 1}
                  &times;{item.quantity}
                {/if}
              </p>
              <p class="m-0">{formatMoney(item.price * item.quantity)}</p>
            </div>
          </div>
        </CartItem>
      {/each}
    </div>
    <div class="mt-8 md:flex md:justify-between md:items-center">
      <div class="flex justify-between md:justify-start">
        <p class="font-semibold m-0 mr-4">Total</p>
        <p class="font-semibold m-0">{formatMoney($cartStore.total, false)}</p>
      </div>
      {#if $cartStore.contents.length}
        <a class="btn w-full md:w-auto mt-2 md:mt-0" href="/checkout">Checkout</a>
      {:else}
        <a class="btn w-full md:w-auto mt-2 md:mt-0" href="/shop">Shop</a>
      {/if}
    </div>
  </div>
</div>

<!-- TODO: Cart items as a $store -->
