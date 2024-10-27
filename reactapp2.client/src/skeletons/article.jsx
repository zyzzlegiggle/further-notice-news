import { useState, useEffect } from "react";
import { addBookmark, deleteBookmark, getBookmarks } from "../util/bookmark";
import { getRandomInt } from "../util/util";
import defaultImage from "../assets/error_img.jpg";

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
        }

        fetchBookmarks();
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        let rows = [];
        let i = 0;
        while (i < Object.keys(articles).length) {
            const template = (
                <section className="grid grid-rows-2 grid-cols-3 gap-8 border-b mb-8 pb-8">
                    <a key={articles[i]["url"]} href={articles[i]["url"]} className="row-span-2 col-span-2">
                        <article>
                            <h1 className="text-3xl font-bold">
                                {articles[i]["title"]}
                            </h1>
                            <ArticleMenu article={articles[i]} bookmarked={bookmarked} />
                            <p className="text-justify">
                                {articles[i]["description"]}
                            </p>
                            <img
                                className="h-128 w-full mx-auto rounded"
                                src={articles[i]["urlToImage"] || ''}
                                alt="image not found"
                                onError={( currentImg ) => {
                                    currentImg.onerror = null; // prevent looping
                                    currentImg.src = defaultImage;

                                }}
                            />
                        </article>
                    </a>
                    {(() => {
                        const sideArticles = [];
                        for (let j = 1; j <= 2; j++) {
                            if (articles[i + j]) {
                                sideArticles.push(
                                    <SideArticle article={articles[i + j]} bookmarked={bookmarked} classes="row-span-1 col-span-1 border-b" />             
                                );
                            } else {
                                break;
                            }
                        }
                        return sideArticles;
                    })()}


                </section>
            );

            const template2 = (
                <section>
                    <a href={articles[i]["url"]}>
                        <article>
                            <h1 className="text-3xl font-bold">
                                {articles[i]["title"]}
                            </h1>
                            <span><ArticleMenu article={articles[i]} bookmarked={bookmarked} /></span>
                            <p className="text-justify ">{articles[i]["description"]}</p>
                            <div className="flex flex-row pt-8">
                                <div className="basis-1/6"></div>
                                <article className="basis-4/6">
                                    <img className="rounded h-128 w-full place-items-center " src={articles[i]["urlToImage"] || ''} alt={articles[0]["title"]} />
                                </article>
                                <div className="basis-1/6"></div>
                            </div>
                        </article>
                    </a>

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

function ArticleMenu({ article, bookmarked }) {
    const [bookmarkActive, setBookmarkActive] = useState(false); // true means can bookmark, false mean already bookmarked

    useEffect(() => {
        if (bookmarked.length) {
            const found = bookmarked.some(bookmark => bookmark.url === article.url);
            setBookmarkActive(found);
        }
    }, [bookmarked, article]);

    const handleClick = async () => {
        if (!bookmarkActive) {
            await addBookmark(article);
        } else {
            await deleteBookmark(article);
        }
        setBookmarkActive(prev => !prev);
    };

    const menuClasses = "inline-block pr-4"
    return (
        <ul>
            <li className={menuClasses} ><p>{article["source"]["name"]}</p></li>
            <li className={menuClasses}><p>{article["publishedAt"].split("T")[0]}</p></li>
            <li className={menuClasses}><i onClick={handleClick} className={`${bookmarkActive ? "fa-solid" : "fa-regular"} fa-bookmark cursor-pointer`}></i></li>
            <li className={menuClasses}><i className="fa-solid fa-share cursor-pointer"></i></li>
        </ul>
        
    );
}

function SideArticle({ article, bookmarked, classes="" }) {
    return (
        <a key={article["url"]} href={article["url"]} className={classes} >
            <article>
                <h1 className="text-xl font-semibold">
                    {article["title"]}
                </h1>
                <span>
                    <ArticleMenu article={article} bookmarked={bookmarked} />
                </span>
                <p>{article["description"]}</p>
            </article>
        </a>
    )
}



export default Article;