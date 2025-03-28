"use client";
import Input from "@/component/Input";
import { redirect } from "@/node_modules/next/navigation";

export default function Login() {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const res = await fetch("/api/signup/", {
      method: "POST",
      body: formData,
    });
    if (res.status == 200) {
      redirect("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        props={{
          name: "email",
          type: "email",
          data_error: "",
          id: "email",
          placeholder: "Email",
        }}
      />
      <Input
        props={{
          name: "name",
          type: "text",
          data_error: "",
          id: "name",
          placeholder: "Name",
        }}
      />
      <Input
        props={{
          name: "password",
          type: "password",
          data_error: "",
          id: "password",
          placeholder: "Password",
        }}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign up
      </button>
    </form>
  );
}
