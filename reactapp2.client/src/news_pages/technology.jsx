import News from '../skeletons/news';


function Technology() {
    const url = "https://newsapi.org/v2/top-headlines?category=technology";

    return (
        <News url={url}/>
    );

}


export default Technology;