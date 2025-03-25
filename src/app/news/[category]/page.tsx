import Loading from '@/app/loading';
import NewsContentCard from '@/components/content/NewsContent';
import { getSourcesByCategory } from '@/services/news.service';
import { Suspense } from 'react';
import { FaNewspaper } from 'react-icons/fa6';

const NewsByCategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
    const { category } = await params; // Await the params object

    if (!category) {
        return <div className="text-center py-8">Category not found</div>;
    }

    const articles = await getSourcesByCategory(category);

    if (!articles || articles.length === 0) {
        return <div className="text-center py-8">Belum ada berita</div>;
    }

    return (
        <main className="w-full">
            <div className="pb-8 w-full flex items-center gap-4">
                <FaNewspaper className="h-6 w-6 text-black" />
                <h1 className="text-3xl font-bold text-start capitalize">{category}</h1>
            </div>
            <div className="grid lg:grid-cols-3 items-center justify-center gap-8">
                <Suspense fallback={<Loading />}>
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
                </Suspense>
            </div>
        </main>
    );
};

export default NewsByCategoryPage;