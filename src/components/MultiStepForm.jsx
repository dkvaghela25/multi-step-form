import { useState } from 'react';
import CustomStepper from './CustomStepper';
import Buttons from './Buttons';
import { Paper } from '@mui/material';
import { FormProvider, useForm } from "react-hook-form";
import BasicInfo from './FormComponents/BasicInfo';
import Education from './FormComponents/Education';
import Review from './FormComponents/Review';
import Security from './FormComponents/Security';
import Skills from './FormComponents/Skills';
import { WidthFull } from '@mui/icons-material';

const MultiStepForm = () => {

    const steps = [
        "Basic Info",
        "Education",
        "Skills",
        "Security",
        "Review & Submit"
    ]

    const [step, setStep] = useState(1)

    const methods = useForm({
        defaultValues: {
            fullName: "",
            userName: "",
            password: "",
            confirmPassword: "",
            age: "",
            emailId: "",
            phoneNo: "",
            dob: null,
            qualifications: {
                "SSC" : { qualification: "SSC", instituteName: "", passingYear: null, percentage: "", specialization: ""},
                "HSC" : { qualification: "HSC", instituteName: "", passingYear: null, percentage: "", specialization: ""},
                "Bachelor's Degree" : { qualification: "Bachelor's Degree", instituteName: "", passingYear: null, percentage: "", specialization: ""},
                "Master's Degree" : { qualification: "Master's Degree", instituteName: "", passingYear: null, percentage: "", specialization: ""},
            },
            skills: [],
            accountType: "",
            githubUrl: ""
        },
    })

    const getFormFields = () => {
        switch (step) {
            case 0: return <BasicInfo />
            case 1: return <Education />
            case 2: return <Skills />
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
            <CustomStepper steps={steps} step={step} />
            <FormProvider {...methods}>
                <form action="" style={{ width: '100%' }} autoComplete="off">
                    {getFormFields()}
                </form>
            </FormProvider>
            <Buttons step={step} setStep={setStep} />
        </Paper>
    );
};

export default MultiStepForm;