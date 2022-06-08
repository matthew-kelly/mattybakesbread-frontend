<script>
  import formatMoney from '$lib/helpers/formatMoney';
  import { flip } from 'svelte/animate';
  import CartItem from '$lib/components/CartItem.svelte';
  import { cart, removeFromCart } from '$lib/utils/cart';
  import { urlFor } from '$lib/utils/sanityImage';

  // FIXME: prevent cart from showing on page transition (pops over everything else)
  // the issue is the fade on exit, which is being triggered on navigating to another page
</script>

<div class="flex flex-col">
  <h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">Cart</h1>
  <p class="font-semibold mb-4 ml-4 md:ml-8">Buy something, will ya?</p>
  <div
    class="bg-white md:shadow-blur p-4 flex flex-col justify-between absolute md:static inset-0 top-[88px] md:min-h-[300px] shadow-blur rounded-5"
  >
    {#if !$cart.contents.length}
      <p class="text-center font-semibold text-h5 mt-4">Your cart is empty</p>
    {:else}
      <p class="text-gray-400 text-center text-xs grow-0">Swipe to remove item</p>
    {/if}
    <div class="flex flex-col gap-4 grow">
      {#each $cart.contents as item (item._id)}
        <div animate:flip={{ duration: 200 }}>
          <CartItem {item} on:drag-delete={() => removeFromCart(item)}>
            <div
              class="item flex items-center bg-white pr-1 hover:bg-gray-100 hover:-translate-x-[53px] transition duration-200 ease-in-out md:p-2"
            >
              <img
                src={urlFor(item.image).width(64).height(64).url()}
                alt={item.image.alt}
                class="aspect-square mr-2 rounded-5"
              />
              <div class="grow flex justify-between items-center">
                <p class="m-0 mr-2">
                  {item.name}
                  {#if item.quantity > 1}
                    <span class="font-semibold">&times;{item.quantity}</span>
                  {/if}
                </p>
                <p class="m-0 text-lg font-semibold">{formatMoney(item.price * item.quantity)}</p>
              </div>
            </div>
          </CartItem>
        </div>
      {/each}
    </div>
    <div class="mt-8 md:flex md:justify-between md:items-center">
      <div class="flex justify-between md:justify-start">
        <p class="font-semibold text-xl m-0 mr-4">Total</p>
        <p class="font-semibold text-xl m-0">{formatMoney($cart.total, false)}</p>
      </div>
      {#if $cart.contents.length}
        <a class="btn w-full md:w-auto mt-2 md:mt-0" href="/checkout">Checkout</a>
      {:else}
        <a class="btn w-full md:w-auto mt-2 md:mt-0" href="/shop">Shop</a>
      {/if}
    </div>
  </div>
</div>
