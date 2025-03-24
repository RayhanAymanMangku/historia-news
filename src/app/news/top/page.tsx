import NewsContentCard from '@/components/content/NewsContent';
import { getTopHeadlines } from '@/services/news.service';
import React from 'react'
import { FaNewspaper } from 'react-icons/fa6';

const TopPage = async () => {
    const articles = await getTopHeadlines();
    if (!articles) {
        return <div className="text-center py-8">Belum ada berita</div>;
    }

    return (
        <>
            <main className="w-full">
                <div className="pb-8 w-full flex items-center gap-4">
                    <FaNewspaper className="h-6 w-6 text-black" />
                    <h1 className="text-3xl font-bold text-start">Top Headlines</h1>
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
            </main>
        </>
    )
}

export default TopPage