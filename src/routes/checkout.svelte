<script context="module">
  // disable SSR for checkout
  export async function handle({ event, resolve }) {
    const response = await resolve(event, {
      ssr: false,
    });

    return response;
  }

  export function load() {
    return {
      stuff: { title: 'Checkout' },
    };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { goto } from '$app/navigation';
  // import { loadStripe } from '@stripe/stripe-js';
  // import { PaymentElement } from 'svelte-stripe';
  import { cart, verifyCartForCheckout, clearCart } from '$lib/utils/cart';
  import formatMoney from '$lib/helpers/formatMoney';
  import formatPhoneNumber from '$lib/helpers/formatPhoneNumber';
  import { urlFor } from '$lib/utils/sanityImage';
  import { order } from '$lib/utils/order';

  const stages = ['Information', 'Payment', 'Complete'];
  let stage = 0;
  $: currentStage = stages[stage];

  let error = null;
  let processing = false;
  // FIXME: re-enable stripe payments
  // let stripe = null;
  // let clientSecret = null;
  // let elements;
  // let stripeVariables = {
  //   colorBackground: '#C5F4E0',
  //   colorText: '#222222',
  //   colorDanger: '#df1b41',
  //   fontFamily: 'Work Sans, sans-serif',
  //   spacingUnit: '2px',
  //   borderRadius: '4px',
  //   spacingGridColumn: '16px',
  //   spacingGridRow: '20px',
  // };

  $: verifyInformation =
    $order.firstName &&
    $order.lastName &&
    $order.email &&
    $order.phoneNumber &&
    $order.phoneNumber.length === 10 &&
    $order.address &&
    $order.postalCode &&
    $order.city;

  async function submitInformation() {
    if (processing || !verifyInformation) return;
    processing = true;
    error = null;
    $order.contents = $cart.contents;
    $order.total = $cart.total;
    const newOrder = await fetch('/api/order/create', {
      method: 'POST',
      body: JSON.stringify({ order: $order }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));

    if (newOrder._id) {
      $order._id = newOrder._id;
      // clientSecret = await createPaymentIntent(); // FIXME: re-enable stripe payments
      stage += 1;
      processing = false;
    } else {
      error = 'Error. Please try again.';
      processing = false;
    }
    return;
  }

  onMount(async () => {
    // redirect back to cart if cart is empty
    if ($cart.contents.length === 0) {
      goto('/cart');
    }
    // update cart items to work with available stock
    verifyCartForCheckout();
    // get stripe client
    // stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); // FIXME: re-enable stripe payments
  });

  async function createPaymentIntent() {
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ total: $cart.total }),
    });
    const { clientSecret } = await response.json();
    window.clientSecret = clientSecret;

    return clientSecret;
  }

  async function submitOrder(method) {
    // avoid processing duplicates
    if (processing) return;
    processing = true;
    let result = { error: false };
    // if (method === 'stripe') {  // FIXME: re-enable stripe payments
    //   // confirm payment with stripe
    //   result = await stripe.confirmPayment({
    //     elements,
    //     redirect: 'if_required',
    //   });
    // }
    if (result.error) {
      // payment failed, notify user
      error = result.error.message;
      processing = false;
    } else {
      // update order in sanity
      let updatedOrder = await fetch('/api/order/update', {
        method: 'POST',
        body: JSON.stringify({
          method,
          order: $order,
          payment: result,
          status: 'received',
        }),
      });
      updatedOrder = await updatedOrder.json();
      // send order confirmation email
      fetch('/api/order/sendConfirmationEmail', {
        method: 'POST',
        body: JSON.stringify({ order: $order }),
      });
      await fetch('/api/products', {
        method: 'PUT',
        body: JSON.stringify({
          contents: updatedOrder.contents,
        }),
      });
      // clear cart
      clearCart();
      // payment succeeded, redirect to "thank you" page
      goto('/thank-you');
    }
  }
</script>

<div>
  <h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">Checkout</h1>
  <div class="bg-white p-4 mb-4 flex flex-col rounded-5 shadow-blur">
    <p class="mb-0">
      <span class="font-semibold">Notice:</span> All store items are made available based on my baking schedule. Once you
      submit your order, I will contact you to organize your delivery date and time. Thanks!
    </p>
    {#if $cart?.contents?.length}
      <hr class="my-4 border-primary-light border-2 rounded-5" />
      <div class="">
        {#each $cart.contents as item (item._id)}
          <div class="item flex items-center bg-white">
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
              <p class="m-0 font-semibold">{formatMoney(item.price * item.quantity)}</p>
            </div>
          </div>
        {/each}
      </div>
      <p class="m-0 mt-4 text-lg font-semibold text-right">Total: {formatMoney($cart.total, false)}</p>
      {#if currentStage === 'Payment'}
        <hr class="my-4 border-primary-light border-2 rounded-5" />
        <div class="flex gap-4 sm:gap-8 mt-4 md:mt-0 mx-auto">
          <div class="flex flex-col">
            <span class="mb-2">{$order.firstName} {$order.lastName}</span>
            <span class="mb-2">{$order.email}</span>
            <span>{formatPhoneNumber($order.phoneNumber)}</span>
          </div>
          <div class="flex flex-col">
            <span class="mb-2">{$order.address}</span>
            {#if $order.address2}
              <span class="mb-2">{$order.address2}</span>
            {/if}
            <span>{$order.city}, {$order.postalCode}</span>
          </div>
        </div>
      {/if}
    {/if}
  </div>

  <div class="bg-white p-4 flex flex-col rounded-5 shadow-blur">
    {#if error}
      <p class="font-semibold text-lg md:text-h4 text-center text-red-600">{error}</p>
    {/if}

    {#if currentStage === 'Information'}
      <form
        class="grid grid-cols-1 sm:grid-cols-2 gap-x-4"
        on:submit|preventDefault={async () => await submitInformation()}
      >
        <input
          class="form-input"
          type="text"
          name="firstname"
          placeholder="Your first name"
          required
          bind:value={$order.firstName}
        />
        <input
          class="form-input"
          type="text"
          name="lastname"
          placeholder="Your last name"
          required
          bind:value={$order.lastName}
        />
        <input class="form-input" type="email" name="email" placeholder="Email" required bind:value={$order.email} />
        <input
          class="form-input"
          type="tel"
          name="phone"
          placeholder="Phone number"
          required
          bind:value={$order.phoneNumber}
        />
        <input
          class="form-input sm:col-span-2"
          type="text"
          name="address"
          placeholder="Address"
          required
          bind:value={$order.address}
        />
        <input
          class="form-input sm:col-span-2"
          type="text"
          name="address2"
          placeholder="Apartment, suite, etc. (optional)"
          bind:value={$order.address2}
        />
        <input class="form-input" type="text" name="city" placeholder="City" required bind:value={$order.city} />
        <input
          class="form-input"
          type="text"
          name="postalcode"
          placeholder="Postal code"
          required
          bind:value={$order.postalCode}
        />
        <button class="btn max-w-fit mx-auto sm:col-span-2" disabled={processing || !verifyInformation} type="submit">
          Next
        </button>
      </form>
    {:else if currentStage === 'Payment'}
      <div>
        <h4 class="mb-4">e-Transfer</h4>
        <div transition:slide|local class="flex flex-col">
          <p>I will contact you for payment through e-Transfer. No free bread lol.</p>
          <button type="button" class="btn mx-auto" disabled={processing} on:click={() => submitOrder('etransfer')}>
            {#if processing}
              Processing...
            {:else}
              Pay by e-Transfer
            {/if}
          </button>
        </div>
        <!--  // FIXME: re-enable stripe payments -->
        <!-- <hr class="my-4 border-primary-light border-2 rounded-5" />
        <div>
          <h4 class="mb-4">Credit/Debit</h4>
          <div transition:slide|local>
            {#if stripe}
              <form class="flex flex-col items-center" on:submit|preventDefault={() => submitOrder('stripe')}>
                <PaymentElement
                  {stripe}
                  {clientSecret}
                  bind:elements
                  variables={stripeVariables}
                  theme="flat"
                  rules={{ '.StripeElement': { width: '100%' } }}
                />
                <button class="btn mt-4" disabled={processing} type="submit">
                  {#if processing}
                    Processing...
                  {:else}
                    Pay by card
                  {/if}
                </button>
              </form>
            {:else}
              <div class="animate-pulse grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-8">
                <div class="rounded-full bg-slate-200 h-10 w-full col-span-2" />
                <div class="rounded-full bg-slate-200 h-10 w-full col-span-1" />
                <div class="rounded-full bg-slate-200 h-10 w-full col-span-1" />
                <div class="rounded-full bg-slate-200 h-10 w-full col-span-2" />
                <div class="rounded-full bg-slate-200 h-10 w-full col-span-2" />
              </div>
            {/if}
          </div>
        </div> -->
      </div>
    {:else if currentStage === 'Complete'}
      <p>Thank you for your order!</p>
    {/if}
  </div>
</div>
