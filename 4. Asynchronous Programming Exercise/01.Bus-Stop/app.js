async function getInfo() {
    const idField = document.getElementById('stopId');
    const divResult = document.getElementById('stopName');
    const busesUl = document.getElementById('buses');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${idField.value}`;
    clearBuses(busesUl);

    try {
        const response = await fetch(url);
        const data = await response.json();

        const { name } = data;
        divResult.textContent = name;

        for (const [busId, time] of Object.entries(data.buses)) {
            busesUl.appendChild(createComponent(busId, time));
        }

    } catch (error) {
        divResult.textContent = 'Error';
    }

    idField.value = '';
}

function createComponent(busId, time) {
    const li = document.createElement('li');
    li.textContent = `Bus ${busId} arrives in ${time} minutes`;
    return li;
}

function clearBuses(busesUl) {
    while (busesUl.firstChild) {
        busesUl.removeChild(busesUl.firstChild);
    }
}