import { NextResponse } from 'next/server';
import { mongodbInit } from '@/lib/mongodb';
import bcrypt from "bcrypt"
import { createSessionAndCookie } from "@/lib/actions"

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const err: boolean = !formData.get('email') || !formData.get('password')
        if (err) {
            return NextResponse.json({}, { status: 200, statusText: "Missing field!" });
        }
        const collection = await mongodbInit("users")
        const user = await collection.findOne({ email: formData.get("email") });

        if (user) {
            const pass = user.password
            const matched = bcrypt.compareSync(formData.get('password'), pass);
            if (matched) {
                await createSessionAndCookie(user._id)
                return NextResponse.json({}, { status: 200, statusText: matched ? "Yes" : "No" });

            }

            return NextResponse.json({}, { status: 401, statusText: "Check your account!" });

        }
        else {
            return NextResponse.json({}, { status: 401, statusText: "Check your account!" });

        }

    } catch (err) {
        console.log(err);

        return NextResponse.json({}, { statusText: "Something went wrong!", status: 400 });
    }
}