import { apiWatherKey, apiUnsplashKey } from './consts/api_keys.js'

const temp = document.querySelector('#temp');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const cloudy = document.querySelector('#cloudy');
const searchInput = document.querySelector('#searchInput');
const body = document.getElementsByTagName('body')[0];

searchInput.oninput = _.debounce(async event => {
	let request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=${apiWatherKey}&units=metric&lang=ua`)
	let requestImages = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=1&query=${event.target.value}&client_id=${apiUnsplashKey}&lang=uk&orientation=landscape`)
	let response = await request.json()
	let responseImages = await requestImages.json()
	event.target.value = ''
	console.log(responseImages);
	displayWeather(response, responseImages)
}, 1000)

function displayWeather(data, images) {
	temp.innerText = Math.round(data.main.temp) + '°C';
	wind.innerText = data.wind.speed + 'км/год';
	humidity.innerText = data.main.humidity + '%';
	cloudy.innerText = data.weather[0].description;
	body.style.backgroundImage = `url(${images.results[0].urls.full})`
}