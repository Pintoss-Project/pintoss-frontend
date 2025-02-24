
const env = process.env.NODE_ENV
export const API_HOST_URL = env == "development" ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_FRONT_URL

