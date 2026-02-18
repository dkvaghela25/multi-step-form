import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ label, formField, accept }) {
  const { setValue, watch } = useFormContext();
  const profilePicture = watch(formField);

  return (
    <Box sx={{
      border: '1px solid #999999',
      borderRadius: '8px',
      display: "flex",
      justifyContent: 'space-between',
      p: '10px',
      alignItems: 'center'
    }}>
      {profilePicture ?
        <Typography variant="body2" color="initial">{profilePicture}</Typography> :
        <Typography variant="body1" color="#999999">Select Profile Image</Typography>
      }

      <Button
        sx={{ width: "fit-content" }}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {label}
        <VisuallyHiddenInput
          type="file"
          accept={accept}
          onChange={(event) => {
            setValue(formField, event.target.files[0].name)
            console.log(event.target.files[0].name)
          }}
          multiple
        />
      </Button>
    </Box>
  );
}
