import { MongoClient } from 'mongodb';

export async function mongodbInit(name: string = "") {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = client.db(process.env.MONGODB_DATABSE);
    const collection = await db.collection(name || process.env.MONGODB_COLLECTION);
    return collection
}