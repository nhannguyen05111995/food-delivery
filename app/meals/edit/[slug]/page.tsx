'use client'
import { getData } from "@/lib/actions";
import Form from "@/component/Form"
import { Suspense, useEffect, useState } from "react";
import { Meal } from "@/app/api/meals/route";
interface PageParams {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageParams) {
  const [meal, setMeal] = useState<Meal>({ _id: "", name: "", cuisine: "", price: 0, image: "", description: "" })
  const [form, setForm] = useState<Record<string, string | number | Function>[]>([])
  const [image, setImage] = useState("")
  function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  useEffect(() => {
    async function fetchMyAPI() {
      const { slug } = await params;
      const data = await getData(slug) as Meal;
      setMeal({ ...data });

    }
    fetchMyAPI()
  }, [])

  useEffect(() => {
    if (meal.name) {
      setImage(meal.image)
      setForm([
        { name: "id", type: "text", data_error: "", initial_value: meal._id, id: "id", },
        { name: "name", type: "text", data_error: "", initial_value: meal.name, id: "name", placeholder: "Name" },
        { name: "cuisine", type: "text", data_error: "", initial_value: meal.cuisine, id: 'cuisine', placeholder: 'Cuisine' },
        {
          name: "price",
          id: "price",
          type: "number",
          data_error: "",
          initial_value: meal.price,
          inputMode: "numeric",
          step: "any",
          placeholder: 'Price'
        },
        {
          name: "image",
          type: "text",
          data_error: "",
          id: 'image',
          initial_value: meal.image
        },
        {
          name: "image_file",
          type: "file",
          data_error: "",
          onChange: onImageChange,
          accept: "image/png, image/jpeg",
          id: 'image_file',
        }
      ])
    }
  }, [meal])



  return (
    <Suspense fallback="Loading...">
      <h1>{meal.name}</h1>
      <Form props={{ errors: [], form, image }} />
    </Suspense>

  );
}
