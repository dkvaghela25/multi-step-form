import { useState } from 'react';
import CustomStepper from './CustomStepper';
import Buttons from './Buttons';
import { Box, Paper } from '@mui/material';
import { FormProvider, useForm } from "react-hook-form";
import BasicInfo from './FormComponents/BasicInfo';
import Education from './FormComponents/Education';
import Review from './FormComponents/Review';
import Security from './FormComponents/Security';
import TechnicalExpertise from './FormComponents/TechnicalExpertise';

const MultiStepForm = () => {

    const steps = [
        "Basic Info",
        "Education",
        "Technical Expertise",
        "Security",
        "Review & Submit",
    ]

    const [step, setStep] = useState(2)

    const methods = useForm({
        defaultValues: {
            fullName: "",
            userName: "",
            password: "",
            confirmPassword: "",
            twoFactorAuthorization: false,
            age: "",
            emailId: "",
            phoneNo: "",
            dob: null,
            qualifications: {
                "SSC": { qualification: "SSC", instituteName: "", startDate: null, endDate: null, percentage: "", specialization: "" },
                "HSC": { qualification: "HSC", instituteName: "", startDate: null, endDate: null, percentage: "", specialization: "" },
                "Bachelors Degree": { qualification: "Bachelor's Degree", instituteName: "", startDate: null, endDate: null, percentage: "", specialization: "" },
                "Masters Degree": { qualification: "Master's Degree", instituteName: "", startDate: null, endDate: null, percentage: "", specialization: "" },
            },
            skills: [],
            experienceLevel: "",
            experience: "",
            portfolio: "",
            githubUrl: "",
        },
    })

    const getFormFields = () => {
        switch (step) {
            case 0: return <BasicInfo />
            case 1: return <Education />
            case 2: return <TechnicalExpertise />
            case 3: return <Security />
            case 4: return <Review />
            default: return <BasicInfo />
        }
    }

    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '30px',
                padding: '50px'
            }}
        >
            <CustomStepper steps={steps} step={step} setStep={setStep} />
            <FormProvider {...methods}>
                <form action="" style={{ width: '50vw' }} autoComplete="off">
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}
                    >
                        {getFormFields()}
                    </Box>
                </form>
            </FormProvider>
            <Buttons step={step} setStep={setStep} />
        </Paper>
    );
};

export default MultiStepForm;