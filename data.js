async function amongus_data() {
    const data = await fetch('https://api.airtable.com/v0/appizKcsd7v5Fgdau/Table%201?view=Among%20Us%20Stats%20Table', {
        headers: {
            'Authorization': 'Bearer '
        }
    });

    const json = await data.json();

    return json.records.map(r => {
        return r.fields;
    });
}

function field(data, field) {
    return data.map( d => {
        return d[field] || 0;
    })
}

function buildObj(data) {
    const fields = ['Name', 'Bodies Reported', 'Emergencies Called', 'Tasks Completed', 'All Tasks Completed', 'Sabotages Fixed', 'Impostor Kills', 'Times Murdered',
    'Times Ejected', 'Crewmate Streak', 'Times Impostor', 'Times Crewmate', 'Games Started', 'Games Finished', 'Impostor Vote Wins', 'Impostor Kill Wins', 'Impostor Sabotage Wins',
    'Crewmate Vote Wins', 'Crewmate Task Wins'];

    const obj = {};

    fields.map( f => {
        obj[f] = field(data, f);
    });

    return obj;
}

function barGraph(ctx, rawStats, field) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: rawStats.Name,
            datasets: [{
                label: field,
                data: rawStats[field],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

amongus_data()
    .then(data => {
        const rawStats = buildObj(data);

        // make graphs
        let emergencies_called = document.getElementById('emergencies_called').getContext('2d');
        barGraph(emergencies_called, rawStats, 'Emergencies Called');

        let bodies_reported = document.getElementById('bodies_reported').getContext('2d');
        barGraph(bodies_reported, rawStats, 'Bodies Reported');

    });

