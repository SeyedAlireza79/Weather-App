'use strict';

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
	console.log(`hi`);
	const APIKey = '1d2b972bfccb23e9d1715c18849c6ad5';
	const city = document.querySelector('.search-box input').value;

	if (city === '') {
		error404.style.display = 'none';
		error404.classList.remove('fadeIn');
		container.style.height = '105px';
		return;
	}

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
		.then((response) => response.json())
		.then((res) => {
			if (res.cod == '404') {
				container.style.height = '500px';
				weatherBox.style.display = 'none';
				weatherDetails.style.display = 'none';
				error404.style.display = 'block';
				error404.classList.add('fadeIn');
				return;
			}

			error404.style.display = 'none';
			error404.classList.remove('fadeIn');

			const image = document.querySelector('.weather-box img');
			const temp = document.querySelector('.weather-box .temperature');
			const description = document.querySelector('.weather-box .description');
			const humidity = document.querySelector('.weather-details .humidity span');
			const wind = document.querySelector('.weather-details .wind span');

			switch (res.weather[0].main) {
				case 'Clear':
					image.src = './images/clear.png';
					break;

				case 'Rain':
					image.src = './images/rain.png';
					break;

				case 'Clouds':
					image.src = './images/cloud.png';
					break;

				case 'Snow':
					image.src = './images/snow.png';
					break;

				case 'Haze':
					image.src = './images/mist.png';
					break;

				default:
					image.src = '';
			}

			// const fahrenheitToCelsius = (fahrenheit) => {
			// 	return ((Number(fahrenheit) - 32) * 5) / 9;
			// };

			console.log(res);
			// console.log(fahrenheitToCelsius(parseInt(res.main.temp)));

			// temp.innerHTML = `${fahrenheitToCelsius(parseInt(res.main.temp)).toFixed(1)}<span>°C</span>`;
			temp.innerHTML = `${parseInt(res.main.temp).toFixed(1)}<span>°C</span>`;
			description.innerHTML = `${res.weather[0].description}`;
			humidity.innerHTML = `${res.main.humidity}%`;
			wind.innerHTML = `${res.wind.speed} Km/h`;

			weatherBox.style.display = '';
			weatherDetails.style.display = '';
			weatherBox.classList.add('fadeIn');
			weatherDetails.classList.add('fadeIn');
			container.style.height = '590px';
		});
});
