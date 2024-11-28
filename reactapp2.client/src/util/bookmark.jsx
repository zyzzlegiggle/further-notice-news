

const apiUrl = '/api/bookmark';

export async function getBookmarks() { 
    try {
        const url = apiUrl + "/get";
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Status : ${response.status}`);
        }

        const data = response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function addBookmark(article) {
    
    try {
        const url = apiUrl + "/insert";
        const data = dataBody(article);
        await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
    } catch (e) {
        console.error(e);
    }

}

export async function deleteBookmark(article) {
    try {
        const url = apiUrl + "/delete";
        const data = dataBody(article);

        await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
    } catch (e) {
        console.error(e);
    }
}

function dataBody(article) {
    const data = {
        url: article.url,
        title: article.title,
        source: article.source,
        urlToImage: article.urlToImage,
        description: article.description,
        publishedAt: article.publishedAt,
    };

    return data;
}