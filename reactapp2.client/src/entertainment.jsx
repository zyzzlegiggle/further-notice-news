import News from "./skeletons/news";

function Entertainment() {
    const url = "https://newsapi.org/v2/top-headlines?category=entertainment";


    return (
        <News url={url}/>
    );

}

export default Entertainment;