import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from "@mui/x-date-pickers";
import LabeledContainer from "../LabeledContainer";
import { useState } from "react";

const Education = () => {

  const { control, errors, watch, trigger } = useFormContext();
  const [selectValue, setSelectValue] = useState("");
  const [qualifications, setQualifications] = useState([]);

  console.log(useFormContext());

  const handleChange = (e) => {
    setSelectValue(e.target.value)
  }

  const handleClick = () => {

    if (!selectValue) return;
    if (qualifications.includes(selectValue)) return;

    const educationOrder = [
      "SSC",
      "HSC",
      "Bachelor's Degree",
      "Master's Degree"
    ];

    const currentIndex = educationOrder.indexOf(selectValue);

    if (currentIndex === 0) {
      setQualifications(prev => [...prev, selectValue]);
    } else {
      const previousRequired = educationOrder[currentIndex - 1];
      if (qualifications.includes(previousRequired)) {
        setQualifications(prev => [...prev, selectValue]);
      }
    }

  };

  return (
    <>
      {qualifications.map((qualification, index) => {
        return <EducationFields key={index} qualification={qualification} control={control} errors={errors} watch={watch} trigger={trigger} />
      })}

      <Box
        sx={{
          display: "flex",
          width: '100%',
          justifyContent: "space-between"
        }}
      >
        <FormControl sx={{
          width: '75%',
        }} >
          <InputLabel>Qualification</InputLabel>
          <Select
            value={selectValue}
            onChange={handleChange}
            label="Qualification"
          >
            <MenuItem value="SSC">SSC</MenuItem>
            <MenuItem value="HSC">HSC</MenuItem>
            <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
            <MenuItem value="Master's Degree">Master's Degree</MenuItem>
          </Select>
        </FormControl>

        <Button sx={{ width: 'fit-content' }} variant="contained" startIcon={<AddIcon />} onClick={handleClick}>
          Add Education
        </Button>
      </Box>
    </>
  );
};

export default Education;

const EducationFields = ({ qualification, control, watch, trigger }) => {
  const startDateValue = new Date(watch(`education.${qualification}.startDate`));
  return (
    <LabeledContainer label={qualification} sx={{ mt: 5 }}>

      <Controller
        name={`education.${qualification}.instituteName`}
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
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
          name={`education.${qualification}.startDate`}
          control={control}
          render={({ field, fieldState: { error } }) => <DatePicker
            format="dd-MM-yyyy"
            disableFuture
            onChange={(date) => {
              field.onChange(date);
              trigger(`education.${qualification}.startDate`);
            }}
            onBlur={() => trigger(`education.${qualification}.startDate`)}
            minDate={new Date(1980, 0, 1)}
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
          name={`education.${qualification}.endDate`}
          control={control}
          render={({ field, fieldState: { error } }) => <DatePicker
            format="dd-MM-yyyy"
            disableFuture
            onChange={(date) => {
              field.onChange(date);
              trigger(`education.${qualification}.endDate`);
            }}
            onBlur={() => trigger(`education.${qualification}.endDate`)}
            minDate={startDateValue}
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
        name={`education.${qualification}.specialization`}
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          error={error}
          helperText={error?.message}
          label="Specialization"
          variant="outlined"
        />}
      />

      <Controller
        name={`education.${qualification}.percentage`}
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          error={error}
          helperText={error?.message}
          label="Percentage"
          variant="outlined"
          type="number"
        />}
      />
    </LabeledContainer>
  )
}