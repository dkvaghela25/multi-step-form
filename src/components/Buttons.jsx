import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useFormContext } from "react-hook-form";

export default function Buttons({ steps, step, setStep, handleSubmit, setError }) {

    const {trigger, formState: { errors }} = useFormContext()
    
    const handleNext = async () => {

        const isValid = await trigger(steps[step].stepId);

        if (!isValid) {
            setError(true);
            return;
        }

        setStep(prev => 
            prev < steps.length - 1 ? prev + 1 : prev
        );
        setError(false)
    };

    const handleFormSubmit = async (data) => {
        const isValid = await trigger();

        if (!isValid) {
            setError(true);
            return;
        }

        console.log(data)
        alert(JSON.stringify(data))
        setStep(5)
    }

    const handleBack = () => {
        setStep(prev => {
            if (prev >= 0) {
                return prev - 1
            }
        })
    }

    return (
        <>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                {step <= 4 && <Button variant="contained" onClick={handleBack} disabled={step == 0}>Back</Button>}
                {step < 4 && <Button variant="contained" onClick={handleNext}>Next</Button>}
                {step == 4 && <Button variant="contained" onClick={handleSubmit(handleFormSubmit)}>Submit</Button>}
            </Box>
        </>
    );
}