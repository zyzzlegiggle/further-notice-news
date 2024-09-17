import { useState } from "react";
import { addBookmark, deleteBookmark, getBookmarks } from "./util/bookmark";
import { useEffect } from "react";

function Article({ articles = [], errorMes = '' }) {
    const [bookmarked, setBookmarked] = useState([]);
    const [bookmarkLoaded, setBookmarkLoaded] = useState(false);

    const size = Object.keys(articles).length;

    useEffect(() => {
        populateBooks();
    }, [])

    let contents = !bookmarkLoaded ? (
        <>Loading</> 
    ) : (
        <>
        {articles.map((article) => (
            <article key={article.url}>
                <h2>{article.title}</h2>
                <img src={article.urlToImage || ''} alt={article.title} />
                <p>{article.description}</p>

                <Button article={article} bookmarked={bookmarked} />
            </article>
        ))}
        </>
    )

    if (size === 0) {
        return <p>No {errorMes}</p>;
    } else {
        return contents;
    }

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