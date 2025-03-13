"use client"
import Input from "@/component/Input";

export default function Login() {
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const res = await fetch("/api/signup/", {
            method: 'POST',
            body: formData,
        });

    };

    return (
        <form onSubmit={handleSubmit}>
            <Input props={{ name: "email", type: "email", data_error: "", id: "email", placeholder: "Email" }} />
            <Input props={{ name: "name", type: "text", data_error: "", id: "name", placeholder: "Name" }} />
            <Input props={{ name: "password", type: "password", data_error: "", id: "password", placeholder: "Password" }} />
            <button type="submit">Sign up</button>
        </form>

    )
}