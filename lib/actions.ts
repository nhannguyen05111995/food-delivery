import { mongodbInit } from "./mongodb";
import { cookies } from 'next/headers'
import { ObjectId } from 'mongodb';
import { redirect } from 'next/navigation'

export async function getData(slug = ''): Promise<Meal | Meal[]> {
    const res = await fetch('http://localhost:3000/api/meals/' + slug, {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },

    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

import type { Meal } from "@/app/api/meals/route";
//S3 Config
import {
    S3Client,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";

const Bucket = process.env.AWS_BUCKET_NAME;
const s3 = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string,
    },
});
// endpoint to get the list of files in the bucket
export async function uploadToS3(file: File) {
    const originalname = file.name
    const fileName = `${uuidv4()}-${originalname}`;
    const Body = await file.arrayBuffer()
    await s3.send(new PutObjectCommand({ Bucket, Key: fileName, Body }));
    const encodeFileName = encodeURIComponent(fileName);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${encodeFileName}`;
}

// Create a session and set the sessionId cookie
export async function createSessionAndCookie(userId: string) {
    const SESSION_DURATION_DAYS = 7
    /*    const expiresAt = new Date()
       expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS) */
    const collection = await mongodbInit("session")
    const user_col = await mongodbInit("users")


    const session = await collection.insertOne({
        userId,
        //expiresAt,
    })
    await user_col.updateOne({ _id: ObjectId(userId) }, { $set: { sessions: session.ops[0]._id } });
    const c = await cookies()

    // Set session cookie
    c.set('sessionId', session.ops[0]._id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        //expires: new Date(session.expiresAt),
    })
    console.log(c.get("sessionId"));

}

export async function getCurrentUser() {
    const c = await cookies()
    const sessionId = c.get('sessionId')?.value
    
    if (!sessionId) return false

    const collection = await mongodbInit("session")
    const user_col = await mongodbInit("users")

    const session = await collection.findOne({ _id: ObjectId(sessionId) })
    const user = await user_col.findOne({}, { sessions: ObjectId(sessionId) })

    if (!session || !user) {
        c.delete('sessionId')
        return false
    }

    return true
}

export async function requireAuth() {
    const user = await getCurrentUser()
    return user
}

// Removes the session from the database and removes the cookie
export async function signOut() {
    const c = await cookies()
    const sessionId = c.get('sessionId')?.value

    if (sessionId) {
        const collection = await mongodbInit("session")
        await collection.deleteOne({ _id: ObjectId(sessionId) });
    }

    c.delete('sessionId')
    return redirect('/login')
}