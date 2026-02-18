import Button from '@mui/material/Button';
import { Box, FormHelperText } from '@mui/material';
import { useState } from 'react';

export default function Buttons({ steps, step, setStep, trigger, handleSubmit }) {

    const [error, setError] = useState(false);

    const handleNext = async () => {

        const isValid = await trigger(steps[step].stepId);

        if (!isValid) {
            setError(true);
            return;
        }

        setError(false)
        setStep(prev =>
            prev < steps.length - 1 ? prev + 1 : prev
        );
    };

    const handleFormSubmit = async (data) => {
        console.log("+++++++++++++++++++++++++++++++++++");
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
            {error && <FormHelperText sx={{ width: "100%", textAlign: 'left', color: 'red' }}>* Their are some validation errors in this step please fix them before proceeding</FormHelperText>}
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