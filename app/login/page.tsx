"use client"
import Input from "@/component/Input";

export default function Login() {
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const res  = await fetch("/api/login/", {
          method: 'POST',
          body: formData,
        });
        console.log(res);
        

    };

    return (
        <form onSubmit={handleSubmit}>
            <Input props={{ name: "email", type: "email", data_error: "", id: "email", placeholder: "Email" }} />
            <Input props={{ name: "password", type: "password", data_error: "", id: "password", placeholder: "Password" }} />
            <button type="submit">Login</button>
        </form>

    )
}