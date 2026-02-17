import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

const Education = () => {

  const { control } = useFormContext();
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
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {qualifications.map((qualification, index) => {
        return <EducationFields key={index} qualification={qualification} control={control} />
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
    </Box>
  );
};

export default Education;

const EducationFields = ({ qualification, control }) => {
  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid #999",
        borderRadius: 2,
        p: 3,
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: -10,
          left: 20,
          backgroundColor: "white",
          px: 1,
          fontSize: 14,
        }}
      >
        {qualification}
      </Typography>
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
    </Box>
  )
}