'use client';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { counterActions } from '../../lib/cart';
export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  function handleAdd(item) {
    dispatch(counterActions.increment(item));
  }
  function handleRemove(item) {
    dispatch(counterActions.decrement(item));
  }
  return (
    <div>
      <h1>Your cart</h1>
      <p>Here are the items in your cart.</p>
      <ul>
        {cart.items.map((item) => (
          <li key={item._id}>{item.name} Quantity: {item.quantity} <button onClick={() => handleAdd(item)}>+</button><button onClick={() => handleRemove(item)}>-</button></li>
        ))}
      </ul>
    </div>
  );
}