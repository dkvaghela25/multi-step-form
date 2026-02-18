import { Box, TextField, useTheme, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers';
import InputFileUpload from "../ui/InputFileUpload";
import { useEffect } from "react";

const BasicInfo = () => {

  const { control, setValue, watch, trigger } = useFormContext();

  const dob = watch("basicInfo.dob");
  const profilePicture = watch('basicInfo.profilePicture');

  useEffect(() => {
    if (dob) {
      const now = new Date();
      let age = now.getFullYear() - dob.getFullYear();
      setValue("basicInfo.age", age > 0 ? age : 0);
      trigger('dob');
    }
  }, [dob, setValue, trigger]);

  console.log(useTheme());

  return (
    <>
      <Controller
        name="basicInfo.fullName"
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          required
          error={!!error}
          helperText={error?.message}
          label="Full Name"
          variant="outlined"
        />}
      />

      <Controller
        name="basicInfo.userName"
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          required
          error={!!error}
          helperText={error?.message}
          label="User Name"
          variant="outlined"
        />}
      />

      <Controller
        name="basicInfo.emailId"
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          required
          error={!!error}
          helperText={error?.message}
          type="email"
          label="Email ID"
          variant="outlined"
        />}
      />

      <Controller
        name="basicInfo.phoneNo"
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          required
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
          name="basicInfo.dob"
          control={control}
          render={({ field, fieldState: { error } }) => <DatePicker
            {...field}
            onChange={(date) => {
              field.onChange(date);
              trigger('basicInfo.dob');
            }}
            onBlur={() => trigger('basicInfo.dob')}
            format="dd-MM-yyyy"
            disableFuture
            minDate={new Date(1980, 0, 1)}
            sx={{ width: '48%' }}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message,
              },
            }}
            label="Date Of Birth *"
          />}
        />

        <Controller
          name="basicInfo.age"
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

      <Box sx={{
        border: '1px solid #999999',
        borderRadius: '8px',
        display: "flex",
        justifyContent: 'space-between',
        p: '10px',
        alignItems: 'center'
      }}>

        {profilePicture ?
          <Typography variant="body2" color="initial">{profilePicture}</Typography> :
          <Typography variant="body1" color="#999999">Select Profile Image</Typography>
        }

        <InputFileUpload label="Profile Picture Upload" formField="basicInfo.profilePicture" />
      </Box>

    </>
  );
};

export default BasicInfo;
