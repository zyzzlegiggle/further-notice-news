
import News from '../skeletons/news';

const newsUrl = import.meta.env.VITE_CATEGORY_URL;


function Science() {
    const url = `${newsUrl}science`;

    return (
        <News url={url}/>
    );

}


export default Science;