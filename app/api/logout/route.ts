import { NextResponse } from 'next/server';
import { ObjectId } from "mongodb"
import { cookies } from 'next/headers';
import { mongodbInit } from '@/lib/mongodb';

export async function GET(req: Request) {
    try {
        const c = await cookies()
        const sessionId = c.get('sessionId')?.value
        if (sessionId) {
            const collection = await mongodbInit("session")
            await collection.deleteOne({ _id: ObjectId(sessionId) });
        }
        c.delete('sessionId')

        return NextResponse.json({}, { statusText: "Logout!", status: 200 });

    } catch (err) {
        console.log(err);

        return NextResponse.json({}, { statusText: "Something went wrong!", status: 400 });
    }
}