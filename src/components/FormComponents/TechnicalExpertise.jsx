import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, TextField, Box, Chip, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import LabeledContainer from '../LabeledContainer';
import InputFileUpload from '../ui/InputFileUpload';
import skillsOptions from '../../api/skills.json'

const TechnicalExpertise = () => {

  const { control, errors } = useFormContext();
  console.log(errors);

  return (
    <>

      <Controller
        name="skills"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Autocomplete
            multiple
            options={skillsOptions}
            value={value || []}
            onChange={(event, newValue) => onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Skills"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />



      <LabeledContainer label="Experience Level">
        <Controller
          name="experienceLevel"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={error}>
              <RadioGroup {...field} row>
                <FormControlLabel value="beginner" control={<Radio />} label="Beginner" />
                <FormControlLabel value="intermediate" control={<Radio />} label="Intermediate" />
                <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
              </RadioGroup>
              {error && error.message}
            </FormControl>
          )}
        />
      </LabeledContainer>

      <Controller
        name={`experience`}
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          error={error}
          helperText={error?.message}
          label="Years of Experience"
          variant="outlined"
        />}
      />

      <Controller
        name={`githubUrl`}
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          error={error}
          helperText={error?.message}
          label="Github Url"
          variant="outlined"
        />}
      />

      <Controller
        name={`portfolio`}
        control={control}
        render={({ field }) => <TextField
          {...field}
          fullWidth
          label="Portfolio URL"
          variant="outlined"
        />}
      />

      <InputFileUpload label="Resume Upload" />

    </>
  );
};

export default TechnicalExpertise;
