"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { counterActions } from "../lib/cart";
import { useRouter } from "next/navigation";
import type { Meal } from "@/app/api/meals/route";


export default function Item({ meal }: { meal: Meal }) {
  const dispatch = useDispatch();
  const router = useRouter();

  function handleAddItem(e: React.MouseEvent<HTMLButtonElement>, meal: Meal) {
    e.preventDefault(); // <-- prevent default action
    e.stopPropagation();
    dispatch(counterActions.increment(meal));
  }
  async function handleRemoveItem(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault(); // <-- prevent default action
    e.stopPropagation();
    await fetch("/api/meals/" + id, {
      method: "DELETE",
    });
    router.refresh();

  }

  return (
    <div key={meal._id} className="group">
      <img src={meal?.image} alt="" />
      <h3 className="mt-4 text-sm text-gray-700">{meal.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">€{meal.price}</p>
      <button
        onClick={(e) => {
          handleRemoveItem(e, meal._id);
        }}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Remove
      </button>
      <Link
        href={"meals/edit/" + meal._id}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Edit
      </Link>
      <Link
        href={"meals/" + meal._id}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        See more
      </Link>
      <button
        onClick={(e) => {
          handleAddItem(e, meal);
        }}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Add to cart
      </button>
      <br />
    </div>
  );
}
