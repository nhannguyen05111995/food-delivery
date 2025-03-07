"use client";
import Link from "next/link"
import { useDispatch } from 'react-redux';
import { counterActions } from '../lib/cart';
export default function Item({ recipe }) {
    const dispatch = useDispatch();
    function handleAddItem(e, recipe) {
        e.preventDefault(); // <-- prevent default action
        e.stopPropagation();
                dispatch(counterActions.increment(recipe));
    }
    return (
        <Link key={recipe._id} className="group" href={'meals/' + recipe._id}>
            <h3 class="mt-4 text-sm text-gray-700">{recipe.name}</h3>
            <p class="mt-1 text-lg font-medium text-gray-900">€{recipe.price}</p>
            <button onClick={(e) => { handleAddItem(e, recipe) }} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                Add to cart
            </button>
            <br />
        </Link>

    );
}