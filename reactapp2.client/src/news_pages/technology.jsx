import News from '../skeletons/news';

const newsUrl = import.meta.env.VITE_CATEGORY_URL;


function Technology() {
    const url = `${newsUrl}technology`;
    return (
        <News url={url}/>
    );

}


export default Technology;