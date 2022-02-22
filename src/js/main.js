async function main() {
    let searchText = document.getElementById("searchText");
    
    searchText.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            search();
        }
    });
    document.getElementById("searchText").value = "leafs";
    search();
    
}

async function search() {
    let searchText = document.getElementById("searchText").value;
    let results = document.getElementById("resultBox");

    // results.appendChild(document.createElement("p"));

    let data = await returnValuableTeamInfo(searchText);

    console.log("inside search");
    console.log(data);

    let teamInfo = data[0];
    let teamStats = data[1];
    let teamRoster = data[2];

    // go through data and append to result
    // for (let i of data) {
    //     for (let [key, value] of Object.entries(i)) {
    //         let li = document.createElement("li");
    //         li.innerHTML = value;

    //         results.appendChild(li);
    //     }
    // }

    let table = document.getElementById("resultsTable");

    table.innerHTML = '';

    let headerRow = document.createElement("tr");
    let th = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");

    th.innerHTML = "Player Name";
    headerRow.appendChild(th);
    th2.innerHTML = "Player #";
    headerRow.appendChild(th2);
    th3.innerHTML = "Link";
    headerRow.appendChild(th3);

    table.appendChild(headerRow);

    for (let [key, value] of Object.entries(teamRoster)) {
        let row = document.createElement("tr");

        for (let [key2, value2] of Object.entries(value)) {
            let td = document.createElement("td");
            console.log(key2);
            if (key2 == "link") {
                let a = document.createElement("a");
                a.innerHTML = "Link";
                a.href = value2;
                a.target = "_blank";
                td.appendChild(a);
            } else {
                td.innerHTML = value2;
            }
            row.appendChild(td);
        }

        table.appendChild(row);
    }

    results.appendChild(table);
    

    // let ul = document.createElement("ul");

    // for (let [key, value] of Object.entries(data)) {
    //     let tmpValue = value;

    //     if (typeof tmpValue === 'object') {
    //         tmpValue = Object.entries(value);
    //     }
    //     let li = document.createElement("li");
    //     li.innerHTML = tmpValue;

    //     ul.appendChild(li);
    // }

    // results.appendChild(ul);
}