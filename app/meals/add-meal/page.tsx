"use client";
import React, { useState } from "react";
import Form from "@/component/Form";

export default function Page() {
    let [image, setImage] = useState<string>();
  
    async function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    const form = [
        { name: "name", type: "text", data_error: "", id: "name", placeholder: "Name" },
        { name: "cuisine", type: "text", data_error: "", id: 'cuisine', placeholder: 'Cuisine' },
        {
            name: "price",
            id: "price",
            type: "number",
            data_error: "",
            inputMode: "numeric",
            step: "any",
            placeholder: 'Price'
        },
        {
            name: "image_file",
            type: "file",
            data_error: "",
            accept: "image/*",
            id: 'image_file',
            onChange: (e)=>{onImageChange(e)}
        }

    ];

    return (
        <div className="mt-5">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
                We invest in the world’s potential
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                Here at Flowbite we focus on markets where technology, innovation, and
                capital can unlock long-term value and drive economic growth.
            </p>
            <Form props={{ form, image }} />
        </div>
    );
}
