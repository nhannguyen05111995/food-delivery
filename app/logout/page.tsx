"use client"
import { useEffect } from "react";

export default function Logout() {
    useEffect(() => {
        async function logout() {
            await fetch("/api/logout/");
        }
        logout()

    }, [])


    return (
        <h1>Logout</h1>

    )
}