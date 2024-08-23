import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const apiKey = 'e1caef9e535b3f75443c437ac3de9d7b'; 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs', { weather: null, error: null });
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const weatherData = response.data;
        res.render('index.ejs', {
            weather: {
                city: weatherData.name,
                temperature: weatherData.main.temp,
                description: weatherData.weather[0].description
            },
            error: null
        });
    } catch (error) {
        res.render('index.ejs', { weather: null, error: 'City not found or API request failed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
