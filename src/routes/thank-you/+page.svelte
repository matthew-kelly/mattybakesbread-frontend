<script>
  import { order, resetOrder } from '$lib/utils/order';
  import { onMount } from 'svelte';

  let currentOrder = {};

  onMount(() => {
    currentOrder = $order;
    resetOrder();
  });
</script>

<div>
  <h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">Thank You!</h1>
  <div class="bg-white p-4 mb-4 flex flex-col rounded-5 shadow-blur">
    <p>Check your email for your order confirmation.</p>
    <p>I'll be in touch through email or text to organize delivery.</p>
  </div>
</div>
