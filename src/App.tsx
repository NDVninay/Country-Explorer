import Box from "@mui/material/Box";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Country } from "./types/Country";
import { getCountryData } from "./api/CountryApi";
import CountryForm from "./Components/CountryForm";
import CountryCard from "./Components/CountryCard";

function App() {
  //useState
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  // State for loading spinner
  const [loading, setLoading] = useState<boolean>(false);
  // State for error message
  const [errorMessage, setErrorMessage] = useState("");

  // onSubmit function is called when a form is submitted.
  const onSubmit = (country: string, resetForm: () => void) => {
    setLoading(true);
    getCountryData(country)
      .then(response => {
        setCountriesData(response);
        // Clear the error when request is successful
        setErrorMessage("");
        //function to reset the form after submission , clearing the input fields..
        resetForm();
      })
      .catch((err: any) => {
        // if country is not found show snackbar error message else set api error
        if (err.response && err.response.status === 404) {
          setErrorMessage("Country not found! Please try again.");
        } else {
          setErrorMessage("An error occurred while fetching the country data.");
        }
        //clear the countries displayed on error
        setCountriesData([]);
        console.log(err);
      })
      //The finally is used to set the loading state to false.
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <CountryForm onCountrySubmit={onSubmit} />
      {/* Snackbar Material ui For ERR */}
      <Snackbar
        open={errorMessage !== ""}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      {loading ? (
        // If loading is true , it means that data is being loaded
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        // If loading is false , it means that loading process has completed,and show the cards
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {countriesData.map(country => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </Box>
      )}
    </div>
  );
}
export default App;
