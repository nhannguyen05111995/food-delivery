import { getData } from "../../../lib/actions.ts";
export default async function Page({ params }) {
    const { slug } = await params;    
    const meal = await getData(slug);
    console.log(meal);
    
    return (
        <div>
            <h1>{meal.name}</h1>
        </div>
    );
}