import { useEffect, useState } from "react";
import Article from "./article";
import { getBookmarks } from "./util/bookmark";

function Favorites() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        populateBookmarks();
    }, []);

    return (
        <article>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Article articles={bookmarks} errorMes={'Bookmarks'} />
            )}
        </article>
    );

    async function populateBookmarks() {
        const data = await getBookmarks();
        setBookmarks(data);
        setLoading(false); 
    }
}


export default Favorites;