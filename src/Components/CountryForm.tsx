import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import LanguageIcon from "@mui/icons-material/Language";

interface CountryFormProps {
  onCountrySubmit: (country: string, resetForm: () => void) => void;
}

function countryForm({ onCountrySubmit }: CountryFormProps) {
  // useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    onCountrySubmit(data.country, reset);
  };

  return (
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
  );
}

export default countryForm;
