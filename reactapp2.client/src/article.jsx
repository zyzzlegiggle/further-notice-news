import { useState, useEffect } from "react";
import { addBookmark, deleteBookmark, getBookmarks } from "./util/bookmark";
import { useFetcher, Form } from "react-router-dom";


function Article({ articles, errorMes }) {
    const [bookmarked, setBookmarked] = useState([]);
    const [bookmarkLoaded, setBookmarkLoaded] = useState(false);
    const [articleRows, setArticleRows] = useState([])

    if (Object.keys(articles).length === 0) {
        return <p>No {errorMes}</p>;
    }

    useEffect(() => {
        populateBooks();
    }, [bookmarked])

    useEffect(() => {
        let rows = [];

        for (let i = 0; i < Object.keys(articles).length; i++) {
            const contents = (
                <article key={i} className="grid grid-rows-3 grid-flow-col gap-4">
                    <div className="row-span-3" >
                        <h1 className="text-xl">{articles[i]["title"]}</h1>
                        <img className="object-cover h-48 w-96" src={articles[i]["urlToImage"] || ''} alt={articles[0]["title"]} />
                        <p className="text-justify">{articles[i]["description"]}</p>
                        <Button article={articles[i]} bookmarked={bookmarked} />
                    </div>
                    {i + 1 < Object.keys(articles).length && (
                        <div className="col-span-2" >
                            <h1 className="text-xl">{articles[i + 1]["title"]}</h1>
                            <img className="object-cover h-48 w-96" src={articles[i + 1]["urlToImage"] || ''} alt={articles[i + 1]["title"]} />
                            <p className="text-justify">{articles[i + 1]["description"]}</p>
                            <Button article={articles[i + 1]} bookmarked={bookmarked} />
                        </div>
                    ) }
                    {i + 2 < Object.keys(articles).length && (
                        <div className="row-span-2 col-span-2" >
                            <h1 className="text-xl">{articles[i + 2]["title"]}</h1>
                            <img className="object-cover h-48 w-96" src={articles[i + 2]["urlToImage"] || ''} alt={articles[i + 2]["title"]} />
                            <p className="text-justify">{articles[i + 2]["description"]}</p>
                            <Button article={articles[i + 2]} bookmarked={bookmarked} />
                        </div>
                    )}
                </article>
            )
            rows.push(contents);
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