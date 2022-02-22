async function getPlayerInfo(playerId, teamId) {
    let URL = links.people.root + playerId;
    var data = await getData(URL);

    console.log(data.people[0]);
}

async function findPlayer(playerName) {
    let playersFound = [];

    
}