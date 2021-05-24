export default function fetchData() {
    fetch("../ZonAnn.Ts+dSST.csv")
        .then(response => response.text())
        .then(data => {
            const parseData = Papa.parse(data, { headers: true }).data;
            return parseData;
        })
}