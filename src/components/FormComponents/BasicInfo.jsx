import { Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers';
import InputFileUpload from "../ui/InputFileUpload";
import { useEffect } from "react";

const BasicInfo = () => {

  const { control, setValue, watch, formState: { errors }, trigger } = useFormContext();

  const dob = watch("dob");

  useEffect(() => {
    if (dob) {
      const now = new Date();
      let age = now.getFullYear() - dob.getFullYear();
      setValue("age", age > 0 ? age : 0);
      trigger('dob');
    }
  }, [dob, setValue, trigger]);


  return (
    <>
      <Controller
        name="fullName"
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          label="Full Name"
          variant="outlined"
        />}
      />

      <Controller
        name="userName"
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          label="User Name"
          variant="outlined"
        />}
      />

      <Controller
        name="emailId"
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          type="email"
          label="Email ID"
          variant="outlined"
        />}
      />

      <Controller
        name="phoneNo"
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          type="tel"
          label="Phone Number"
          variant="outlined"
        />}
      />

      <Box
        sx={{
          display: "flex",
          width: '100%',
          justifyContent: "space-between"
        }}
      >
        <Controller
          name="dob"
          control={control}
          render={({ field, fieldState: {error} }) => <DatePicker
            {...field}
            sx={{ width: '48%' }}
            onChange={(date) => {
              field.onChange(date);
              trigger('dob');
            }}
            onBlur={() => trigger('dob')}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message,
              },
            }}
            label="Date Of Birth"
          />}
        />

        <Controller
          name="age"
          control={control}
          render={({ field }) => <TextField
            {...field}
            disabled
            sx={{ width: '48%' }}
            label="Age"
            variant="outlined"
          />}
        />


      </Box>

      <InputFileUpload label="Profile Picture Upload" />
    </>
  );
};

export default BasicInfo;
