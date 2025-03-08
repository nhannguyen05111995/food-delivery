export async function getData(slug = '') {
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

//S3 Config
import {
    S3Client,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

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

