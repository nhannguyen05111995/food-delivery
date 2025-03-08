import { MongoClient } from 'mongodb';

export async function mongodbInit() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DATABSE);
    const collection = await db.collection(process.env.MONGODB_COLLECTION);
    return collection
}