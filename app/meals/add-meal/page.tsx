'use client';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
    let [errors, setErrors] = useState<string[]>([])
    let [loading, setLoading] = useState<boolean>(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        setLoading(true)
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        const yy = {}
        let err: string[] = []
        for (let [key, value] of formData.entries()) {
            value = value.trim()
            yy[key] = value
            if (!value) {
                err.push(key)
            }
        }
        setErrors(err)

        if (err.length) {
            setLoading(false)
            return
        }
        const res = await fetch('/api/meals', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(yy),
        });
        const data = await res.json()
        setLoading(false)
        if(data.status === 'success'){
            redirect('/')

        }

    }
    return (
        <div>
            <h1>Meals</h1>
            <form onSubmit={handleSubmit}>
                <div className="control-row">
                    <div>
                        <label htmlFor="name">Name</label>
                        <input className={errors.includes('name') ? 'error' : ''} type="text" name="name" id="name" />
                    </div>

                    <div >
                        <label htmlFor="cuisine">Cuisine</label>
                        <input className={errors.includes('cuisine') ? 'error' : ''} id="cuisine" type="text" name="cuisine" />
                    </div>
                    
                    <div >
                        <label htmlFor="price">Price</label>
                        <input className={errors.includes('price') ? 'error' : ''} id="price" type="number" name="price" />
                    </div>
                </div>

                <div className="form-actions">
                    <button className="button" type="submit" disabled={loading}>
                        Add meal
                    </button>
                </div>
            </form>
        </div>
    );
}



