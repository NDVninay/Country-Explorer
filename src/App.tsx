import Box from "@mui/material/Box";
import "./App.css";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import LanguageIcon from "@mui/icons-material/Language";
import { Button, Snackbar } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

// interface for what data we will use

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  capital: string;
  population: number;
  languages: {
    [key: string]: string;
  };
  startOfWeek: string;
}
function App() {
  // useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //API
  const baseUrl = "https://restcountries.com/v3.1/name";

  //useState
  const [countriesData, setCountriesData] = useState<Country[]>([]);

  // State for loading
  const [loading, setLoading] = useState<boolean>(false);

  // State for error message
  const [errorMessage, setErrorMessage] = useState("");

  // onSubmit function
  const onSubmit = (data: any) => {
    setLoading(true);
    axios
      .get(`${baseUrl}/${data.country}`)
      .then(response => {
        //save the data ON countriesData
        setCountriesData(response.data);
        // Clear the error when request is successful
        setErrorMessage("");
        //reset on successful request
        reset();
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
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="App">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        {/* input */}
        <TextField
          margin="normal"
          id="country"
          label="Enter country name"
          autoFocus
          {...register("country", { required: true })}
          error={Boolean(errors.country)}
          helperText={errors.country && "Country is required"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LanguageIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Button FOR search  */}
        <Box>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Search
          </Button>
        </Box>
      </Box>
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
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        /* Cards */
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {countriesData.map(country => (
            <Card key={country.name.common} sx={{ width: 250, margin: 2 }}>
              <CardContent>
                <Box sx={{ border: "2px solid" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={country.flags.png}
                    alt={country.name.common}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {country.name.common}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Capital</b> : {country.capital}
                    <br />
                    <b>Population</b> : {country.population.toLocaleString()}
                    <br />
                    <b>Languages</b> :
                    {country.languages
                      ? Object.values(country.languages).join(",")
                      : ""}
                    <br />
                    <b>Start Of Week</b> : {country.startOfWeek}
                  </Typography>
                </CardContent>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
}

export default App;
