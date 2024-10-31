import { useState, useEffect } from "react";
import { addBookmark, deleteBookmark, getBookmarks } from "../util/bookmark";
import { getRandomInt } from "../util/util";
import defaultImage from "../assets/error_img.jpg";
import ArticleMenu from "./article-menu";
function Article({ articles }) {
    const [bookmarked, setBookmarked] = useState([]);
    const [articleRows, setArticleRows] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    if (Object.keys(articles).length === 0) {
        return <p>No articles</p>;
    }
    useEffect(() => {
        const fetchBookmarks = async () => {
            const data = await getBookmarks();
            setBookmarked(data);
            setIsLoaded(true);
            console.log(articles);
        }

        fetchBookmarks();
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        let rows = [];
        let i = 0;
        while (i < Object.keys(articles).length) {
            const template = (
                <section className="flex flex-row gap-8 border-b mb-8 pb-8">
                    <article className="basis-2/3">
                        <a href={articles[i]["url"]}>
                            <h1 className="text-3xl font-bold">
                                {articles[i]["title"]}
                            </h1>
                        </a>
                        <ArticleMenu article={articles[i]} bookmarked={bookmarked} />
                        <p className="text-justify pt-2">
                            {articles[i]["description"]}
                        </p>
                        <a href={articles[i]["url"]}>
                            <img
                                className="h-128 w-full mx-auto rounded pt-4"
                                src={articles[i]["urlToImage"] || ''}
                                alt="image not found"
                                onError={(currentImg) => {
                                    currentImg.onerror = null; // prevent looping
                                    currentImg.src = defaultImage;

                                }}
                            />
                        </a>
                    </article>
                    
                    <div className="flex flex-col basis-1/3">
                        {(() => {
                            const sideArticles = [];
                            for (let j = 1; j <= 2; j++) {
                                if (articles[i + j]) {
                                    sideArticles.push(
                                        <SideArticle article={articles[i + j]} bookmarked={bookmarked} classes="pb-4 pt-4 border-b" />
                                    );
                                } else {
                                    break;
                                }
                            }
                            return sideArticles;
                        })()}
                    </div>
                   

                </section>
            );

            const template2 = (
                <section>
                    
                    <article>
                        <a href={articles[i]["url"]}>
                            <h1 className="text-3xl font-bold">
                                {articles[i]["title"]}
                            </h1>
                        </a>
                        <span><ArticleMenu article={articles[i]} bookmarked={bookmarked} /></span>
                        <p className="text-justify pt-2">{articles[i]["description"]}</p>
                        <div className="flex flex-row pt-8">
                            <div className="basis-1/6"></div>
                            <a href={articles[i]["url"]} className="basis-4/6">
                                <img className="rounded h-128 w-full place-items-center " src={articles[i]["urlToImage"] || ''} alt={articles[0]["title"]} />
                            </a>
                            <div className="basis-1/6"></div>
                        </div>
                    </article>
                    <section className="grid grid-cols-3 gap-8 border-b mb-8 pb-8 pt-8">
                        {(() => {
                            const sideArticles = [];
                            for (let j = 1; j <= 3; j++) {
                                if (articles[i + j]) {
                                    sideArticles.push(
                                        <SideArticle article={articles[i + j]} bookmarked={bookmarked} classes={`col-span-1 ${j === 3 ? '' : 'border-r'} px-4 static`} />
                                    );
                                } else {
                                    break;
                                }
                            }
                            return sideArticles;
                        })()}

                    </section>
                </section>
            );

            if (getRandomInt(2) === 0) {
                rows.push(template);
                i += 3; // template uses 3 article, so move to index three on next iteration
            } else {
                rows.push(template2);
                i += 4;  // template uses 4 articles, so move to index four on next iteration
            }
        }
        setArticleRows(rows);

    }, [bookmarked, articles, isLoaded]);

    return (
        <>
            {articleRows ? articleRows : <p>Loading</p>}
        </>
        
    )

}
function SideArticle({ article, bookmarked, classes="" }) {
    return (
        <article className={classes}>
            <a href={article["url"]} >
                <h1 className="text-xl font-semibold">
                    {article["title"]}
                </h1>
            </a>
            <ArticleMenu article={article} bookmarked={bookmarked} />
            <p className="pt-2">{article["description"]}</p>
        </article>
    )
}



export default Article;