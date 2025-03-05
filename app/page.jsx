import { getData } from "../lib/actions.ts"
import Item from "../component/Item"
export default async function Page() {
    const data = await getData()    
    return (
        <div>
            {data.map((recipe) => (
                <Item recipe={recipe} key={recipe._id} />
            ))}
        </div>
    )
}