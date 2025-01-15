import News from '../skeletons/news';

const newsUrl = import.meta.env.VITE_CATEGORY_URL;


function Health() {
    const url = `${newsUrl}health`;
    return (
        <News url={url}/>
    );

}


export default Health;