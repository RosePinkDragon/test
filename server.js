const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

const apiKey = "9510784943d7eed78c49c90c895761b7";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index", { cityname: null, err: null, datetime: null });
});

app.post("/", function(req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function(err, response, body) {
    var dt = new Date();
    let GetDateTime =
      dt.getDate() +
      "/" +
      (dt.getMonth() + 1) +
      "/" +
      dt.getFullYear() +
      " " +
      dt.getHours() +
      ":" +
      dt.getMinutes();
    console.log(GetDateTime);
    let weather_json = JSON.parse(body);
    console.log(weather_json);
    let Icon = weather_json.weather[0].icon;
    let Temperature = Math.round(weather_json.main.temp);

    let Humidity = weather_json.main.humidity;
    let CityName = weather_json.name;
    let Descriptions = weather_json.weather[0].description;
    let GetCelsius = ((parseInt(Temperature) - 32) * 1.8).toFixed(1);
    let GetFahrenheit = Temperature;
    console.log(Icon, Temperature, CityName, Descriptions);
    res.render("index", {
      cityname: CityName,
      icon: Icon,
      descriptions: Descriptions,
      humidity: Humidity,
      temperature: Temperature,
      getcelsius: GetCelsius,
      datetime: GetDateTime,
      getfahrenheit: GetFahrenheit
    });
  });
});
app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
