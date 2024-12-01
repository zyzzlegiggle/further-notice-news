import { useState, useEffect } from 'react';
import { fetchNews } from '../util/news';
import Article from './article';
import Page from './page';


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
        <>
            {loading ? (
                <Page>
                    <p>Loading...</p>
                </Page>

            ) : (
                <Page>
                    <Article articles={articles} />
                </Page>

            )}
        </>
    );

}


export default News;