'use client';
import { useState } from 'react';

export default function Page() {
    let [errors, setErrors] = useState<string[]>([])
    let [res, setRes] = useState<string>('')
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        setRes('')
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
        setRes(data.message)

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
                    <p>{res}</p>
                    <button className="button" type="submit">
                        Add meal
                    </button>
                </div>
            </form>
        </div>
    );
}



