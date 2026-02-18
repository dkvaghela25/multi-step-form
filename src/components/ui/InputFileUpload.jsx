import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFormContext } from 'react-hook-form';

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

export default function InputFileUpload({ label, formField }) {
  const { setValue } = useFormContext();
  return (
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
        onChange={(event) => {
          setValue(formField, event.target.files[0].name)
          console.log(event.target.files[0].name)
        }}
        multiple
      />
    </Button>
  );
}
