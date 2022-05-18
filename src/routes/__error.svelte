<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        title: `${status}: ${error.message}`,
      },
      stuff: { title: `Error ${status}` },
    };
  }
</script>

<script>
  export let title;
</script>

<div class="md:mt-8">
  <h1 class="super text-white text-center md:text-left text-shadow-3 md:text-shadow-5 mb-1">Whoops</h1>
  <p class="font-semibold text-center md:text-left md:text-2xl mb-4 md:mb-7 mx-auto max-w-[335px] md:max-w-none">
    {title}
    <br />
    Try another page?
  </p>

  <div class="flex justify-center md:items-start flex-col md:flex-row mt:4 md:mt-16 mb-4 md:mb-0">
    <div class="card mb-8 md:mb-0 md:mr-16">
      <p class="text-h3 md:text-h2 font-semibold">Shop</p>
      <p>Take a look at what's fresh from the oven.</p>
      <a class="btn md:large" href="/shop">Go</a>
    </div>
    <div class="card">
      <p class="text-h3 md:text-h2 font-semibold">Content</p>
      <p>Find out if I've posted another poorly lit picture of a loaf of bread to my Instagram account.</p>
      <a class="btn md:large" href="/content">Go</a>
    </div>
  </div>
</div>
