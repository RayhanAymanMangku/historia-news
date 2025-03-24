import dotenv from 'dotenv';

dotenv.config();

export const NEWS_API_KEY = process.env.NEWS_API_KEY as string;
export const NEWS_ENDPOINT = process.env.NEWS_ENDPOINT as string;