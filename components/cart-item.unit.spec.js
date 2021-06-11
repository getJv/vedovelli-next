import { screen, render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import CartItem from './cart-item';
import userEvent from '@testing-library/user-event';
import { useCartStore } from '../store/cart';
import { setAutoFreeze } from 'immer';

setAutoFreeze(false);

const product = {
  title: 'Relogio bonito',
  price: '22.00',
  image:
    'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
};
const addToCart = jest.fn();

const renderCartItem = () => {
  render(<CartItem product={product} addToCart={addToCart} />);
};

describe('ProductCard', () => {
  it('should render a ProductCard', function () {
    renderCartItem();
    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });
  it('should display the proper content', function () {
    renderCartItem();
    const image = screen.getByTestId('image');
    expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument();
    expect(image).toHaveProperty('src', product.image);
    expect(image).toHaveProperty('alt', product.title);
  });
  it('should display 1 as initial quantity', function () {
    renderCartItem();
    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });
  it('should increase quantity by 1 when + be clicked', async function () {
    renderCartItem();
    const button = screen.getByTestId('increase');
    await fireEvent.click(button);
    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });
  it('should decrease quantity by 1 when - be clicked', async function () {
    renderCartItem();
    const btnIncrease = screen.getByTestId('increase');
    const btnDecrease = screen.getByTestId('decrease');

    await fireEvent.click(btnIncrease);
    expect(screen.getByTestId('quantity').textContent).toBe('2');
    await fireEvent.click(btnDecrease);
    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });
  it('should not allow decrease quantity lower then 0', async function () {
    renderCartItem();
    const btnDecrease = screen.getByTestId('decrease');
    await fireEvent.click(btnDecrease);
    await fireEvent.click(btnDecrease);
    expect(screen.getByTestId('quantity').textContent).toBe('0');
  });
  it('should call remove() when remove button is clicked ', async function () {
    const result = renderHook(() => useCartStore()).result;
    const spy = jest.spyOn(result.current.actions, 'remove');
    renderCartItem();
    const btnRemove = screen.getByRole('button', { name: /remove/i });
    await userEvent.click(btnRemove);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });
});
