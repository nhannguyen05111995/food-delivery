'use client'
import { useEffect, useState } from "react"
import { Meal } from "./api/meals/route"
import Item from "@/component/Item"
export default function Page() {
    const [data, setData] = useState<Meal[]>([])
    useEffect(() => {
        fetchData()
    }, [])
    async function fetchData() {
        const res = await fetch('/api/meals/', {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },

        })

        const json = await res.json()
        setData(json)
    }
    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.map((meal) => (
                <Item meal={meal} key={meal._id} />
            ))}
        </div>
    )
}