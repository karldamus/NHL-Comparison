/**
 * 
 * @param {*} URL 
 * @returns 
 */
 async function getData(URL) {
     if (URLExists(URL)) {
        const response = await fetch(URL);
        return response.json();
     } else {
         console.error("URL returned 404 for GET request on URL: " + URL);
     }
}

function URLExists(URL) {
    var http = new XMLHttpRequest();
    http.open('GET', URL, false);
    http.send();

    return (http.status != 404);
}