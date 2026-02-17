import { Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers';
import InputFileUpload from "../ui/InputFileUpload";
import { useEffect } from "react";

const BasicInfo = () => {

  const { control, setValue, watch } = useFormContext();

  const dob = watch("dob");

  useEffect(() => {
    if (dob) {
      const now = new Date();
      let age = now.getFullYear() - dob.getFullYear();
      setValue("age", age > 0 ? age : 0);
    }
  }, [dob, setValue]);


  return (
    <>
      <Controller
        name="fullName"
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
