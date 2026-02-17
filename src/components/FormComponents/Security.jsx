import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const Security = () => {

  const { control } = useFormContext();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      
      <Controller
        name="password"
        control={control}
        render={({ field }) => <PasswordField label='Password' field={field} />}
      />
      
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => <PasswordField label='Confirm Password' field={field} />}
      />

    </Box>
  );
};

export default Security;

const PasswordField = ({ field, label }) => {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <FormControl fullWidth variant="outlined">
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          {...field}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? 'hide the password' : 'display the password'
                }
                onClick={handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>
    </>
  )
}