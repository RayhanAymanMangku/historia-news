"use client";

import NewsContentCard from "@/components/content/NewsContent";
import PaginationControls from "@/components/custom/PaginationControls";
import SearchComponent from "@/components/custom/SearchNews";
import { getNews } from "@/services/news.service";
import React, { useEffect, useState } from "react";
import { FaNewspaper } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { Article } from "@/types/news";
import Loading from "./loading";

export default function Home() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [articles, setArticles] = useState<Article[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const { articles, totalResults } = await getNews(page);
        setArticles(articles);
        setTotalResults(totalResults);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [page]);

  // tanpa suspense karena csr
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!articles || articles.length === 0) {
    return <div className="text-center py-8">No news yet</div>;
  }

  return (
    <>
      <main className="max-w-full">
        <div className="pb-8 w-full flex justify-between">
          <div className="flex items-center gap-4">
            <FaNewspaper className="h-6 w-6 text-black" />
            <h1 className="text-3xl font-bold text-start">Latest news</h1>
          </div>
          <div>
            <SearchComponent />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 items-center justify-center gap-8">

          {articles.map((article) => (
            <NewsContentCard
              key={`${article.url}-${article.publishedAt}`}
              title={article.title}
              content={article.content || ""}
              urlToImage={article.urlToImage || ""}
              url={article.url}
              name={article.source.name}
              publishedAt={article.publishedAt}
              author={article.author || ""}
            />
          ))}
        </div>
        <PaginationControls
          currentPage={page}
          totalPages={Math.ceil(totalResults / 10)}
        />
      </main>
    </>
  );
}