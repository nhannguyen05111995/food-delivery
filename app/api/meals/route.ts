import { mongodbInit } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/actions";
import { requireAuth } from "@/lib/actions";

export type Meal = {
    name: string,
    cuisine: string,
    description: string,
    price: number,
    image: string,
    _id: string
}

export async function GET(req: { url: string | URL | undefined; }) {
    const authenticated = await requireAuth()
    if (!authenticated)
        return NextResponse.json({}, { status: 401, statusText: "Unauthenticated!" });
    try {
        const collection = await mongodbInit()
        const json: Meal[] = await collection.find({}).toArray();
        return NextResponse.json(json);
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}



export function validate(value: string, formData: FormData): boolean {
    if (formData.get(value)) {
        return true
    }
    return false;

}

export async function POST(req: Request) {
    const authenticated = await requireAuth()
    if (!authenticated)
        return NextResponse.json({}, { status: 401, statusText: "Unauthenticated!" });
    try {
        const formData = await req.formData();
        const err: boolean = !validate("name", formData) || !validate("cuisine", formData) || !validate("price", formData)
        if (err) {
            return NextResponse.json({ message: "Missing fields!", status: 'failed' });
        }
        const link = await uploadToS3(formData.get('image_file') as File)
        let object: Record<string, string | File> = {};
        formData.forEach(function (value, key) {
            object[key] = value
        });
        object['image'] = link
        const collection = await mongodbInit()
        await collection.insertOne(object);
        return NextResponse.json({ message: 'Meal added', status: 'success' });
    } catch (err) {
        return NextResponse.json({ message: err.message, status: 'failed' });
    }
} 