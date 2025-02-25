    import axios from 'axios';
    import { SearchType, WeatherType } from '../types';
    // import { z } from 'zod';
    import { object, string, number, InferOutput, parse} from 'valibot';

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
//     const WeatherSchema = z.object({
//         name: z.string(),
//         main: z.object({
//             temp: z.number(),
//             temp_min: z.number(),
//             temp_max: z.number()
//         })
//     });

//     type WeatherSchema = z.infer<typeof WeatherSchema>;

    //?VALIBOT
    const WeatherSchema = object({
        name: string(),
        main: object({
            temp: number(),
            temp_min: number(),
            temp_max: number()
        })
    });

    type WeatherSchema = InferOutput<typeof WeatherSchema>;


    export default function useWeather() {

    const APPID = import.meta.env.VITE_API_KEY;

    const fetchWeather =  async (search : SearchType) => {
        try {
            
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.name},${search.country}&appid=${APPID}`;

            // console.log(geoUrl);
            

            const {data} = await axios.get(geoUrl);
            if (!data || data.length === 0) {
                throw new Error("No se encontraron coordenadas para la ubicación proporcionada.");
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
            // const {data: weatherData} = await axios.get(weatherUrl);
            // const result = WeatherSchema.safeParse(weatherData);
            // if (!result.success) {
            //     throw new Error("Respuesta de la API no tiene el formato esperado.");
            // }else{
            //     console.log(result.data.name);
            //     console.log(result.data.main.temp);
            // }

            //?VALIBOT
            const {data: weatherData} = await axios.get(weatherUrl);
            const result = parse(WeatherSchema, weatherData);
            if (!result) {
                throw new Error("Respuesta de la API no tiene el formato esperado.");
            }
            console.log(result.name);

        } catch (error) {
            console.log(error);
        }
        
    }
    return{
        fetchWeather
    }
}