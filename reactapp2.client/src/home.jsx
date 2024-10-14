
import News from './skeletons/news';

function Home() {
    const url = "https://newsapi.org/v2/top-headlines?category=general";

    return (
        <News url={url} />
    );

}


export default Home;