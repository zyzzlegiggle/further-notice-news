import { Form, useLoaderData, useNavigation } from "react-router-dom";
import News from "./skeletons/news";
import { useEffect, useState } from "react";

const newsUrl = import.meta.env.VITE_SEARCH_URL;

export async function loader({ params }) {
    const query = params.query
    return { query };
}
function Search() {
    const loaderData = useLoaderData()["query"];
    const [query, setQuery] = useState(loaderData);
    // today's date
    const date1 = new Date();
    const dateToday = date1.getFullYear() + "-" + (Number(date1.getMonth()) + 1) + "-" + date1.getDate();

    // yesterday's date, change last number for the days (deprecated)
    //const date2 = new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 days ago
    //const datePrevious = date2.getFullYear() + "-" + (Number(date2.getMonth()) + 1) + "-" + date2.getDate();
    const url = `${newsUrl}${query}`

    useEffect(() => {
        if (query !== loaderData) {
            window.location.reload();
        }
    }, [loaderData, query]);


    return (
        <News url={url}/>
    );
}

export default Search;