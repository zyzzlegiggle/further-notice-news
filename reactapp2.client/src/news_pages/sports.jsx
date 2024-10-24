import News from '../skeletons/news';


function Sports() {
    const url = "https://newsapi.org/v2/top-headlines?category=sports";

    return (
        <News url={url}/>
    );

}


export default Sports;