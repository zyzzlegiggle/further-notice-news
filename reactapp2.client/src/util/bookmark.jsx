

const uri = '/api/bookmarkitems';

export async function getBookmarks() { 
    try {

        const response = await fetch(uri);
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
    const data = {
        url: article.url,
        title: article.title,
        source: article.source,
        urlToImage: article.urlToImage,
        description: article.description,
        publishedAt: article.publishedAt,
    };
    

    try {
        await fetch(uri,
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
    const data = {
        url: article.url,
        title: article.title,
        author: article.author,
        urlToImage: article.urlToImage,
        description: article.description
    };
    try {
        await fetch(uri,
            {
                method: 'DELETE',
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