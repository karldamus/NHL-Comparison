var xhttp;

window.onload = async function() {
    let URL = "https://statsapi.web.nhl.com/api/v1/teams";

    const allTeamData = await getData(URL);
    const allTeamNames = await getAllTeamNames(URL);
    const leafsRoster = await getTeamRoster(URL, "leafs");

    for (let team of Object.entries(allTeamData.teams)) {
        const teamRoster = await getTeamRoster(URL, team[1].teamName);
        // console.log(team[1].teamName);
        console.log(team[1].teamName);
        console.log(teamRoster);
    }

    // console.log(leafsRoster);
    
    // print(allTeamData);
    // print(leafsRoster);
    // print(allTeamNames);
}

// async function getAllTeams(URL, current) {
//     var data = await getData(URL);

// }

/**
 * 
 * @param {*} URL the URL to retrieve JSON from
 * @param {*} current boolean: whether we want only current teams
 * @returns 
 */
async function getAllTeamNames(URL) {
    var data = await getData(URL);
    var teamNames = {};

    for (let [key, value] of Object.entries(data.teams)) {
        teamNames[key] = value.locationName + " " + value.teamName;
    }

    return teamNames;
}

/**
 * Get the ID of a team given their teamName or locationName
 * @param {*} URL 
 * @param {*} teamName 
 * @returns 
 */
async function getTeamID(URL, teamName) {
    var data = await getData(URL);

    for (let [key, value] of Object.entries(data.teams)) {
        let tmpLocationName = value.locationName.toLowerCase();
        let tmpTeamName = value.teamName.toLowerCase();
        teamName = teamName.toLowerCase();

        if (tmpLocationName.includes(teamName) || tmpTeamName.includes(teamName)) {
            return value.id;
        }
    }

    return -1;
}

/**
 * 
 * @param {*} URL 
 * @param {*} teamName 
 * @returns 
 */
async function getTeamRoster(URL, teamName) {
    if (teamName != null) {
        var teamID = await getTeamID(URL, teamName);
        URL = URL + "/" + teamID + "?expand=team.roster";
        // console.log("test: " + URL);
    } 

    var data = await getData(URL);

    return data.teams[0].roster.roster;
}

/** DO NOT MODIFY BELOW */

/**
 * 
 * @param {*} URL 
 * @returns 
 */
async function getData(URL) {
    const response = await fetch(URL);
    return response.json();
}

function print(object) {
    for (let [key, value] of Object.entries(object)) {
        console.log(value);
    }
}
