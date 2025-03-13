"use client";
import Link from "@/node_modules/next/link";
import Input from "./Input";

export default function Page() {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const res = await fetch("/api/login/", {
      method: "POST",
      body: formData,
    });
    if (res.status == 200) {
      window.location.href = "/";
    } else alert(res.statusText);
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
          name: "password",
          type: "password",
          data_error: "",
          id: "password",
          placeholder: "Password",
        }}
      />
      <button
        style={{ display: "block" }}
        className="d-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Login
      </button>
      <br />
      <Link
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        href="/signup"
      >
        Sign up
      </Link>
    </form>
  );
}
