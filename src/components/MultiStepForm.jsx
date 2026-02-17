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
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const MultiStepForm = () => {

    const steps = [
        "Basic Info",
        "Education",
        "Technical Expertise",
        "Security",
        "Review & Submit",
    ]

    const [step, setStep] = useState(0)

    const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    const schema = yup
        .object({
            fullName: yup.string()
                .required("Full Name is required field")
                .min(3, "Full Name must be at least 3 characters")
                .max(50, "Full Name must not exceed 50 characters")
                .matches(/^[a-zA-Z\s]*$/, "Full Name can only contain letters and spaces"),
            userName: yup.string()
                .required("User Name is required field")
                .min(3, "User Name must be at least 3 characters")
                .max(20, "User Name must not exceed 20 characters")
                .matches(/^[a-zA-Z0-9_]*$/, "User Name can only contain letters, numbers, and underscores"),
            emailId: yup.string()
                .required("Email Id is required field")
                .email("Invalid Email Id"),
            phoneNo: yup.string()
                .matches(phoneRegExp, 'Invalid phone number format')
                .required('Phone number is required'),
            dob: yup.date()
                .nonNullable("Date Of Birth is required")
                .required("Date Of Birth is required")
                .typeError("Date Of Birth must be a valid date")
                .max(new Date(), "Date Of Birth cannot be in the future"),
            qualifications: yup.object({
                "SSC": yup.object({
                    instituteName: yup.string()
                        .required("Institute Name is required field")
                        .min(2, "Institute Name must be at least 2 characters"),
                    startDate: yup.date()
                        .nullable()
                        .required("Start Date is required")
                        .typeError("Start Date must be a valid date"),
                    endDate: yup.date()
                        .nullable()
                        .required("End Date is required")
                        .typeError("End Date must be a valid date")
                        .min(yup.ref('qualifications.SSC.startDate'), "End Date must be after Start Date"),
                    percentage: yup.number()
                        .required("Percentage is required field")
                        .typeError("Percentage must be a number")
                        .min(0, "Percentage cannot be less than 0")
                        .max(100, "Percentage cannot exceed 100"),
                    specialization: yup.string()
                }),
                "HSC": yup.object({
                    instituteName: yup.string()
                        .required("Institute Name is required field")
                        .min(2, "Institute Name must be at least 2 characters"),
                    startDate: yup.date()
                        .nullable()
                        .required("Start Date is required")
                        .typeError("Start Date must be a valid date"),
                    endDate: yup.date()
                        .nullable()
                        .required("End Date is required")
                        .typeError("End Date must be a valid date")
                        .min(yup.ref('qualifications.HSC.startDate'), "End Date must be after Start Date"),
                    percentage: yup.number()
                        .required("Percentage is required field")
                        .typeError("Percentage must be a number")
                        .min(0, "Percentage cannot be less than 0")
                        .max(100, "Percentage cannot exceed 100"),
                    specialization: yup.string()
                }),
                "Bachelors Degree": yup.object({
                    instituteName: yup.string()
                        .required("Institute Name is required field")
                        .min(2, "Institute Name must be at least 2 characters"),
                    startDate: yup.date()
                        .nullable()
                        .required("Start Date is required")
                        .typeError("Start Date must be a valid date"),
                    endDate: yup.date()
                        .nullable()
                        .required("End Date is required")
                        .typeError("End Date must be a valid date")
                        .min(yup.ref('qualifications.Bachelors Degree.startDate'), "End Date must be after Start Date"),
                    percentage: yup.number()
                        .required("Percentage is required field")
                        .typeError("Percentage must be a number")
                        .min(0, "Percentage cannot be less than 0")
                        .max(100, "Percentage cannot exceed 100"),
                    specialization: yup.string()
                }),
                "Masters Degree": yup.object({
                    instituteName: yup.string()
                        .min(2, "Institute Name must be at least 2 characters"),
                    startDate: yup.date()
                        .typeError("Start Date must be a valid date")
                        .nullable(),
                    endDate: yup.date()
                        .typeError("End Date must be a valid date")
                        .nullable(),
                    percentage: yup.number()
                        .typeError("Percentage must be a number")
                        .min(0, "Percentage cannot be less than 0")
                        .max(100, "Percentage cannot exceed 100")
                        .nullable(),
                    specialization: yup.string()
                })
            }),
            skills: yup.array()
                .of(yup.string())
                .min(3, "At least 3 skills are required")
                .max(10, "Maximum 10 skills allowed")
                .required("Skills field is required"),
            experienceLevel: yup.string()
                .required("Experience Level is required field"),
            experience: yup.string()
                .required("Years of Experience is required field")
                .typeError("Years of Experience must be a valid number"),
            portfolio: yup.string()
                .url("Portfolio URL must be a valid URL")
                .nullable(),
            githubUrl: yup.string()
                .required("Github URL is required field")
                .url("Github URL must be a valid URL"),
            password: yup
                .string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters long')
                .matches(/[0-9]/, 'Password requires a number')
                .matches(/[a-z]/, 'Password requires a lowercase letter')
                .matches(/[A-Z]/, 'Password requires an uppercase letter')
                .matches(/[^a-zA-Z0-9]/, 'Password requires a special character'), 

            confirmPassword: yup
                .string()
                .required('Confirm password is required')
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
            twoFactorAuthorization: yup.boolean()
                .oneOf([true], 'You must agree to terms and conditions to proceed'),
        })

    const methods = useForm({
        resolver: yupResolver(schema),
        mode: "onTouched",
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
                "SSC": { qualification: "SSC", instituteName: "", startDate: null, endDate: null, percentage: 0, specialization: "" },
                "HSC": { qualification: "HSC", instituteName: "", startDate: null, endDate: null, percentage: 0, specialization: "" },
                "Bachelors Degree": { qualification: "Bachelor's Degree", instituteName: "", startDate: null, endDate: null, percentage: 0, specialization: "" },
                "Masters Degree": { qualification: "Master's Degree", instituteName: "", startDate: null, endDate: null, percentage: 0, specialization: "" },
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