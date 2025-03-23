import NewsContentCard from '@/components/content/NewsContent';
import { getTopHeadlines } from '@/services/news.service';
import React from 'react'

const TopPage = async () => {
    const articles = await getTopHeadlines();
    if (!articles || articles.length === 0) {
        return <div className="text-center py-8">Belum ada berita</div>;
    }

    return (
        <>
            <main className="w-full grid lg:grid-cols-3 items-center justify-center gap-8">
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
            </main>
        </>
    )
}

export default TopPage