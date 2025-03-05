export async function getData(slug = '') {
    const res = await fetch('http://localhost:3000/api/meals/' + slug, {
        method: 'GET',
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