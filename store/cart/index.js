import create from 'zustand';

const initalState = {
  open: false,
  products: [],
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
        state: { open: true, products: [...store.state.products, product] },
      })),
  },
}));
