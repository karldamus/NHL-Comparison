
// NODE MODULES
const http = require("http");
const file = require("fs");
const url = require("url");

// USER MODULES
var files = require("./js/modules/files.js");

const host = "localhost";
const port = 8000;

const server = http.createServer(processRequest);

// Start the server
server.listen(port, host, () => {
    console.log("Server is running on port " + port + "");
});

// Any requests
function processRequest(request, response) {
    const urlObject = url.parse(request.url, true);

    loadHTML(request, response);
    loadCSS(request, response);
    loadJS(request, response);

    clientRequestHandler(request, response);
}

function clientRequestHandler(request, response) {
    
}

// =====================================

//
// FILE REQUEST HANDLERS
//

function loadHTML(request, response) {
    // const HTML_FILES = ["/index.html"];

    for (let htmlFile of files.HTML_FILES) {
        if (request.url === htmlFile) {
            file.readFile(htmlFile.substring(1), 'utf8', function(err, contents) {
                processFile(response, err, contents, "text/html");
            });
        }
    }
}

function loadCSS(request, response) {
    for (let cssFile of files.CSS_FILES) {
        if (request.url === cssFile) {
            file.readFile(cssFile.substring(1), 'utf8', function(err, contents) {
                processFile(response, err, contents, "text/css");
            });
        }
    }

}

function loadJS(request, response) {
    for (let jsFile of files.JS_FILES) {
        if (request.url === jsFile) {
            file.readFile(jsFile.substring(1), 'utf8', function(err, contents) {
                processFile(response, err, contents, "application/javascript");
            });
        }
    }
}

// Process a file requested from the server
function processFile(response, err, contents, type) {
    if (err) {
        response.writeHead(500, { "Content-Type": type });
        response.end();
        console.log(err);
        return;
    } 

    response.writeHead(200, { "Content-Type": type });
    response.end(contents);
}