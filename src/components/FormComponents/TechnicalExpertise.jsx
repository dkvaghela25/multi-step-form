import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, TextField, Box, Chip, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import LabeledContainer from '../LabeledContainer';
import InputFileUpload from '../ui/InputFileUpload';
import skillsOptions from '../../api/skills.json'

const TechnicalExpertise = () => {

  const { control, trigger } = useFormContext();

  return (
    <>

      <Controller
        name="technicalExpertise.skills"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Autocomplete
            multiple
            filterSelectedOptions
            options={skillsOptions}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
              trigger('skills');
            }}
            onBlur={() => trigger('skills')}
            noOptionsText="No skills available"
            renderInput={(params) => (
              <TextField
              required
                {...params}
                label="Skills"
                placeholder="Select Skills"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />

      <LabeledContainer label="Experience Level *">
        <Controller
          name="technicalExpertise.experienceLevel"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl required error={!!error}>
              <RadioGroup {...field} row>
                <FormControlLabel value="beginner" control={<Radio />} label="Beginner" />
                <FormControlLabel value="intermediate" control={<Radio />} label="Intermediate" />
                <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
              </RadioGroup>
              {error && <Typography sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>{error.message}</Typography>}
            </FormControl>
          )}
        />
      </LabeledContainer>

      <Controller
        name={`technicalExpertise.experience`}
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          required
          error={!!error}
          helperText={error?.message}
          label="Years of Experience"
          variant="outlined"
          type="text"
        />}
      />

      <Controller
        name={`technicalExpertise.githubUrl`}
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          required
          error={!!error}
          helperText={error?.message}
          label="Github URL"
          variant="outlined"
        />}
      />

      <Controller
        name={`technicalExpertise.portfolio`}
        control={control}
        render={({ field, fieldState: { error } }) => <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          label="Portfolio URL"
          variant="outlined"
        />}
      />

      <InputFileUpload label="Resume Upload" formField="technicalExpertise.resume" accept="application/pdf" />

    </>
  );
};

export default TechnicalExpertise;
