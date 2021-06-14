import create from 'zustand';
import produce from 'immer';

const initialState = {
  open: false,
  products: [],
};

export const useCartStore = create(set => {
  const setState = fn => set(produce(fn));

  return {
    state: {
      ...initialState,
    },
    actions: {
      toggle() {
        setState(({ state }) => {
          state.open = !state.open;
        });
      },
      increase(product) {
        setState(({ state }) => {
          const localProduct = state.products.find(p => p.id === product.id);
          if (localProduct) {
            localProduct.quantity++;
          }
        });
      },
      decrease(product) {
        setState(({ state }) => {
          const localProduct = state.products.find(p => p.id === product.id);
          if (localProduct && localProduct.quantity > 0) {
            localProduct.quantity--;
          }
        });
      },
      add(product) {
        setState(({ state }) => {
          const doesntExist = !state.products.find(({ id }) => product.id === id);
          if (doesntExist) {
            if (!product.quantity) {
              product.quantity = 1;
            }
            state.products.push(product);
            state.open = true;
          }
        });
      },
      reset() {
        setState(store => {
          store.state = initialState;
        });
      },
      remove(product) {
        setState(({ state }) => {
          const exists = !!state.products.find(({ id }) => product.id === id);
          if (exists) {
            state.products = state.products.filter(({ id }) => {
              return id !== product.id;
            });
          }
        });
      },
      removeAll() {
        setState(({ state }) => {
          state.products = [];
        });
      },
    },
  };
});
