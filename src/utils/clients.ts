import { S3Client } from "@aws-sdk/client-s3";

export const s3client = new S3Client({
    region: "us-east-2",
    credentials: {
        accessKeyId: "AKIA4MTWK5DZZOJRCK4C",
        secretAccessKey: "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",
    },
});