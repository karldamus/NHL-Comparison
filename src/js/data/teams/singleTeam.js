let basicTeamData = {};

async function displayAllTeamInfo() {
    // for (let [key, value] of Object.entries(basicTeamData)) {
    //     // getTeamInfo(value.teamId);
    //     // console.log(value);
    //     // getTeamStats(value.teamId);
    //     getTeamRoster(10);
    // }
}

/**
 * Basic team information for the team with id teamId -> includes:
 *      name; site; location/venue;
 *      franchise, conference, and division information
 * @param {*} teamId 
 */
async function getTeamInfo(teamId) {
    teamId = await validateTeamId(teamId);

    let URL = links.teams.root + teamId;
    var data = await getData(URL);

    // for (let [key, value] of Object.entries(data.teams)) {
    //     // console.log(value);
    // }

    return data.teams;
}

async function returnValuableTeamInfo(teamId) {
    let teamData = [];

    teamId = await validateTeamId(teamId);

    var tmpTeamInfo = (await getTeamInfo(teamId))[0];
    var tmpTeamStats = (await getTeamStats(teamId)).stat;
    var tmpTeamRoster = (await getTeamRoster(teamId)).roster;

    let teamInfo = {};
    let teamStats = {};
    let teamRoster = {};

    // teamInfo
    teamInfo.teamName = tmpTeamInfo.teamName;
    teamInfo.conference = tmpTeamInfo.conference.name;
    teamInfo.division = tmpTeamInfo.division.name;

    // teamStats
    teamStats = tmpTeamStats;

    // teamRoster
    for (let [key, value] of Object.entries(tmpTeamRoster)) {
        let player = {};

        player.fullName = value.person.fullName;
        player.jerseyNumber = value.jerseyNumber;
        player.link = links.root + value.person.link;

        teamRoster[key] = player;
    }

    teamData[0] = teamInfo;
    teamData[1] = teamStats;
    teamData[2] = teamRoster;

    console.log(tmpTeamInfo);
    console.log(tmpTeamStats);
    console.log(tmpTeamRoster);

    console.log(teamData);

    return teamData;
}

/**
 * Current seasons' stats for the team with id teamId
 * @param {*} teamId 
 */
async function getTeamStats(teamId) {
    teamId = await validateTeamId(teamId);

    let URL = links.teams.root + teamId + links.teams.modifier.stats;
    var data = await getData(URL);

    // console.log(data.teams[0].teamName);
    // console.log(data.teams[0].teamStats[0].splits[0]);

    return data.teams[0].teamStats[0].splits[0];
}

/**
 * Current roster for the team with id teamId
 * @param {*} teamId 
 */
async function getTeamRoster(teamId) {
    teamId = await validateTeamId(teamId);

    let URL = links.teams.root + teamId + links.teams.modifier.roster;
    var data = await getData(URL);

    // console.log(data.teams[0].roster);

    return data.teams[0].roster;
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

    // console.log(data);

    for (let [key, value] of Object.entries(data.teams)) {
        // if (value.)
        basicTeamData[key] = {
            teamId: value.id,
            franchiseId: value.franchise.franchiseId,
            fullName: value.locationName + " " + value.teamName,
            locationName: value.locationName,
            teamName: value.teamName
        };
    }
}

/**
 * Get the id of a team from the name:
 * @param {*} teamName the name of the team in short-form, long-form, or just the location name
 * @returns 
 */
 async function getTeamIdFromName(teamName) {
    let URL = links.teams.root;
    var data = await getData(URL);

    for (let [key, value] of Object.entries(data.teams)) {
        let tmpLocationName = value.locationName.toLowerCase();
        let tmpTeamName = value.teamName.toLowerCase();
        teamName = teamName.toLowerCase();

        if (tmpLocationName.includes(teamName) || tmpTeamName.includes(teamName)) {
            return value.id;
        }
    }

    console.error("Could not find the id of team with input: " + teamName);

    return -1;
}

function getTeamNameFromId(teamId) {
    for (let [key, value] of Object.entries(basicTeamData)) {
        if (value.teamId == teamId) {
            return value.fullName;
        }
    }

    return "No team found";
}