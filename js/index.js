const ctx = document.getElementById('myChart').getContext('2d');
const GLOBAL_MIN_TENPERATURE = 14;


fetchData().then(parseData).then(getLabelsAndData).then(({years, tempsG, tempsN, tempsS})=> drawChart(years, tempsG, tempsN, tempsS));

function fetchData() {
    return fetch("../ZonAnn.Ts+dSST.csv").then(res => res.text());
};

function parseData(data) {
    return Papa.parse(data, { header: true }).data;
};

function getLabelsAndData(data) {
    console.log(data)
    return data.reduce(
                (acc, entry) => {
                    acc.years.push(entry.Year);
                    acc.tempsG.push(Number(entry.Glob) + GLOBAL_MIN_TENPERATURE);
                    acc.tempsN.push(Number(entry.NHem) + GLOBAL_MIN_TENPERATURE);
                    acc.tempsS.push(Number(entry.SHem) + GLOBAL_MIN_TENPERATURE);
                    return acc;
                },
                { years: [], tempsG: [], tempsN: [], tempsS: [] }
            );
};

function drawChart(labels, tempsG, tempsN, tempsS) {
        new Chart(ctx, {
    type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Средняя температура планеты',
                    data: tempsG,
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    borderWidth: 1,
                    fill: false,
                }, {
                    label: 'Средняя Северная температура планеты',
                    data: tempsN,
                    backgroundColor: 'green',
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: false,
                    }, {
                     label: 'Средняя Южная температура планеты',
                    data: tempsS,
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderWidth: 1,
                    fill: false,
                }]
            },        
    options: {
        scales: {
            yAxes: {
                ticks: {
                    callback(value) {
                        return value + "💥";
                    }
                },
            }
        }
    }
        });
}
    