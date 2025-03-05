import { getSingleMeal } from "../../../lib/actions";
export default async function Page({ params }) {
    const { slug } = params;
    const meal = await getSingleMeal(slug);
    return (
        <div>
            <h1>{meal.name}</h1>
            <img src={meal.image} alt="" />
        </div>
    );
}