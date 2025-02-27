import { WeatherSchema } from "../../hooks/useWeather";
import { formatTemperature } from "../../utils";

type WeatherDetailProps = {
    weather: WeatherSchema;
};



const WeatherDetail = ({weather} : WeatherDetailProps) => {
    return (
        <div className="bg-white rounded-lg align-center text-center text-black p-12">
            <h2 className="text-black font-bold">Temperatura actual en: {weather.name}</h2>
            <p className="text-black font-bold text-4xl">{formatTemperature(weather.main.temp)}&deg;C</p>
            <div className="flex justify-center gap-5 mt-4">
            <p className="text-black font-semibold ">Min: <span className="font-normal">{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
            <p className="text-black font-semibold ">Max: <span className="font-normal">{formatTemperature(weather.main.temp_max)}&deg;C</span></p> 
        </div>
        </div>

    )
    
};
export default WeatherDetail;
