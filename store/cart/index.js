import create from 'zustand';

const initalState = {
  open: false,
  products: [],
};

const addProduct = (store, product) => {
  if (store.state.products.includes(product)) {
    return store.state.products;
  }
  return [...store.state.products, product];
};

export const useCartStore = create(set => ({
  state: {
    ...initalState,
  },
  actions: {
    toggle: () => set(store => ({ state: { ...store.state, open: !store.state.open } })),
    reset: () => set(store => ({ state: { ...initalState } })),
    add: product =>
      set(store => ({
        state: { open: true, products: addProduct(store, product) },
      })),
  },
}));
