import axios from 'axios';
import { SearchType } from '../types';
// import { WeatherType  } from '../types';
import { set, z } from 'zod';
import { useMemo, useState } from 'react';
// import { object, string, number, InferOutput, parse} from 'valibot';

//?TYPEGUARD O ASSERTION FUNCTION
// function isWeatherResponse(weather : unknown) : weather is WeatherType {
//     return(
//         Boolean(weather) && 
//         typeof weather === "object" &&
//         typeof (weather as WeatherType).name === "string" &&
//         typeof (weather as WeatherType).main.temp === "number" &&
//         typeof (weather as WeatherType).main.temp_min === "number" &&
//         typeof (weather as WeatherType).main.temp_max === "number"
//     )

// }

//?ZOD
const WeatherSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_min: z.number(),
        temp_max: z.number()
    })
});

export type WeatherSchema = z.infer<typeof WeatherSchema>;

//?VALIBOT
// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_min: number(),
//         temp_max: number()
//     })
// });

// type WeatherSchema = InferOutput<typeof WeatherSchema>;


const initialState = {
    name: "",
    main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0
    }
}

export default function useWeather() {

const [weather, setWeather] = useState<WeatherSchema>(initialState);

const [loading, setLoading] = useState(false);

const [notFound, setNotFound] = useState(false);


const fetchWeather =  async (search : SearchType) => {
    const APPID = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setWeather(initialState);
    try {
        
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.name},${search.country}&appid=${APPID}`;

        // console.log(geoUrl);
        

        const {data} = await axios.get(geoUrl);
        //comprobar si existe latitud y longitud
        if (!data[0]) {
            setNotFound(true);
            return;
        }
        const lat = data[0].lat;
        const lon = data[0].lon;

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APPID}`;

        // console.log(weatherUrl);
        

        //!Diferentes formas de validar datos de la API
        //?Castear el type, forzarlo a que sea de tipo WeatherType
        // const {data: weatherData} = await axios.get<WeatherType>(weatherUrl);
        // console.log(weatherData.name);
        // console.log(weatherData.main.temp);

        // console.log(weatherData)
        
        
        // //?TypeGuard
        // const {data: weatherData} = await axios.get(weatherUrl);
        // const result = isWeatherResponse(weatherData);
        // if (!isWeatherResponse(weatherData)) {
        //     throw new Error("Respuesta de la API no tiene el formato esperado.");
        // }
        // console.log(weatherData.name);
        // console.log(weatherData.main.temp);

        //?ZOD
        const {data: weatherData} = await axios.get(weatherUrl);
        const result = WeatherSchema.safeParse(weatherData);
        if (!result.success) {
            throw new Error("Respuesta de la API no tiene el formato esperado.");
        }else{
            setWeather(result.data);
        }

        //?VALIBOT
        // const {data: weatherData} = await axios.get(weatherUrl);
        // const result = parse(WeatherSchema, weatherData);
        // if (!result) {
        //     throw new Error("Respuesta de la API no tiene el formato esperado.");
        // }
        // console.log(result.name);

    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
    
}

const hasWeatherData = useMemo(() => weather.name , [weather]);


return{
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData
}
}