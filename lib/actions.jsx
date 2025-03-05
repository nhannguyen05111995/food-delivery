export async function getData() {
    const res = await fetch('http://localhost:3000/api/meals', {
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getSingleMeal(slug) {
    const res = await fetch('/api/meals' + slug)
    return res.json()
}