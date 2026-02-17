import { Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from "react";

const BasicInfo = () => {

  const { control, watch } = useFormContext();

  const dob = watch("dob")
  const now = new Date();
  const age = dob ? now.getFullYear() - dob.getFullYear() : "";

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
        name="firstName"
        control={control}
        render={({ field }) => <TextField
          {...field}
          fullWidth
          label="Full Name"
          variant="outlined"
        />}
      />

      <Controller
        name="userName"
        control={control}
        render={({ field }) => <TextField
          {...field}
          fullWidth
          label="User Name"
          variant="outlined"
        />}
      />

      <Controller
        name="emailId"
        control={control}
        render={({ field }) => <TextField
          {...field}
          fullWidth
          type="email"
          label="Email ID"
          variant="outlined"
        />}
      />

      <Controller
        name="phoneNo"
        control={control}
        render={({ field }) => <TextField
          {...field}
          fullWidth
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
          render={({ field }) => <DatePicker
            sx={{ width: '48%' }}
            {...field}
            label="Date Of Birth"
          />}
        />

        <Controller
          name="age"
          control={control}
          render={({ field }) => <TextField
            {...field}
            sx={{ width: '48%' }}
            label="Age"
            variant="outlined"
            value={age}
          />}
        />

      </Box>


    </Box>
  );
};

export default BasicInfo;
