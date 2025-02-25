export type SearchType = {
  name: string;
  country: string;
};

export type CountryType = {
  name: string;
  code: string;
};

export type WeatherType = {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  }

};