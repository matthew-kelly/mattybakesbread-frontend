export async function load({ fetch }) {
  const featured = await fetch('/api/featured')
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return { featured };
}
