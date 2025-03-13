'use client'
import Input from "@/component/Input";
import { redirect } from "next/navigation";
import { JSX, useState } from "react";
export default function Form({ props }: { props: { [key: string]: any } }): JSX.Element {
  const [loading, setLoading] = useState(false)
  const form = props.form

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

    if (err.length) {
      setLoading(false);
      return;
    }

    const ID = formData.get("id") || ""
    const res = await fetch("/api/meals/" + ID, {
      method: ID ? "PUT" : 'POST',
      body: formData,
    });
    const data = await res.json();
    setLoading(false);
    if (data.status === "success") {
      redirect("/");
    }
  }

  return (
    <div className="w-full">
      <form
        className="pt-6 pb-8 mb-4 max-w-xs mx-auto"
        onSubmit={handleSubmit}
      >
        {form.map((input) => (
          <div className="mb-4" key={input.id}>
            <Input
              props={input}
            />
          </div>
        ))}
        {props.image && <img alt="preview image" src={props.image} />}

        <div className="flex items-center justify-between form-action">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            Add meal
          </button>
        </div>
      </form>
    </div>
  );
}
