import env from "@/utils/config";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: env.S3_REGION,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
});

export async function POST(request: Request) {
  if (request.method !== "POST") return Response.json({ ok: false, error: "Method Not Allowed" }, { status: 405 });
  const { file_name } = await request.json();

  if (!file_name) {
    return Response.json({ ok: false, error: "file_name parameter is required" }, { status: 400 });
  }

  const command = new GetObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: file_name,
  });

  const url = await getSignedUrl(client, command, { expiresIn: 60 });

  return Response.json({ ok: true, data: { url: url } }, { status: 200 });
}
