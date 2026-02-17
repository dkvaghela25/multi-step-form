import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const Review = () => {

  const { control, getValues } = useFormContext();

  console.log(getValues());

  return (
    <>
      <Controller
        name="twoFactorAuthorization"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            }
            label="* I Agree to terms and conditions"
          />
        )}
      />
    </>
  );
};

export default Review;