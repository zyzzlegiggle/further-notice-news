
import News from './skeletons/news';


function Science() {
    const url = "https://newsapi.org/v2/top-headlines?category=science";


    return (
        <News url={url}/>
    );

}


export default Science;