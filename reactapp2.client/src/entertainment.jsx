import { useState, useEffect } from "react";
import { fetchNews } from "./util/news";
import Article from "./article";

function Entertainment() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const url = "https://newsapi.org/v2/top-headlines?category=entertainment";

    useEffect(() => {
        const getData = async () => {
            const response = await fetchNews(url);
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
                <Article articles={articles} errorMes={'articles'} />
            )}
        </article>
    );

}

export default Entertainment;