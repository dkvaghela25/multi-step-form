import { useState } from 'react';
import CustomStepper from './ui/CustomStepper';
import Buttons from './Buttons';
import { Box, FormHelperText, Paper } from '@mui/material';
import { FormProvider, useForm } from "react-hook-form";
import BasicInfo from './FormComponents/BasicInfo';
import Education from './FormComponents/Education';
import Review from './FormComponents/Review';
import Security from './FormComponents/Security';
import TechnicalExpertise from './FormComponents/TechnicalExpertise';
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from '../utils/validationSchema';
import ThankYouPage from './FormComponents/ThankYouPage';
import { DevTool } from '@hookform/devtools';

const MultiStepForm = () => {

    const [error, setError] = useState(false);

    const steps = [
        { stepId: "basicInfo", label: "Basic Information" },
        { stepId: "education", label: "Education" },
        { stepId: "technicalExpertise", label: "Technical Expertise" },
        { stepId: "security", label: "Security" },
        { stepId: "review", label: "Review & Submit" }
    ]

    const [step, setStep] = useState(0)

    const methods = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            basicInfo: {
                fullName: "",
                userName: "",
                emailId: "",
                phoneNo: "",
                dob: null,
                age: "",
                profilePicture: ""
            },
            education: {
                qualifications: [],
                "SSC": { qualification: "SSC", instituteName: "", startDate: null, endDate: null, percentage: "", specialization: "" },
                "HSC": { qualification: "HSC", instituteName: "", startDate: null, endDate: null, percentage: "", specialization: "" },
                "Bachelors Degree": { qualification: "Bachelor's Degree", instituteName: "", startDate: null, endDate: null, percentage: "", specialization: "" },
                "Masters Degree": { qualification: "Master's Degree", instituteName: "", startDate: null, endDate: null, percentage: "", specialization: "" },
            },
            technicalExpertise: {
                skills: [],
                experienceLevel: "",
                experience: "",
                portfolio: "",
                githubUrl: "",
                resume: ""
            },
            security: {
                password: "",
                confirmPassword: "",
                twoFactorAuthorization: false,
            },
            review: {
                agreement: false,
            }
        },
    })

    const getFormFields = () => {
        switch (step) {
            case 0: return <BasicInfo />
            case 1: return <Education />
            case 2: return <TechnicalExpertise />
            case 3: return <Security />
            case 4: return <Review />
            case 5: return <ThankYouPage />
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
            <FormProvider {...methods}>
                <CustomStepper steps={steps} currStep={step} setStep={setStep} setError={setError} />
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
                    <DevTool control={methods.control} />
                </form>

                {error && <FormHelperText sx={{ width: "100%", textAlign: 'left', color: 'red' }}>* Their are some validation errors in this step please fix them before proceeding</FormHelperText>}
                <Buttons steps={steps} step={step} setStep={setStep} trigger={methods.trigger} handleSubmit={methods.handleSubmit} setError={setError} />
            </FormProvider>
        </Paper>
    );
};

export default MultiStepForm;