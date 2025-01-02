type Config = {
  NEXT_PUBLIC_API_URL: string;
  API_TOKEN: string;
};

const env: Config = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  API_TOKEN: process.env.API_TOKEN || "",
};

export default env;
