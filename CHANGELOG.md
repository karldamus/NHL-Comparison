### 0.1.0 (2022.02.20)

- **New:** Proper file structure
- **New:** Implemented a script loader
- **New:** Created singleTeam.js to handle retrieving data for a single team
- **New:** added links.js to greatly improve readability in the long run by replacing written-links with modular values

Example:
 ```js
 URL = links.teams.root + teamId + links.teams.modifier.stats 
 // instead of 
 URL = "https://https://statsapi.web.nhl.com/api/v1/teams/" + teamId + "?expand=team.stats" 
 ```