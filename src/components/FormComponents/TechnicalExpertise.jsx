import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, TextField, Box, Chip, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import LabeledContainer from '../LabeledContainer';
import InputFileUpload from '../ui/InputFileUpload';
import skills from '../../api/skills.json'

const TechnicalExpertise = () => {

  const { control } = useFormContext();

  return (
    <>

      {/* <Controller
        name={`skills`}
        control={control}
        render={({ field }) => <Autocomplete
          multiple
          options={skills}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Skills"
              placeholder="Select Skill"
            />
          )}
        />}
      /> */}

      <Controller
        name="skills"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            options={skills}
            value={value || []}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            onChange={(event, newValue) => {
              onChange(newValue); 
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Skills"
                placeholder="Select Skill"
              />
            )}
          />
        )}
      />


      <LabeledContainer label="Experience Level">
        <Controller
          name="experienceLevel"
          control={control}
          render={({ field }) => (
            <FormControl>
              <RadioGroup {...field} row>
                <FormControlLabel value="beginner" control={<Radio />} label="Beginner" />
                <FormControlLabel value="intermediate" control={<Radio />} label="Intermediate" />
                <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
              </RadioGroup>
            </FormControl>
          )}
        />
      </LabeledContainer>

      <Controller
        name={`experience`}
        control={control}
        render={({ field }) => <TextField
          {...field}
          fullWidth
          label="Years of Experience"
          variant="outlined"
        />}
      />

      <Controller
        name={`githubUrl`}
        control={control}
        render={({ field }) => <TextField
          {...field}
          fullWidth
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
