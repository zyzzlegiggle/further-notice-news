import { useState, useEffect } from 'react';
import Article from '../article';
import { fetchNews } from '../util/news';


function News(url) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const response = await fetchNews(url["url"]);
            setArticles(response);
            setLoading(false);
        }

        getData();
    }, []);

    return (
        <article>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container mx-auto p-8">
                    <Article articles={articles}/>
                </div>
            )}
        </article>
    );

}


export default News;