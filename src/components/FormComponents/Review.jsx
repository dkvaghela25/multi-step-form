import { Controller, useFormContext } from "react-hook-form";
import Typography from '@mui/material/Typography'
import { Box, Checkbox, Divider, FormControlLabel, FormHelperText, Grid, Paper } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Review = () => {

  const { control, getValues } = useFormContext();

  const formData = getValues();

  // const formData = {
  //   "basicInfo": {
  //     "fullName": "Divyang Vaghela",
  //     "userName": "dkvaghela25",
  //     "emailId": "divyang.vaghela25@gmail.com",
  //     "phoneNo": "9876543210",
  //     "dob": new Date("2003-05-21T00:00:00.000Z"),
  //     "age": 22
  //   },
  //   "education": {
  //     "SSC": {
  //       "qualification": "SSC",
  //       "instituteName": "Shree Swaminarayan High School",
  //       "startDate": new Date("2003-05-21T00:00:00.000Z"),
  //       "endDate": new Date("2003-05-21T00:00:00.000Z"),
  //       "percentage": 85,
  //       "specialization": "General"
  //     },
  //     "HSC": {
  //       "qualification": "HSC",
  //       "instituteName": "Lancer's Army School",
  //       "startDate": new Date("2003-05-21T00:00:00.000Z"),
  //       "endDate": new Date("2003-05-21T00:00:00.000Z"),
  //       "percentage": 88,
  //       "specialization": "Science"
  //     },
  //     "Bachelors Degree": {
  //       "qualification": "Bachelor's Degree",
  //       "instituteName": "Government Engineering College, Surat",
  //       "startDate": new Date("2003-05-21T00:00:00.000Z"),
  //       "endDate": new Date("2003-05-21T00:00:00.000Z"),
  //       "percentage": 8.2,
  //       "specialization": "Computer Engineering"
  //     },
  //     "Masters Degree": {
  //       "qualification": "Master's Degree",
  //       "instituteName": "N/A",
  //       "startDate": null,
  //       "endDate": null,
  //       "percentage": 0,
  //       "specialization": ""
  //     }
  //   },
  //   "technicalExpertise": {
  //     "skills": [
  //       "JavaScript",
  //       "React.js",
  //       "Node.js",
  //       "Express.js",
  //       "MongoDB",
  //       "MERN Stack",
  //       "Git",
  //       "REST APIs"
  //     ],
  //     "experienceLevel": "Intermediate",
  //     "experience": "1.5 Years",
  //     "portfolio": "https://divyang-portfolio.vercel.app",
  //     "githubUrl": "https://github.com/dkvaghela25"
  //   },
  //   "security": {
  //     "password": "Divyang@123",
  //     "confirmPassword": "Divyang@123",
  //     "twoFactorAuthorization": true
  //   }
  // }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Basic Information */}
      <Paper elevation={20} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography variant="h4" color="primary">Basic Information</Typography>
        <Divider sx={{ mt: 1 }} />
        <FieldValue label="Full Name" value={formData?.basicInfo?.fullName} />
        <FieldValue label="User Name" value={formData?.basicInfo?.userName} />
        <FieldValue label="Email Id" value={formData?.basicInfo?.emailId} />
        <FieldValue label="Phone No" value={formData?.basicInfo?.phoneNo} />
        <FieldValue label="Date Of Birth" value={formData?.basicInfo?.dob?.toLocaleDateString()} />
        <FieldValue label="Age" value={formData?.basicInfo?.age} />
      </Paper>

      {/* Education */}
      <Paper elevation={20} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography variant="h4" color="primary">Education</Typography>
        {Object.keys(formData.education).map(key => {
          return (
            <>
              <Divider sx={{ my: 2 }} />
              <FieldValue label="Qualification" value={formData?.education[key]?.qualification} />
              <FieldValue label="Institute Name" value={formData?.education[key]?.instituteName} />
              <FieldValue label="Start Date" value={formData?.education[key]?.startDate?.toLocaleDateString()} />
              <FieldValue label="End Date" value={formData?.education[key]?.endDate?.toLocaleDateString()} />
              <FieldValue label="Specialization" value={formData?.education[key]?.specialization} />
              <FieldValue label="Percentage" value={formData?.education[key]?.percentage} />
            </>
          )
        })}

      </Paper>

      {/* Technical Expertise */}
      <Paper elevation={20} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography variant="h4" color="primary">Technical Expertise</Typography>
        <Divider sx={{ mt: 1 }} />
        <FieldValue label="Skills" value={formData?.technicalExpertise?.skills.join(", ")} />
        <FieldValue label="Experience Level" value={formData?.technicalExpertise?.experienceLevel} />
        <FieldValue label="Experience" value={formData?.technicalExpertise?.experience} />
        <FieldValue label="Github Url" value={formData?.technicalExpertise?.githubUrl} />
        <FieldValue label="Portfolio" value={formData?.technicalExpertise?.portfolio} />
      </Paper>

      {/* Security */}
      <Paper elevation={20} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography variant="h4" color="primary">Security</Typography>
        <Divider sx={{ mt: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {(formData?.security?.password && formData?.security?.confirmPassword) ? <CheckCircleIcon sx={{ color: 'green' }} /> : <CancelIcon sx={{ color: 'red' }} />}
          <Typography sx={{ color: 'text.primary', fontWeight: 800 }} variant="body2" color="initial">
            {(formData?.security?.password && formData?.security?.confirmPassword) ?
              "Password is securely saved" :
              "Password is not  saved"}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {(formData?.security?.twoFactorAuthorization) ? <CheckCircleIcon sx={{ color: 'green' }} /> : <CancelIcon sx={{ color: 'red' }} />}
          <Typography sx={{ color: 'text.primary', fontWeight: 800 }} variant="body2" color="initial">
            {(formData?.security?.twoFactorAuthorization) ?
              "Two Factor Authorization is enabled" :
              "Two Factor Authorization is disabled"}
          </Typography>
        </Box>
      </Paper>

      {/* Final Agreement */}
      <Paper elevation={20} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography variant="h4" color="primary">Final Agreement</Typography>
        <Divider sx={{ mt: 1 }} />

        <Controller
          name="review.agreement"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => field.onChange(e.target.checked)}
                    checked={field.value}
                  />
                }
                label="* I Agree to terms and conditions"
              />
              {error && <FormHelperText sx={{ width: "100%", textAlign: 'left', color: 'red' }}>* You must agree to terms and conditions</FormHelperText>}
            </>
          )}
        />

      </Paper>

    </Box>
  );
};

export default Review;

const FieldValue = ({ label, value }) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid size={3}><Typography sx={{ fontWeight: 800, color: 'text.primary' }} variant="body2" color="initial">{label}</Typography></Grid>
      <Grid size={1}><Typography sx={{ color: 'text.primary' }} Typography variant="body2" color="initial">:</Typography></Grid>
      <Grid size={8}><Typography sx={{ color: 'text.primary' }} variant="body2" color="initial">{value || "N/A"}</Typography></Grid>
    </Grid>
  )
}