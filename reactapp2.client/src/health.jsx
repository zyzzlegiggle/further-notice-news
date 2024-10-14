import { useState, useEffect } from 'react';
import Article from './article';
import { fetchNews } from './util/news';
import News from './skeletons/news';


function Health() {
    const url = "https://newsapi.org/v2/top-headlines?category=health";
    return (
        <News url={url}/>
    );

}


export default Health;