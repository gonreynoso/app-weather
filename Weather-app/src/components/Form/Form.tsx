import { countries } from "../../data/countries";
import { useState } from "react";
import { SearchType } from "../../types";

const Form = () => {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="form flex flex-col gap-4 ">
      <div className="country border border-gray-300 p-2  rounded-lg">
        <label htmlFor="country" className="mr-10">
          País:
        </label>
        <select
          className="cursor-pointer"
          id="country"
          value={search.country}
          name="country"
          onChange={handleChange}
        >
          <option value=""> -- Seleccione un país -- </option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="city border border-gray-300 p-2 rounded-lg  ">
        <label htmlFor="city" className="mr-6">
          Ciudad:
        </label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="Nombre de la ciudad"
          className="bg-transparent placeholder-white text-white "
          value={search.city}
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