'use client';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import Input from '../../../component/Input'

export default function Page() {
    let [errors, setErrors] = useState<string[]>([])
    let [loading, setLoading] = useState<boolean>(false)
    let [image, setImage] = useState<string>('')

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

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
        console.log('err', err, formData.entries());

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
        if (data.status === 'success') {
            redirect('/')

        }

    }
    return (
        <div className='mt-5'>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">We invest in the world’s potential</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
            
            <div className="w-full ">
                <form className="pt-6 pb-8 mb-4 max-w-xs mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input props={{ name: 'name', 'type': 'text', 'errors': errors }} />
                    </div>
                    <div className="mb-4">
                        <Input props={{ name: 'cuisine', 'type': 'text', 'errors': errors }} />

                    </div>
                    <div className="mb-4">
                        <Input props={{ name: 'description', 'type': 'text', 'errors': errors }} />
                    </div>
                    <div className="mb-4">
                        <Input props={{ name: 'price', 'type': 'number', 'errors': errors }} />
                    </div>
                    <div className="mb-4">
                        <Input props={{ name: 'image', 'type': 'file', 'errors': errors, onChange: onImageChange, accept: 'image/png, image/jpeg' }} />
                        {image && <img alt="preview image" src={image} />}

                    </div>
                    <div className="flex items-center justify-between form-action">
                        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={loading}>
                            Add meal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}



