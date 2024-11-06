import { useEffect, useState } from "react";
import { getBookmarks } from "../util/bookmark";
import ArticleMenu from "../skeletons/article-menu";

function Favorites() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const populateBookmarks = async () => {
            const data = await getBookmarks();
            setBookmarks(data);
            setLoading(false);
            console.log(data);
        };
        populateBookmarks();
    }, []);

    return (
        <div className="container mx-auto py-8 px-16">
            {loading ? (
                <p>Loading...</p>
            ) : bookmarks.length > 0 ? (
                bookmarks.map((bookmark) => (
                    <article key={bookmark.url} className="border-b pb-8 mb-8">
                        <h1 className="text-3xl font-bold">{bookmark.title}</h1>
                        <ArticleMenu article={bookmark} bookmarked={bookmarks} />
                        <p className="text-justify pt-2">{bookmark.description}</p>
                        <img
                            className="h-96 w-128 rounded pt-4 mx-auto"
                            src={bookmark.urlToImage || ''}
                            alt={bookmark.title}
                        />
                    </article>
                ))
            ) : (
                <p>No Bookmarks</p>
            )}
        </div>
    );
}

export default Favorites;
