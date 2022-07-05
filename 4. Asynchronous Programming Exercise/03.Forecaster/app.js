function attachEvents() {
    const idField = document.getElementById('location');
    const submitBtn = document.getElementById('submit');
    const forecast = document.getElementById('forecast');
    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');
    const label = document.querySelector('.label');

    submitBtn.addEventListener('click', getData);

    async function getData() {
        try {
            const locationUrl = `http://localhost:3030/jsonstore/forecaster/today/${idField.value}`;
            const response = await fetch(locationUrl);
            const data = await response.json();

            const upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${idField.value}`;
            const res = await fetch(upcomingUrl);
            const dataUpcoming = await res.json();

            forecast.style.display = 'block';

            createCurrent(data);
            createUpcoming(dataUpcoming);

        } catch (error) {
            label.textContent = 'Error';
            forecast.style.display = '';
            upcoming.style.display = 'none';
        }
    }

    function createCurrent(data) {
        const divForecasts = createComponent('div', '', 'forecasts');
        const conditionSymbol = createComponent('span', getWeatherIcon(data.forecast.condition), 'condition symbol')
        const spanCondition = createComponent('span', '', 'condition');
        const forecastDataOne = createComponent('span', data.name, 'forecast-data');
        const forecastDataTwo = createComponent('span', `${data.forecast.low}°/${data.forecast.high}°`, 'forecast-data');
        const forecastDataThree = createComponent('span', data.forecast.condition, 'forecast-data');

        spanCondition.appendChild(forecastDataOne);
        spanCondition.appendChild(forecastDataTwo);
        spanCondition.appendChild(forecastDataThree);

        divForecasts.appendChild(conditionSymbol);
        divForecasts.appendChild(spanCondition);

        current.appendChild(divForecasts);
    }

    function createUpcoming(dataUpcoming) {
        const forecastDiv = createComponent('div', '', 'forecasts-info');

        dataUpcoming.forecast.forEach(el => {
            const upcomingSpan = createComponent('span', '', 'upcoming');
            const symbolSpan = createComponent('span', getWeatherIcon(el.condition), 'symbol');
            const forecastSpan = createComponent('span', `${el.low}°/${el.high}°`, 'forecast-data',);
            const wordSpan = createComponent('span', el.condition, 'forecast-data');

            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(forecastSpan);
            upcomingSpan.appendChild(wordSpan);
            forecastDiv.appendChild(upcomingSpan);
        });

        upcoming.appendChild(forecastDiv);
    }

    function createComponent(type, content, className) {
        const element = document.createElement(type);
        element.innerHTML = content;
        element.className = className;
        return element;
    }

    function getWeatherIcon(condition) {
        const types = {
            'Sunny': '&#x2600',
            'Partly sunny': '&#x26C5',
            'Overcast': '&#x2601',
            'Rain': '&#x2614',
            'Degrees': '&#176'
        };
        return types[condition];
    }
}

attachEvents();