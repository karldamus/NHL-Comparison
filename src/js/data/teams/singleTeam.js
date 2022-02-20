let basicTeamData = {};

async function displayAllTeamInfo() {
    for (let [key, value] of Object.entries(basicTeamData)) {
        // getTeamInfo(value.teamId);
        // console.log(value);
        // getTeamStats(value.teamId);
    }
}

async function getTeamInfo(teamId) {
    if (!Number.isInteger(teamId)) {
        // convert team name to id
        teamId = await getTeamIdFromName(teamId);
    }

    let URL = links.teams.root + teamId;
    var data = await getData(URL);

    for (let [key, value] of Object.entries(data.teams)) {
        console.log(value);
    }
}

async function getTeamStats(teamId) {
    if (!Number.isInteger(teamId)) {
        // convert team name to id
        teamId = await getTeamIdFromName(teamId);
    }
    
    let URL = links.teams.root + teamId + links.teams.modifier.stats;
    var data = await getData(URL);

    console.log(data.teams[0].teamName);
    console.log(data.teams[0].teamStats[0].splits[0]);
}

//
// setup basic data
//

/**
 * Setup basic data for teams
 * @returns 
 */
 async function loadTeams() {
    let URL = links.teams.root;
    var data = await getData(URL);

    console.log(data);

    for (let [key, value] of Object.entries(data.teams)) {
        // if (value.)
        basicTeamData[key] = {
            teamId: value.id,
            franchiseId: value.franchise.franchiseId,
            fullName: value.locationName + " " + value.teamName,
            locationName: value.locationName,
            teamName: value.teamName
        };

        // console.log(basicTeamData[key]);
    }
}

async function getTeamIdFromName(teamName) {
    let URL = links.teams.root;
    var data = await getData(URL);

    console.log(teamName);

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