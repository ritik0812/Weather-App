// requests(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=b30d510745bc4fa112235b620b536775`)

const express = require('express');

const app = express();

const path = require('path');

const requests = require('requests');

const staticPath = path.join(__dirname, "./views")

//middleware
app.use(express.static(staticPath));

app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render('index', {
        cityName: "Delhi"
    });
})



app.get('/city', (req, res) => {
    let data = ''
    let cityName = req.query.name;
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b30d510745bc4fa112235b620b536775&units=metric`)
        .on("data", (chunk) => {
            data += chunk;
        })
        .on("end", () => {
            const objData = JSON.parse(data);
            const arr = [objData];
            res.render('cityPage', {
                location: arr[0].name,
                country: arr[0].sys.country,
                currTemp: arr[0].main.temp,
                feelTemp: arr[0].main.feels_like,
                maxTemp: arr[0].main.temp_max,
                minTemp: arr[0].main.temp_min
            });

        }).on("error", (err) => {
            console.log(err);
        })
})

app.listen("80", () => {
    console.log("Server has started at port 80");
})