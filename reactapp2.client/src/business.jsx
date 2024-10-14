import News from './skeletons/news';


function Business() {
    const url = "https://newsapi.org/v2/top-headlines?category=business";

    return (
        <News url={url}/>
    );

}


export default Business;