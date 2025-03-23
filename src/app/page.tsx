import NewsContentCard from "@/components/content/NewsContent";
import PaginationControls from "@/components/custom/PaginationControls";
import { getNews } from "@/services/news.service";
import React from "react";
export default async function Home({ searchParams }:
  { searchParams: { [key: string]: string | string[] | undefined } }) {

  const page = Number(searchParams.page) || 1;
  const { articles, totalResults } = await getNews(page);


  return (
    <>
      <main className="w-full h-screen">
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
          totalPages={totalResults / 10}
        />
      </main>

    </>
  );
}
