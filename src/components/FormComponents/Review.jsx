import { Checkbox, FormControlLabel, Box, Typography, Card, CardContent, Divider, Grid, Chip, Stack } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Review = () => {

  const { control, getValues, formState: { errors } } = useFormContext();
  
  const formData = getValues();

  const ReviewSection = ({ title, children }) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
        {title}
      </Typography>
      <Card>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </Box>
  );

  const ReviewField = ({ label, value }) => (
    <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
        {label}:
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
        {value || 'N/A'}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Basic Info Section */}
      <ReviewSection title="Basic Information">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ReviewField label="Full Name" value={formData.fullName} />
            <ReviewField label="User Name" value={formData.userName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReviewField label="Email" value={formData.emailId} />
            <ReviewField label="Phone" value={formData.phoneNo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReviewField label="Date of Birth" value={formData.dob ? new Date(formData.dob).toLocaleDateString() : 'N/A'} />
            <ReviewField label="Age" value={formData.age} />
          </Grid>
        </Grid>
      </ReviewSection>

      {/* Education Section */}
      <ReviewSection title="Education">
        {['SSC', 'HSC', 'Bachelors Degree', 'Masters Degree'].map((qual, idx) => {
          const qualData = formData.qualifications?.[qual];
          if (!qualData || !qualData.instituteName) return null;
          return (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                {qual}
              </Typography>
              <Box sx={{ pl: 2 }}>
                <ReviewField label="Institute" value={qualData.instituteName} />
                <ReviewField label="Specialization" value={qualData.specialization || 'N/A'} />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <ReviewField label="Start Date" value={qualData.startDate ? new Date(qualData.startDate).toLocaleDateString() : 'N/A'} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <ReviewField label="End Date" value={qualData.endDate ? new Date(qualData.endDate).toLocaleDateString() : 'N/A'} />
                  </Box>
                </Box>
                <ReviewField label="Percentage" value={`${qualData.percentage}%`} />
              </Box>
              {idx < 3 && <Divider sx={{ my: 1.5 }} />}
            </Box>
          );
        })}
      </ReviewSection>

      {/* Technical Expertise Section */}
      <ReviewSection title="Technical Expertise">
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 1 }}>
            Skills:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {Array.isArray(formData.skills) && formData.skills.length > 0 ? (
              formData.skills.map((skill, idx) => (
                <Chip key={idx} label={skill} color="primary" variant="outlined" />
              ))
            ) : (
              <Typography variant="body2">No skills selected</Typography>
            )}
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ReviewField label="Experience Level" value={formData.experienceLevel} />
            <ReviewField label="Years of Experience" value={formData.experience} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReviewField label="GitHub URL" value={
              <a href={formData.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                {formData.githubUrl}
              </a>
            } />
            <ReviewField label="Portfolio URL" value={
              formData.portfolio ? (
                <a href={formData.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                  {formData.portfolio}
                </a>
              ) : 'N/A'
            } />
          </Grid>
        </Grid>
      </ReviewSection>

      {/* Security Section */}
      <ReviewSection title="Security">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <CheckCircleIcon sx={{ color: 'success.main' }} />
          <Typography variant="body2">
            Password is securely set
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {formData.twoFactorAuthorization ? (
            <>
              <CheckCircleIcon sx={{ color: 'success.main' }} />
              <Typography variant="body2">
                Two-Factor Authentication is enabled
              </Typography>
            </>
          ) : (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Two-Factor Authentication is disabled
            </Typography>
          )}
        </Box>
      </ReviewSection>

      {/* Agreement Section */}
      <ReviewSection title="Final Agreement">
        <Controller
          name="twoFactorAuthorization"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value}
                />
              }
              label="* I agree to the terms and conditions"
              sx={{ 
                display: 'block',
                '& .MuiFormControlLabel-label': { 
                  fontSize: '0.95rem',
                  fontWeight: 500
                }
              }}
            />
          )}
        />
        {errors.twoFactorAuthorization && (
          <Typography variant="caption" sx={{ color: 'error.main', display: 'block', mt: 1 }}>
            {errors.twoFactorAuthorization.message}
          </Typography>
        )}
      </ReviewSection>
    </Box>
  );
};

export default Review;