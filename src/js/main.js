// window.onload = async function() {

//     console.log("Inside of main.js");

//     // var scriptOne = document.getElementsByTagName('script')[2];

//     // console.log(scriptOne);

//     await runScriptLoader();

//     loadTeamIdsDict();

//     console.log(links);
// }



// var scriptOne = document.getElementsByTagName('script')[2];

// console.log(scriptOne);

// await runScriptLoader();
// runScriptLoader();

// test();

// console.log(links);

async function main() {
    console.log("Inside of main.js");

    // test();

    // console.log(links);

    await loadTeams();

    console.log("back in main");

    // for (let [key, value] of Object.entries(basicTeamData)) {
    //     console.log(value);
    // }

    displayAllTeamInfo();

}