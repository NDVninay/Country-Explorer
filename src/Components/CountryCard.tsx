import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Country } from "../types/Country";

interface CountryCardProps {
  country: Country;
}
//display the cards base on the response from the API ..
function CountryCard({ country }: CountryCardProps) {
  return (
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
  );
}

export default CountryCard;
