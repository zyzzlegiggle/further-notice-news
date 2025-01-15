import News from '../skeletons/news';

const newsUrl = import.meta.env.VITE_CATEGORY_URL;


function Sports() {
    const url = `${newsUrl}sports`;
    return (
        <News url={url}/>
    );

}


export default Sports;