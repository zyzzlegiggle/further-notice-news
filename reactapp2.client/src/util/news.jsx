/*
Any news api related function put here
such as fetch news
*/

const key = '3a921d7a74124a5892f7e8c987e85095';

// putting apikey in url is not needed
export async function fetchNews(url) {
    try {
        url = url + `&apiKey=${key}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        let data = await response.json();
        // filtering 

        data = data.articles.filter((article) =>
            (article.url !== null) &&
            (article.title !== "[Removed]") &&
            (article.title !== null) &&
            (article.source.name !== "Google News")
        )
            .map((article) => ({
                ...article, 
                source : article.source?.name || "Source unknown"
            }))



        return data;
    } catch (error) {
        console.error(error.message);
    }
}