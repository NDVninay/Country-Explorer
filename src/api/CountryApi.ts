import axios from "axios";
import { Country } from "../types/Country";

export const getCountryData = async (
  countryName: string
): Promise<Country[]> => {
  //use at axios to get country from API
  const response = await axios.get<Country[]>(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  return response.data;
};
