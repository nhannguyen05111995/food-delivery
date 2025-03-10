import { getData } from "@/lib/actions.ts";
import Link from "next/link";
export default async function Page({ params }) {
  const { slug } = await params;
  const meal = await getData(slug);

  return (
    <div>
      <h1>{meal.name}</h1>
      <img src={meal?.image} alt="" width={400} />
      <Link href={`/meals/edit/${slug}`} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Edit</Link>
    </div>
  );
}
