import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import { mongodbInit } from "@/lib/mongodb";

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