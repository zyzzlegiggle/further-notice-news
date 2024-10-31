import { useState, useEffect } from "react";
import { addBookmark, deleteBookmark } from "../util/bookmark";
function ArticleMenu({ article, bookmarked, classes = "" }) {
    const [bookmarkActive, setBookmarkActive] = useState(false); // true means can bookmark, false mean already bookmarked

    useEffect(() => {
        if (bookmarked) {
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
        <ul className={classes}>
            <li className={menuClasses} ><p>{article["source"]["name"]}</p></li>
            <li className={menuClasses}><p>{article["publishedAt"].split("T")[0]}</p></li>
            <li className={menuClasses}><i onClick={handleClick} className={`${bookmarkActive ? "fa-solid" : "fa-regular"} fa-bookmark cursor-pointer`}></i></li>
            <li className={menuClasses}><i className="fa-solid fa-share cursor-pointer"></i></li>
        </ul>

    );
}

export default ArticleMenu;
