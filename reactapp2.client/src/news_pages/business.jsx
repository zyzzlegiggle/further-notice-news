import News from '../skeletons/news';

const newsUrl = import.meta.env.VITE_CATEGORY_URL;

function Business() {
    const url = `${newsUrl}business`;

    return (
        <News url={url}/>
    );

}


export default Business;