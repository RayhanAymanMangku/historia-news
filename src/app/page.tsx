import NewsContentCard from "@/components/content/NewsContent";
import PaginationControls from "@/components/custom/PaginationControls";
import SearchComponent from "@/components/custom/SearchNews";
import { getNews } from "@/services/news.service";
import React from "react";
import { FaNewspaper } from "react-icons/fa6";
export default async function Home({ searchParams }:
  { searchParams: { [key: string]: string | string[] | undefined } }) {

  const page = Number(searchParams.page) || 1;
  const { articles, totalResults } = await getNews(page);

  return (
    <>
      <main className="w-full">
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
          totalPages={totalResults / 10}
        />
      </main>

    </>
  );
}
