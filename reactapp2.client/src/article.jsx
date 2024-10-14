import { useState, useEffect } from "react";
import { addBookmark, deleteBookmark, getBookmarks } from "./util/bookmark";
import { useFetcher, Form } from "react-router-dom";


function Article({ articles }) {
    const [bookmarked, setBookmarked] = useState([]);
    const [bookmarkLoaded, setBookmarkLoaded] = useState(false);
    const [articleRows, setArticleRows] = useState([])

    if (Object.keys(articles).length === 0) {
        return <p>No articles</p>;
    }

    useEffect(() => {
        populateBooks();
    }, [bookmarked])

    useEffect(() => {
        let rows = [];

        for (let i = 0; i < Object.keys(articles).length; i++) {
            const contents = (
                <section key={i} className="grid grid-rows-3 grid-cols-2 gap-8 border-b mb-8 pb-8">
                    <article className="row-span-3 col-span-1" >
                        <h1 className="text-3xl">{articles[i]["title"]}</h1>
                        <p className="text-justify">{articles[i]["description"]}</p>
                        <img className="h-96 w-full" src={articles[i]["urlToImage"] || ''} alt={articles[0]["title"]} />
                        
                        <Button article={articles[i]} bookmarked={bookmarked} />
                    </article>
                    {i + 1 < Object.keys(articles).length && (
                        <>
                            <article className="row-span-1 col-span-1 border-b" >
                                <h1 className="text-xl">{articles[i + 1]["title"]}</h1>
                                <p className="text-justify">{articles[i + 1]["description"]}</p>
                                <Button article={articles[i + 1]} bookmarked={bookmarked} />
                            </article>
                        </>
                            
                    ) }
                    {i + 2 < Object.keys(articles).length && (
                       <>
                            <article className="row-span-1 col-span-1 border-b" >
                                <h1 className="text-xl">{articles[i + 2]["title"]}</h1>
                                <p className="text-justify">{articles[i + 2]["description"]}</p>
                                <Button article={articles[i + 2]} bookmarked={bookmarked} />
                            </article>
                            <div className="row-span-1"></div>
                       </>
                    )}
                </section>
            )
            const contents2 = (
                <>
                    <h1 className="text-3xl">{articles[i]["title"]}</h1>
                    <p className="text-justify">{articles[i]["description"]}</p>
                    <section className="flex flex-row pt-8">
                        <div className="basis-1/6"></div>
                        <article className="basis-4/6">
                            <img className="h-128 w-full place-items-center " src={articles[i]["urlToImage"] || ''} alt={articles[0]["title"]} />

                            <Button article={articles[i]} bookmarked={bookmarked} />
                        </article>
                        <div className="basis-1/6"></div>

                    </section> 
                    <section key={i} className="grid grid-cols-3 gap-8 border-b mb-8 pb-8 pt-8">
                    
                        {i + 1 < Object.keys(articles).length && (
                            <>
                                <article className="col-span-1 px-4" >
                                    <h1 className="text-xl">{articles[i + 1]["title"]}</h1>
                                    <p className="text-justify">{articles[i + 1]["description"]}</p>
                                    <Button article={articles[i + 1]} bookmarked={bookmarked} />
                                </article>
                            </>

                        )}
                        {i + 2 < Object.keys(articles).length && (
                            <>
                                <article className="col-span-1 border-x px-4" >
                                    <h1 className="text-xl">{articles[i + 2]["title"]}</h1>
                                    <p className="text-justify">{articles[i + 2]["description"]}</p>
                                    <Button article={articles[i + 2]} bookmarked={bookmarked} />
                                </article>
                                <div className="col-span-1"></div>
                            </>
                        )}
                    </section>
                </>
            )
            rows.push(contents2);
            i += 2;
        }
        setArticleRows(rows);
    }, [])

    return (
        <>
            {!bookmarkLoaded ? (<p>Loading</p>) : (
                <>
                    {articleRows}
                </>
            )}
        </>
    );

    async function populateBooks() {
        const data = await getBookmarks();
        if (data && data.length !== 0) {
            setBookmarked(data);
        } else {
            console.log("no bookmarks")
        }
        setBookmarkLoaded(true);
    }

    
}

function Button({ article, bookmarked }) {
    const [bCheck, setBCheck] = useState(true); // true means can bookmark, false mean already bookmarked

    useEffect(() => {
        if (bookmarked.length !== 0) {
            const found = bookmarked.some(bookmark => bookmark.url === article.url);
            setBCheck(!found);
        } else {
            setBCheck(true);
        }
    }, []);

    const handleClick = async () => {
        if (bCheck) {
            await addBookmark(article);
        } else {
            await deleteBookmark(article);
        }
        setBCheck(prev => !prev);
    };

    return (
        <button onClick={handleClick}>
            {bCheck ? 'Bookmark' : 'Unbookmark'}
        </button>
    );


}



export default Article;