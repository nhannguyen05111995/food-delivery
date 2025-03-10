"use client";
import { redirect } from "next/navigation";
import React, { useRef, useState } from "react";
import Input from "@/component/Input";
import Form from "@/component/Form";

export default function Page() {
  let [errors, setErrors] = useState<string[]>([]);
  let [loading, setLoading] = useState<boolean>(false);
  let [image, setImage] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);

  async function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let err: string[] = [];
    for (let [key, value] of formData.entries()) {
      if (!value) {
        err.push(key);
      }
    }
    setErrors(err);

    if (err.length) {
      setLoading(false);
      return;
    }

    const res = await fetch("/api/meals", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setLoading(false);
    if (data.status === "success") {
      redirect("/");
    }
  }
  return (
    <div className="mt-5">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
        We invest in the world’s potential
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Here at Flowbite we focus on markets where technology, innovation, and
        capital can unlock long-term value and drive economic growth.
      </p>
      <Form props={{ loading, image, errors, handleSubmit, onImageChange }} />
    </div>
  );
}
