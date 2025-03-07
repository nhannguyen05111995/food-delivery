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
          <li key={item._id}>{item.name} Quantity: {item.quantity}
            <div className="ml-3 inline-flex rounded-md shadow-xs" role="group">
              <button onClick={() => handleAdd(item)} type="button" className="text-xs inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                </svg>

              </button>
              <button onClick={() => handleRemove(item)} type="button" className="text-xs px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}