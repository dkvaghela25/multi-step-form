import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const Security = () => {

  const { control } = useFormContext();

  return (
    <>

      <Controller
        name="security.password"
        control={control}
        render={({ field, fieldState: { error } }) => <PasswordField label='Password *' error={error} field={field} />}
      />

      <Controller
        name="security.confirmPassword"
        control={control}
        render={({ field, fieldState: { error } }) => <PasswordField label='Confirm Password *' field={field} error={error} />}
      />

      <Controller
        name="security.twoFactorAuthorization"
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

const PasswordField = ({ field, label, error }) => {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <FormControl fullWidth variant="outlined">
        <InputLabel error={error}>{label}</InputLabel>
        <OutlinedInput
        sx={error ? { color: 'error.main' } : {}}
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
          error={!!error}
          helperText={error?.message}
        />
        {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
      </FormControl>
    </>
  )
}