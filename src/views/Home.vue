<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div class="row">
      <div class="col-8 offset-2">
        <div class="input-group mb-3">
          <input v-model="location" type="text" class="form-control" placeholder="Enter Location">
          <div class="input-group-append">
            <button
              @click="updateLocation"
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >Search</button>
          </div>
        </div>
      </div>
      <div class="col-8 offset-2 text-center" v-if="forecast">
        <div class="card border-secondary mb-3">
          <div class="card-header">{{address}}</div>
          <div class="card-body">
            <h4 class="card-title">{{forecast.currently.summary}}</h4>
            <div class="card-text icon-temp">
              <span class="emoji">{{icons[forecast.currently.icon]}}</span>
              {{forecast.currently.temperature}}°F
            </div>
            <div class="card-text">{{forecast.currently.precipProbability}}% Chance of Precipitation</div>
          </div>
        </div>
      </div>
      <div class="col-8 offset-2">
        <iframe id="map-embed-iframe" frameborder="0" height="500px" width="100%" :src="embedURL"/>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import API from "@/lib/api";

export default {
  name: "home",
  data() {
    return {
      embedURL: "",
      address: localStorage.address || "",
      location: localStorage.location || "",
      forecast: null,
      icons: {
        "clear-day": "😎",
        "clear-night": "🌔",
        rain: "☔️",
        snow: "⛄️",
        sleet: "⛸",
        wind: "🌬",
        fog: "🌁",
        cloudy: "☁️",
        "partly-cloudy-day": "🌤",
        "partly-cloudy-night": "🌃"
      }
    };
  },
  mounted() {
    this.loadWeather(
      localStorage.lat || "37.8267",
      localStorage.lat || "-122.4233"
    );
  },
  methods: {
    loadWeather(lat, long) {
      localStorage.lat = lat;
      localStorage.long = long;

      this.embedURL = API.getEmbedURL(lat, long);

      API.getAddress(lat, long).then(result => {
        this.address = [result.name, result.street].join(" ");
        localStorage.address = this.address;
      });
      API.getForecast(lat, long).then(result => {
        this.forecast = result;
      });
    },
    updateLocation() {
      localStorage.location = this.location;
      API.getCoordinates(this.location).then(result => {
        //console.log(result);
        this.loadWeather(result.latitude, result.longitude);
      });
    }
  }
};
</script>

<style>
body {
  font-size: 2em;
}

.icon-temp {
  font-size: 2em;
}

.emoji {
  font-size: 2em;
}
</style>
