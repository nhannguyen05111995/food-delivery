export default async function Page() {
    const res = await fetch('http://localhost:3000/api/meals');
    const data = await res.json()
    console.log(data);
    
    return (
        <div>
            <h1>Meals</h1>
            <p>Here are the meals we offer.</p>
        </div>
    );
}
