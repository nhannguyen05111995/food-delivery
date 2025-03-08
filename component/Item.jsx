"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { counterActions } from "../lib/cart";
import { useRouter } from "next/navigation";

export default function Item({ recipe }) {
  const dispatch = useDispatch();
  const router = useRouter();

  function handleAddItem(e, recipe) {
    e.preventDefault(); // <-- prevent default action
    e.stopPropagation();
    dispatch(counterActions.increment(recipe));
  }
  async function handleRemoveItem(e, id) {
    e.preventDefault(); // <-- prevent default action
    e.stopPropagation();
    const res = await fetch("/api/meals/" + id, {
      method: "DELETE",
    });
    router.refresh();

  }
  return (
    <Link key={recipe._id} className="group" href={"meals/" + recipe._id}>
      <img src={recipe?.image} alt="" />
      <h3 className="mt-4 text-sm text-gray-700">{recipe.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">€{recipe.price}</p>
      <button
        onClick={(e) => {
          handleRemoveItem(e, recipe._id);
        }}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Remove
      </button>
      <button
        onClick={(e) => {
          handleAddItem(e, recipe);
        }}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Add to cart
      </button>
      <br />
    </Link>
  );
}
