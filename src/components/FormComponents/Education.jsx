import { Box, Button, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from "@mui/x-date-pickers";
import LabeledContainer from "../LabeledContainer";
import { useState } from "react";

const Education = () => {

  const [error, setError] = useState("");
  const { control, watch, trigger, setValue, formState: { errors } } = useFormContext();
  const [selectValue, setSelectValue] = useState("");
  const qualifications = watch('education.qualifications')

  const handleClick = () => {

    if (!selectValue) return;
    if (qualifications.includes(selectValue)) return;

    const educationOrder = [
      "SSC",
      "HSC",
      "Bachelors Degree",
      "Masters Degree"
    ];

    const currentIndex = educationOrder.indexOf(selectValue);

    if (currentIndex !== 0) {
      const previousRequired = educationOrder[currentIndex - 1];
      if (qualifications.includes(previousRequired) === false) {
        setError(`Please fill details of ${previousRequired} before ${selectValue}`)
        return;
      }
    }

    setValue('education.qualifications',[...qualifications, selectValue])
    trigger('education.qualifications')

  };

  return (
    <>
      <Typography variant="body1" color="gray"> * You Must have SSC, HSC, and Bachelors Degree as Qualifications</Typography>

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

        <FormControl sx={{ width: '70%' }} >
          <InputLabel>Qualification</InputLabel>
          <Select
            label="Qualification"
            value={selectValue}
            onChange={(e) => {
              setSelectValue(e.target.value)
            }}
          >
            <MenuItem value="SSC">SSC</MenuItem>
            <MenuItem value="HSC">HSC</MenuItem>
            <MenuItem value="Bachelors Degree">Bachelor's Degree</MenuItem>
            <MenuItem value="Masters Degree">Master's Degree</MenuItem>
          </Select>
        </FormControl>

        <Button
          sx={{ width: 'fit-content' }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          Add Qualification
        </Button>

      </Box>
      {error && <FormHelperText sx={{ width: "100%", textAlign: 'left', color: 'red' }}>{error}</FormHelperText>}
      {errors?.education?.qualifications && <FormHelperText sx={{ width: "100%", textAlign: 'left', color: 'red' }}>{errors?.education?.qualifications.message}</FormHelperText>}
    </>
  );
};

export default Education;

const EducationFields = ({ qualification, control, watch }) => {
  const startDateValue = new Date(watch(`education.${qualification}.startDate`));

  const specializations = qualification === "Bachelors Degree" ? [
    "Bachelor of Science in Computer Science (BSCS)",
    "Bachelor of Science in Software Engineering (BSSE)",
    "Bachelor of Technology in Computer Science (B.Tech)",
    "Bachelor of Engineering in Computer Science (B.E.)",
    "Bachelor of Computer Applications (BCA)",
    "Bachelor of Science in Information Technology (BSIT)",
    "Bachelor of Science in Data Science",
    "Bachelor of Science in Artificial Intelligence and Machine Learning",
    "Bachelor of Science in Cyber Security",
    "Bachelor of Science in Game Design and Development",
    "Bachelor of Business Information Systems (BBIS)",
    "Bachelor of Science in Computer Engineering",
    "Bachelor of Science in Web Development",
    "Bachelor of Science in Mobile Computing",
    "Bachelor of Science in Bioinformatics",
    "Bachelor of Science in Computational Mathematics"
  ] : [
    "M.Tech. in Computer Science and Engineering (CSE)",
    "M.Tech. in Software Engineering",
    "M.Tech. in Artificial Intelligence and Data Science",
    "M.Tech. in Information Technology",
    "M.Tech. in Cyber Security and Forensics",
    "M.Tech. in VLSI and Embedded Systems",
    "M.Tech. in Network and Communication Engineering",
    "M.Tech. in Cloud Computing and Virtualization",
    "M.Tech. in Machine Learning and Intelligent Systems",
    "M.Tech. in High-Performance Computing",
    "M.Tech. in Internet of Things (IoT)",
    "M.Tech. in Robotics and Automation",
    "M.Tech. in Big Data Analytics",
    "M.Tech. in Image Processing and Computer Vision",
    "M.Tech. in Bio-Medical Engineering (Computational Focus)",
    "M.Tech. in Geoinformatics"
  ]

  return (
    <LabeledContainer label={qualification} sx={{ mt: 5 }}>

      <Controller
        name={`education.${qualification}.instituteName`}
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          required
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
            minDate={new Date(1980, 0, 1)}
            {...field}
            sx={{ width: '48%' }}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message,
                required: true
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
            minDate={startDateValue}
            {...field}
            sx={{ width: '48%' }}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message,
                required: true
              },
            }}
            label="End Date"
          />}
        />
      </Box>

      {console.log((qualification !== "SSC" || qualification !== "HSC"))}
      {(qualification !== "SSC" && qualification !== "HSC") && <Controller
        name={`education.${qualification}.specialization`}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => <FormControl fullWidth>
          <InputLabel error={error} required id="demo-simple-select-label">Specialization</InputLabel>
          <Select
          required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            error={error}
            label="Specialization"
            onChange={onChange}
          >
            {specializations.map((specialization, index) => {
              return <MenuItem key={index} value={specialization}>{specialization}</MenuItem>
            })}
          </Select>
        </FormControl>}
      />}

      <Controller
        name={`education.${qualification}.percentage`}
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          required
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