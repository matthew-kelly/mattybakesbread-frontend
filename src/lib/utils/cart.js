import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const defaultCart = {
	contents: [],
	total: 0,
};

const cart = writable(defaultCart);

const calculateTotal = (contents) => {
	if (!contents || !contents.length) return 0;
	let total = 0;
	contents.forEach((item) => {
		const cost = item.price * item.quantity;
		total += cost;
	});
	return total;
};

const calculateQuantity = (contents) => {
	if (!contents || !contents.length) return 0;
	let quantity = 0;
	contents.forEach((item) => {
		quantity += item.quantity;
	});
	return quantity;
};

const checkCart = () => {
	const localCart = get(cart);
	let sessionCart = null;
	if (browser) {
		sessionCart = JSON.parse(sessionStorage.getItem('cart'));
	}
	if (localCart?.id && localCart.contents.length > 0 && localCart.total > 0) {
		updateCart(localCart);
		return localCart;
	} else if (sessionCart?.id && sessionCart.contents.length > 0 && sessionCart.total > 0) {
		updateCart(sessionCart);
		return sessionCart;
	} else {
		const formattedCart = {
			id: uuidv4(),
			contents: [],
			total: 0,
		};
		updateCart(formattedCart);
		return formattedCart;
	}
};

const updateCart = (data) => {
	data.total = calculateTotal(data.contents);
	cart.set(data);
	if (browser) {
		sessionStorage.setItem('cart', JSON.stringify(data));
	}
};

const clearCart = () => {
	updateCart(defaultCart);
};

const addToCart = (product) => {
	const currentCart = checkCart();
	const existing = currentCart.contents.findIndex((item) => item._id === product._id);

	if (existing >= 0) {
		currentCart.contents[existing].quantity += 1;
	} else {
		product.quantity = 1;
		currentCart.contents.push(product);
	}
	updateCart(currentCart);
	return;
};

const removeFromCart = (product) => {
	const currentCart = checkCart();
	const existing = currentCart.contents.findIndex((item) => item._id === product._id);
	if (currentCart.contents[existing].quantity > 1) {
		currentCart.contents[existing].quantity -= 1;
	} else {
		currentCart.contents.splice(existing, 1);
	}
	updateCart(currentCart);
	return;
};

const verifyCartForCheckout = async () => {
	const currentCart = checkCart();
	const ids = currentCart.contents.map((item) => item._id);
	const contents = await fetch('/api/products', { method: 'POST', body: JSON.stringify({ ids: ids }) })
		.then((res) => res.json())
		.catch((err) => console.error(err));
	const changes = Object.fromEntries(
		currentCart.contents.map((item) => {
			return [item._id, { initialQuantity: item.quantity }];
		})
	);
	if (contents && contents.length) {
		contents.forEach((item) => {
			if (item.stock < changes[item._id].initialQuantity) {
				changes[item._id].newQuantity = item.stock;
			} else {
				changes[item._id].newQuantity = changes[item._id].initialQuantity;
			}
		});
	}
	currentCart.contents.forEach((item) => {
		item.quantity = changes[item._id].newQuantity;
	});
	updateCart(currentCart);
	return;
};

if (browser) {
	checkCart();
}

export { cart, addToCart, removeFromCart, clearCart, calculateQuantity, verifyCartForCheckout };
