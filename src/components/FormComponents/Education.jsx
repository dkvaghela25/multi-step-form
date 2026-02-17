import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from "@mui/x-date-pickers";
import LabeledContainer from "../LabeledContainer";

const Education = () => {

  const { control, errors } = useFormContext();
  const qualifications = [
      "SSC",
      "HSC",
      "Bachelors Degree",
      "Masters Degree"
    ];

  return (
    <>
      {qualifications.map((qualification, index) => {
        return <EducationFields key={index} qualification={qualification} control={control} errors={errors} />
      })}
    </>
  );
};

export default Education;

const EducationFields = ({ qualification, control }) => {
  return (
    <LabeledContainer label={qualification} sx={{mt: 5}}>

      <Controller
        name={`qualifications.${qualification}.instituteName`}
        control={control}
        render={({ field, fieldState : {error} }) => <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          label="Institute Name"
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
          name={`qualifications.${qualification}.startDate`}
          control={control}
          render={({ field, fieldState: {error} }) => <DatePicker
            {...field}
            sx={{ width: '48%' }}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message,
              },
            }}
            label="Start Date"
          />}
        />

        <Controller
          name={`qualifications.${qualification}.endDate`}
          control={control}
          render={({ field, fieldState: {error} }) => <DatePicker
            {...field}
            sx={{ width: '48%' }}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message,
              },
            }}
            label="End Date"
          />}
        />
      </Box>

      <Controller
        name={`qualifications.${qualification}.specialization`}
        control={control}
        render={({ field, fieldState : {error} }) => <TextField
          {...field}
          fullWidth
          error={error}
          helperText={error?.message}
          label="Specialization"
          variant="outlined"
        />}
      />

      <Controller
        name={`qualifications.${qualification}.percentage`}
        control={control}
        render={({ field, fieldState : {error} }) => <TextField
          {...field}
          fullWidth
          error={error}
          helperText={error?.message}
          label="Percentage"
          variant="outlined"  
          type="number"
          // helperText={ error?.message ? er :"* If result is in CGPA than convert that into percentage according to your institute"}
        />}
      />
    </LabeledContainer>
  )
}