const proxy = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'd8691b37b24f3905ce3fe88df2176614';
const WEATHER_API_URL = `${proxy}https://api.darksky.net/forecast/${API_KEY}/`;
const GEO_API_URL = `${proxy}https://darksky.net/geo?q=`;
const ADDRESS_API_URL = `${proxy}https://darksky.net/rgeo?hires=1`;

function getCoordinates(location) {
  return fetch(`${GEO_API_URL}${location}`).then(response => response.json());
}

function getForecast(lat, long) {
  return fetch(`${WEATHER_API_URL}${lat},${long}`).then(response => response.json());
}

function getAddress(lat, long) {
  return fetch(`${ADDRESS_API_URL}&lat=${lat}&lon=${long}`).then(response => response.json());
}

function getEmbedURL(lat, long) {
  return `https://darksky.net/map-embed/@temperature,${lat},${long},4.js?embed=true&timeControl=false&fieldControl=false&defaultField=temperature&defaultUnits=_f`;
}

export default {
  getAddress,
  getForecast,
  getCoordinates,
  getEmbedURL,
};
