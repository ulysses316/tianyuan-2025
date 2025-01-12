type Config = {
  NEXT_PUBLIC_API_URL: string;
  API_TOKEN: string;
  S3_ACCESS_KEY: string;
  S3_SECRET_KEY: string;
  S3_BUCKET_NAME: string;
  S3_REGION: string;
  NEXT_PUBLIC_URL: string;
};

const { NEXT_PUBLIC_API_URL, API_TOKEN, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME, S3_REGION, NEXT_PUBLIC_URL } =
  process.env;

const env: Config = {
  NEXT_PUBLIC_API_URL: NEXT_PUBLIC_API_URL || "",
  API_TOKEN: API_TOKEN || "",
  S3_ACCESS_KEY: S3_ACCESS_KEY || "",
  S3_SECRET_KEY: S3_SECRET_KEY || "",
  S3_BUCKET_NAME: S3_BUCKET_NAME || "",
  S3_REGION: S3_REGION || "",
  NEXT_PUBLIC_URL: NEXT_PUBLIC_URL || "",
};

export default env;
