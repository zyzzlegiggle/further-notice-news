import { useState, useEffect } from 'react';
import { fetchNews } from '../util/news';
import Article from './article';


function News(url) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const response = await fetchNews(url["url"]);
            setArticles(response);
            setLoading(false);
            console.log(articles);
        }

        getData();
    }, []);

    return (
        <section className="container mx-auto py-8 px-16 font-sans">
            {loading ? (
                <p>Loading...</p>
            ) : (
                 <Article articles={articles}/>                
            )}
        </section>
    );

}


export default News;