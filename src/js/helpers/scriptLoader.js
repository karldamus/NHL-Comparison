/**
 * Script Loader method courtesy of 
 * https://stackoverflow.com/a/43485936/13280626
 */
async function scriptLoader(path, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.async = true;
    script.src = path;
    script.onload = function() {
        if(typeof(callback) == "function") {
            callback();
        }
    }
    try {
        var scriptOne = document.getElementsByTagName('script')[0];
        scriptOne.parentNode.insertBefore(script, scriptOne);
    }
    catch(e) {
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    script.addEventListener("load", () => {
        console.log("File loaded : " + path)

        if (path == "js/main.js") {
            setTimeout(function() {
                //your code to be executed after 1 second
              }, 1000);
            main();
        }
    });
    
    script.addEventListener("error", (ev) => {
        console.log("Error on loading file", ev);
    });
}

// load all required json and js files into head of file
// async function runScriptLoader() {
//     for (let filePath of filePaths) {
//         await scriptLoader(filePath);
//     }
// }

window.onload = async function() {
    for (let filePath of filePaths) {
        await scriptLoader(filePath);
    }
}