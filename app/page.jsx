import { getData } from "../lib/actions.ts"
import Item from "../component/Item"
export default async function Page() {
    const data = await getData()    
    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.map((recipe) => (
                <Item recipe={recipe} key={recipe._id} />
            ))}
        </div>
    )
}