import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { FaArrowRight } from "react-icons/fa6";
import { Badge } from '../ui/badge';
import { FaRegClock } from "react-icons/fa6";

interface NewsContentCardProps {
    urlToImage: string;
    title: string;
    content: string;
    url: string;
    name: string
    publishedAt: string
    author?: string
}

const NewsContentCard = ({ urlToImage, title, content, url, name, publishedAt, author }: NewsContentCardProps) => {
    return (
        <div className="w-[400px] mx-auto">
            <Card className="overflow-hidden rounded-xl h-[560px] shadow-sm transition-all hover:shadow-xl pt-0 flex flex-col">
                <div className="relative h-[192px] w-full overflow-hidden">
                    <Image
                        src={urlToImage || "/images/articles.svg"}
                        alt="News thumbnail"
                        width={640}
                        height={192}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">{name}</Badge>
                </div>

                <div className="flex flex-col flex-grow">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FaRegClock className="h-4 w-4" />
                            <span>{publishedAt}</span>
                        </div>
                        <h3 className="text-xl font-bold leading-tight mt-1 hover:text-primary transition-colors">
                            <Link href="#">{title}</Link>
                        </h3>
                    </CardHeader>

                    <CardContent className="pb-2 flex-grow">
                        <p className="text-muted-foreground">
                            {content}
                        </p>
                    </CardContent>
                </div>

                <CardFooter className="flex items-center justify-between pt-2 mt-auto">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage alt="Author" />
                            <AvatarFallback>
                                {author
                                    ?.split(" ")
                                    .map((namePart) => namePart[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                            {author?.split(" ").slice(0, 2).join(" ")}
                        </span>
                    </div>
                    <Link href={url}>
                        <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary/80">
                            Read More<FaArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default NewsContentCard