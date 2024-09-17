import { useState, useEffect } from 'react';
import Article from './article';

const key = '3a921d7a74124a5892f7e8c987e85095';
function Home() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchResult();
    }, []);

    return (
        <article>
            {loading ? (
                <p>Loading...</p>
            ) : (
                    <Article articles={articles} errorMes={'articles'} />
            )}
        </article>
    );

    async function fetchResult() {
        let url = `https://newsapi.org/v2/top-headlines?q=world&apiKey=${key}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();
            const filtered = data.articles.filter((article) =>
                (article.urlToImage !== null || article.url !== null)
            );
            setArticles(filtered);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }

}





export default Home;