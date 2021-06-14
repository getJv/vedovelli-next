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

describe('CartItem', () => {
  let result;

  beforeEach(() => {
    result = renderHook(() => useCartStore()).result;
  });
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
  it('should call remove() when remove button is clicked ', async function () {
    const spy = jest.spyOn(result.current.actions, 'remove');
    renderCartItem();
    const btnRemove = screen.getByRole('button', { name: /remove/i });
    await userEvent.click(btnRemove);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });
  it('should call increase when + is clicked', async function () {
    const spy = jest.spyOn(result.current.actions, 'increase');
    renderCartItem();
    const btnIncrease = screen.getByTestId('increase');
    await userEvent.click(btnIncrease);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });
  it('should call decrease when - is clicked', async function () {
    const spy = jest.spyOn(result.current.actions, 'decrease');
    renderCartItem();
    const btnDecrease = screen.getByTestId('decrease');
    await userEvent.click(btnDecrease);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });
});
