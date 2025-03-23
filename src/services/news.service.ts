"use server"

import { NEWS_API_KEY } from "@/lib/env";
import { Article, NewsResponse } from "@/types/news";

if (!NEWS_API_KEY) {
    throw new Error("NEWS_API_KEY is not defined. Please set it in your environment variables.");
}

export async function getNews(page: number): Promise<{ articles: Article[]; totalResults: number }> {
    const queryParams = new URLSearchParams({
        q: "bitcoin",
        apiKey: NEWS_API_KEY,
        page: page.toString(),
        pageSize: "10", // Adjust the number of articles per page
    });

    const res = await fetch(`https://newsapi.org/v2/everything?${queryParams}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    }

    const data: NewsResponse = await res.json();
    return { articles: data.articles, totalResults: data.totalResults };
}

export async function getTopHeadlines(): Promise<Article[]> {
    const queryParams = new URLSearchParams({
        country: "us",
        apiKey: NEWS_API_KEY,
    });

    const res = await fetch(`https://newsapi.org/v2/top-headlines?${queryParams}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch top headlines: ${res.status} ${res.statusText}`);
    }

    const data: NewsResponse = await res.json();
    return data.articles;
}