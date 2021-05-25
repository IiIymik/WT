const ctx = document.getElementById('myChart').getContext('2d');
const GLOBAL_MIN_TENPERATURE = 14;


fetchData().then(parseData).then(getLabelsAndData).then(({years, temps})=> drawChart(years, temps));

function fetchData() {
    return fetch("../ZonAnn.Ts+dSST.csv").then(res => res.text());
};

function parseData(data) {
    return Papa.parse(data, { header: true }).data;
};

function getLabelsAndData(data) {
    return data.reduce(
                (acc, entry) => {
                    acc.years.push(entry.Year);
                    acc.temps.push(Number(entry.Glob) + GLOBAL_MIN_TENPERATURE);

                    return acc;
                },
                { years: [], temps: [] }
            );
};

function drawChart(labels, data) {
        new Chart(ctx, {
    type: 'line',
    data: {
        labels,
        datasets: [{
            label: 'Средняя температура планеты',
            data,
            backgroundColor:'blue',
            borderColor:'blue',
            borderWidth: 1,
            fill: false,
        }]
    },
    options: {
        scales: {
            yAxes: {
                ticks: {
                    callback(value) {
                        return value + "$";
                    }
                },
            }
        }
    }
});
}
        






           


        