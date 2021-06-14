import { renderHook, act as hooksAct } from '@testing-library/react-hooks';
import { screen, render } from '@testing-library/react';
import { useCartStore } from '../store/cart';
import { makeServer } from '../miragejs/server';
import userEvent from '@testing-library/user-event';
import Cart from './cart';
import { setAutoFreeze } from 'immer';
import TestRenderer from 'react-test-renderer';
const { act: componentsAct } = TestRenderer;

setAutoFreeze(false);

const renderCart = () => {
  render(<Cart />);
};
describe('Cart', () => {
  let server;
  let result;
  let spy;
  let add;
  let toggle;
  let reset;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result;
    add = result.current.actions.add;
    reset = result.current.actions.reset;
    toggle = result.current.actions.toggle;
    spy = jest.spyOn(result.current.actions, 'toggle');
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it('should render the cart with the hidden class', function () {
    renderCart();
    expect(screen.getByTestId('cart')).toHaveClass('hidden');
  });
  it('the toogle removes the hidden class', async function () {
    await componentsAct(async () => {
      renderCart();
      const closeButton = screen.getByTestId('close-button');
      await userEvent.click(closeButton);
      expect(screen.getByTestId('cart')).not.toHaveClass('hidden');
    });
  });
  it('should remove the toogle removes the hidden class', async function () {
    await componentsAct(async () => {
      renderCart();
      const button = screen.getByTestId('close-button');
      await userEvent.click(button);
      await userEvent.click(button);
      expect(spy).toBeCalledTimes(2);
    });
  });
  it('Should display 2 products', function () {
    const products = server.createList('product', 2);
    //    renderCart();
    hooksAct(() => {
      for (const product of products) {
        add(product);
      }
    });
    renderCart();
    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
  });
  it('should remove all products when clear cart is clickerd', async function () {
    const products = server.createList('product', 2);
    hooksAct(() => {
      for (const product of products) {
        add(product);
      }
    });
    await componentsAct(async () => {
      renderCart();
      expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
      const btnRemoveAll = screen.getByRole('button', { name: /remove all/i });
      await userEvent.click(btnRemoveAll);
      expect(screen.queryAllByTestId('cart-item')).toHaveLength(0);
    });
  });
  it('should not display clear cart button if not have no products', async function () {
    renderCart();
    expect(screen.queryByRole('button', { name: /removel all/i })).not.toBeInTheDocument();
  });
});
