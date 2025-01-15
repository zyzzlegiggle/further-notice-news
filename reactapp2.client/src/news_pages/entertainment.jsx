import News from "../skeletons/news";

const newsUrl = import.meta.env.VITE_CATEGORY_URL;


function Entertainment() {
    const url = `${newsUrl}entertainment`;

    return (
        <News url={url}/>
    );

}

export default Entertainment;