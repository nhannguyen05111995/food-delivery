import { NextResponse } from 'next/server';
import { mongodbInit } from '@/lib/mongodb';
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const err: boolean = !formData.get('email') || !formData.get('password')
        if (err) {
            return NextResponse.json({}, { status: 400, statusText: "Missing field!" });
        }
        console.log(formData);
        
        const collection = await mongodbInit("users")
        let object: Record<string, string> = {};
        formData.forEach(function (value, key) {
            object[key] = value
        });
        object.sessions = ""
        const saltRounds = 10;
        const hash = bcrypt.hashSync(object.password, saltRounds);

        object.password = hash

        await collection.insertOne(object);

        return NextResponse.json({}, { status: 200, statusText: "Success" });
    } catch (err) {
        console.log(err);
        
        return NextResponse.json({}, { statusText: "Something went wrong!", status: 400 });
    }
}