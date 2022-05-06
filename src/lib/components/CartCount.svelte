<script>
  import { cart, calculateQuantity } from '$lib/utils/cart';
</script>

{calculateQuantity($cart.contents)}
