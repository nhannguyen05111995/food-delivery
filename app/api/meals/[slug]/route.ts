import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from 'mongodb';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const param = await params
    const slug = param.slug
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    try {
        const db = client.db('food-delivery');
        const meetupsCollection = await db.collection('meals');
        const json = await meetupsCollection.findOne({ _id: ObjectId(slug) });
        return NextResponse.json(json);
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
