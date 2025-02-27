import { countries } from "../../data/countries";
import { useState } from "react";
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>;
}

export default function Form({fetchWeather}: FormProps) {
    const [search, setSearch] = useState<SearchType>({
    name: "",
    country: "",
    });

    const [alert, setAlert] = useState<string>("");

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
    setSearch({
        ...search,
        [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(Object.values(search).includes("")){
        setAlert("Todos los campos son obligatorios");
        return;
    }

    fetchWeather(search);
    }

    return (
    <form className="form flex flex-col gap-4"
    onSubmit={handleSubmit}
    >
        {alert && <Alert>{alert}</Alert>}
        <label htmlFor="country" className="text-left">
            País:
        </label>
        <div className="country border border-gray-300 p-2 rounded-lg text-left pr-8">
        <select
            className="cursor-pointer "
            id="country"
            value={search.country}
            name="country"
            onChange={handleChange}
        >
            <option value="">Seleccione un país</option>
            {countries.map((country) => (
                <option key={country.code} value={country.code}>
                {country.name}
                </option>
            ))}
        </select>
        </div>

        <label htmlFor="city" className="text-left">
            Ciudad:
        </label>
        <div className="city border border-gray-300 p-2 rounded-lg text-left  ">
        <input
            id="city"
            type="text"
            name="name"
            placeholder="Nombre de la ciudad"
            className="bg-transparent placeholder-white text-white"
            value={search.name}
            onChange={handleChange}
            />
        </div>

        <input
        type="submit"
        value="Consultar Clima"
        className="border border-gray-300 p-1 hover:bg-blue-700 hover:text-white bg-gray-600 text-white uppercase cursor-pointer rounded-lg"
        />
    </form>
    );
};