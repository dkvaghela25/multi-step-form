import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Checkbox, FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const Security = () => {

  const { control } = useFormContext();

  return (
    <>

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

      <Controller
        name="twoFactorAuthorization"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            }
            label="Enable 2FA"
          />
        )}
      />

    </>
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