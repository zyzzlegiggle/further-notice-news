import { useEffect } from "react";
import News from "../skeletons/news";

const newsUrl = import.meta.env.VITE_GENERAL_URL;


function Home() {
    const url = newsUrl;

    

    return (
        <News url={url} />
    );

}


export default Home;