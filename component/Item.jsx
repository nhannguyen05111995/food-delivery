"use client";
import Link from "next/link"
import { useDispatch } from 'react-redux';
import { counterActions } from '../lib/cart';
export default function Item({ recipe }) {
    const dispatch = useDispatch();
    function handleAddItem(recipe) {
        dispatch(counterActions.increment(recipe));
    }
    return (
        <div key={recipe._id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.price}</p>
            <Link href={'meals/' + recipe._id} > Show more</Link>
            <button onClick={() => { handleAddItem(recipe) }}>Add to cart</button>
            <br />
        </div>
    );
}