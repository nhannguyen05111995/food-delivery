import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb';

export async function GET() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    try {
        const db = client.db('food-delivery');
        const meetupsCollection = await db.collection('meals');
        const json = await meetupsCollection.find({}).toArray();
        return NextResponse.json(json);
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}

function validate(value, body) {
    if (!body[value]) {
        return `${value} is required`;
    }
    return '';

}

export async function POST(req) {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const body = await req.json();
    const errors = validate('name', body) || validate('cuisine', body)
    if (errors) {
        return NextResponse.json({ message: errors, status: 'failed' });
    }
    try {
        const db = client.db('food-delivery');
        await db.collection("meals").insertOne(body);
        return NextResponse.json({ message: 'Meal added', status: 'success' });
    } catch (err) {
        return NextResponse.json({ message: err.message, status: 'failed' });
    }
}