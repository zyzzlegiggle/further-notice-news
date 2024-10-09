import { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import Article from "./article";
import { fetchNews } from "./util/news";

export async function loader({ params }) {
    const query = params.query
    return { query };
}
function Search() { 
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const query = useLoaderData()["query"];

    // today's date
    const date1 = new Date();
    const dateToday = date1.getFullYear() + "-" + (Number(date1.getMonth()) + 1) + "-" + date1.getDate();

    // yesterday's date, change last number for the days
    const date2 = new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 days ago
    const datePrevious = date2.getFullYear() + "-" + (Number(date2.getMonth()) + 1) + "-" + date2.getDate();
    
    const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=relevancy&from=${datePrevious}&to=${dateToday}&language=en`;

    useEffect(() => {
        const getData = async () => {
            const response = await fetchNews(url);
            setArticles(response);
            setLoading(false);
        }
        getData();
    }, [query]);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Article articles={articles} errorMes={"articles"} />
            )}
        </>
    );
}

export default Search;