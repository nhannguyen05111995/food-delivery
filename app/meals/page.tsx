export default async function Page() {
    const res = await fetch('/api/meals');
    const data = await res.json()    
    return (
        <div>
            <h1>Meals</h1>
            <p>Here are the meals we offer.</p>
        </div>
    );
}
