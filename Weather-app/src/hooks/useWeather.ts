    import axios from 'axios';
    import { SearchType } from '../types';


    export default function useWeather() {


    const APPID = import.meta.env.VITE_API_KEY;

    const fetchWeather =  async (search : SearchType) => {
        try {
            
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.name},${search.country}&appid=${APPID}`;

            const {data} = await axios.get(geoUrl);
            
            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APPID}`;

            const {data: weatherData} = await axios.get(weatherUrl);

            console.log(weatherData);            
            

        } catch (error) {
            console.log("El error es: " + error);
        }
        
    }
    return{
        fetchWeather
    }
    }