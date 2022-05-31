import { writable } from 'svelte/store';

const defaultOrder = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  address2: '',
  postalCode: '',
  city: '',
  contents: [],
  total: '',
  paid: false,
  status: 'pending',
};

const order = writable(defaultOrder);

function resetOrder() {
  order.set(defaultOrder);
}

export { order, resetOrder };
