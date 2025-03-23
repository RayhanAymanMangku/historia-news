interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

interface PaginationControlsProps {
    currentPage: number;
    totalResults: number;
    pageSize?: number;
    totalPages: number
}

export {
    Article,
    NewsResponse,
    PaginationControlsProps
}
