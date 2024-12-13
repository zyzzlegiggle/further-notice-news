import { useEffect } from "react";
import News from "../skeletons/news";

function Home() {
    const url = "https://newsapi.org/v2/top-headlines?country=us";

    

    return (
        <News url={url} />
    );

}


export default Home;