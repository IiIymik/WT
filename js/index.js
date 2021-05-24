import Fetch from './fetchData.js';


const ctx = document.getElementById('myChart').getContext('2d');
const GLOBAL_MIN_TENPERATURE = 14;


Fetch().then((parseData) => {
    const mapaData = parseData.reduce((acc, entry) => {
        acc.years.push(entry.Year);
        acc.temps.push(Number(entry.Glob) + GLOBAL_MIN_TENPERATURE);

        return acc;
    }, { years:[], temps:[]})

new Chart(ctx, {
    type: 'line',
    data: {
        labels: years,
        datasets: [{
            label: 'Средняя температура планеты',
            data: temps,
            backgroundColor:'rgba(255, 99, 132, 0.2)',
            borderColor:'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false,
        }]
    },
    options: {
        scales: {
            y: {
                ticsk: {
                    callback(value) {
                        return value + "$";
                    }
                },
            }
        }
    }
});

    
})
