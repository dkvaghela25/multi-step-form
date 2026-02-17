import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from "@mui/x-date-pickers";
import LabeledContainer from "../LabeledContainer";

const Education = () => {

  const { control } = useFormContext();
  const qualifications = [
      "SSC",
      "HSC",
      "Bachelors Degree",
      "Masters Degree"
    ];

  return (
    <>
      {qualifications.map((qualification, index) => {
        return <EducationFields key={index} qualification={qualification} control={control} />
      })}
    </>
  );
};

export default Education;

const EducationFields = ({ qualification, control }) => {
  console.log(qualification);
  console.log(`qualifications.${qualification}.instituteName`);
  return (
    <LabeledContainer label={qualification} sx={{mt: 5}}>

      <Controller
        name={`qualifications.${qualification}.instituteName`}
        control={control}
        render={({ field }) => <TextField
          {...field}
          fullWidth
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
          render={({ field }) => <DatePicker
            {...field}
            sx={{ width: '48%' }}
            label="Start Date"
          />}
        />

        <Controller
          name={`qualifications.${qualification}.endDate`}
          control={control}
          render={({ field }) => <DatePicker
            {...field}
            sx={{ width: '48%' }}
            label="End Date"
          />}
        />
      </Box>

      <Controller
        name={`qualifications.${qualification}.specialization`}
        control={control}
        render={({ field }) => <TextField
          {...field}
          fullWidth
          label="Specialization"
          variant="outlined"
        />}
      />

      <Controller
        name={`qualifications.${qualification}.percentage`}
        control={control}
        render={({ field }) => <TextField
          {...field}
          fullWidth
          label="Percentage"
          variant="outlined"
          helperText="* If result is in CGPA than convert that into percentage according to your institute"
        />}
      />
    </LabeledContainer>
  )
}