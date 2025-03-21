import "./App.css";
import Alert from "./components/Alert/Alert";
import Form from "./components/Form/Form";
import { Spinner } from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";

    function App() {

    const { fetchWeather, notFound, loading, weather, hasWeatherData } = useWeather();
    return (
        <>
            <h1 className="text-center font-bold text-2xl pt-10 pb-10">
                Buscador de clima
            </h1>

            <div className="w-5/6 mx-auto max-w-full  md:w-3/4 lg:w-2/3 xl:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-center">
                <Form fetchWeather={fetchWeather}/>
                {loading  && <Spinner />}
                {hasWeatherData && <WeatherDetail weather={weather} />}
                {notFound && <Alert>Ciudad no encontrada.</Alert>}
            </div>
        </>
    );
    }

    export default App;
