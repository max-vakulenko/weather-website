const temp = document.querySelector('#temp');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const cloudy = document.querySelector('#cloudy');
const searchInput = document.querySelector('#searchInput');
const apiWatherKey = '4e2c6bccf22c53a9ea562bbdd1bc2491';

searchInput.oninput = _.debounce(async event => {
	let request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=${apiWatherKey}&units=metric&lang=ua`)
	let response = await request.json()
	event.target.value = ''
	displayWeather(response)
}, 1000)

function displayWeather(data) {
	temp.innerText = Math.round(data.main.temp) + '°C';
	wind.innerText = data.wind.speed + 'км/год';
	humidity.innerText = data.main.humidity + '%';
	cloudy.innerText = data.weather[0].description;
}