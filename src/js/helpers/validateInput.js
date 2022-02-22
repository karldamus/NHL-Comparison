async function validateTeamId(teamId) {
    if (!Number.isInteger(teamId)) {
        // convert team name to id
        teamId = await getTeamIdFromName(teamId);

        return teamId;
    }

    return teamId;
}
