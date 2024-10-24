import { useEffect, useState } from "react";
import { getBookmarks } from "../util/bookmark";


function Favorites() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const populateBookmarks = async () => {
            const data = await getBookmarks();
            
            setBookmarks(data);
            setLoading(false); 
        }
        populateBookmarks();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    if (bookmarks.length === 0) {
        return <p>You do not have any bookmarks</p>
    }
    else {
        const contents = bookmarks.map((bookmark) => {
            return (
                <article key={bookmark["url"]} className="pt-6">
                    <h1 className="text-3xl">
                        {bookmark["title"]}
                    </h1>
                    <p className="text-justify">
                        {bookmark["description"]}
                    </p>
                    <img className="h-96 w-128" src={bookmark["urlToImage"] || ''} alt={bookmark["title"]} />
                </article>
            )
        })

        return (
            <div className="container mx-auto pt-8">
                {contents}
            </div>
            
        )
    }
}


export default Favorites;