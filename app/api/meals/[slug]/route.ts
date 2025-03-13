import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import { mongodbInit } from "@/lib/mongodb";
import { validate } from "../route";
import { uploadToS3 } from "@/lib/actions";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const param = await params
    const slug = param.slug
    try {
        const collection = await mongodbInit()
        const json = await collection.findOne({ _id: ObjectId(slug) });
        return NextResponse.json(json);
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const param = await params
    const slug = param.slug
    try {
        const formData = await req.formData();
        const err: boolean = !validate("name", formData) || !validate("cuisine", formData) || !validate("price", formData)
        if (err) {
            return NextResponse.json({ message: "Missing fields!", status: 'failed' });
        }
        let object: Record<string, string | File> = {};

        formData.forEach(function (value, key) {
            object[key] = value
        });
        const image_file = formData.get('image_file') as File
        if (image_file && (image_file as File).size > 0) {
            const link = await uploadToS3(image_file)
            object['image'] = link

        }
        delete object["image_file"]
        const collection = await mongodbInit()
        await collection.updateOne({ _id: ObjectId(slug) }, { $set: object });
        return NextResponse.json({ message: 'Meal edited', status: 'success' });

    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}


export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const param = await params
    const slug = param.slug
    try {
        const collection = await mongodbInit()
        const json = await collection.deleteOne({ _id: ObjectId(slug) });
        return NextResponse.json(json);
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}