import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function Buttons({step, setStep}) {
  
    const handleNext = () => {
        setStep(prev => {
            if(prev <= 4){
                return prev + 1
            }
        })
    }
    
    const handleBack = () => {
        setStep(prev => {
            if(prev >= 0){
                return prev - 1
            }
        })
    }
    
    const handleSubmit = () => {}
  
    return (
    <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }}>
      <Button variant="contained" onClick={handleBack} disabled={step == 0}>Back</Button>
      <Button variant="contained" onClick={step == 4 ? handleSubmit : handleNext }>{step == 4 ? "Submit" : "Next" }</Button>
    </Box>
  );
}