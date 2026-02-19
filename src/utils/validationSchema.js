import * as yup from 'yup';

export const schema = yup
    .object({
        basicInfo: yup.object({
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
                .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Invalid phone number format')
                .required('Phone number is required'),
            dob: yup.date()
                .nonNullable("Date Of Birth is required")
                .required("Date Of Birth is required")
                .typeError("Date Of Birth must be a valid date")
                .max(new Date(), "Date Of Birth cannot be in the future"),
        }),
        education: yup.object({
            "qualifications": yup.array()
                .of(yup.string())
                .required("SSC Qualification is required")
                .test(
                    "ssc-required",
                    "SSC qualification is required",
                    (value) => value?.includes("SSC")
                )
                .test(
                    "hsc-required",
                    "HSC qualification is required",
                    (value) => value?.includes("HSC")
                )
                .test(
                    "bachelors-degree-required",
                    "Bachelor's Degree qualification is required",
                    (value) => value?.includes("Bachelors Degree")
                ),

            "SSC": yup.object().when("qualifications", {
                is: (qualifications) => qualifications?.includes("SSC"),
                then: (schema) =>
                    schema.shape({
                        instituteName: yup.string()
                            .required("Institute Name is required field")
                            .min(2, "Institute Name must be at least 2 characters"),

                        startDate: yup.date()
                            .nullable()
                            .required("Start Date is required")
                            .typeError("Start Date must be a valid date")
                            .max(new Date(), "Start Date cannot be in the future"),
                            
                            endDate: yup.date()
                            .nullable()
                            .required("End Date is required")
                            .typeError("End Date must be a valid date")
                            .max(new Date(), "SSC must be completed"),

                        percentage: yup.number()
                            .required("Percentage is required field")
                            .typeError("Percentage must be a number")
                            .min(0)
                            .max(100),
                    }),
            }),
            "HSC": yup.object().when("qualifications", {
                is: (qualifications) => qualifications?.includes("HSC"),
                then: (schema) =>
                    schema.shape({
                        instituteName: yup.string()
                            .required("Institute Name is required field")
                            .min(2, "Institute Name must be at least 2 characters"),

                        startDate: yup.date()
                            .nullable()
                            .required("Start Date is required")
                            .typeError("Start Date must be a valid date")
                            .max(new Date(), "Start Date cannot be in the future"),

                        endDate: yup.date()
                            .nullable()
                            .required("End Date is required")
                            .typeError("End Date must be a valid date")
                            .max(new Date(), "HSC must be completed"),

                        percentage: yup.number()
                            .required("Percentage is required field")
                            .typeError("Percentage must be a number")
                            .min(0)
                            .max(100),
                    }),
            }),
            "Bachelors Degree": yup.object().when("qualifications", {
                is: (qualifications) => qualifications?.includes("Bachelors Degree"),
                then: (schema) =>
                    schema.shape({
                        instituteName: yup.string()
                            .required("Institute Name is required field")
                            .min(2, "Institute Name must be at least 2 characters"),

                        startDate: yup.date()
                            .nullable()
                            .required("Start Date is required")
                            .typeError("Start Date must be a valid date")
                            .max(new Date(), "Start Date cannot be in the future"),

                        endDate: yup.date()
                            .nullable()
                            .required("End Date is required")
                            .typeError("End Date must be a valid date"),

                        percentage: yup.number()
                            .required("Percentage is required field")
                            .typeError("Percentage must be a number")
                            .min(0)
                            .max(100),

                        specialization: yup.string()
                            .required("specialization is required field")
                    }),
            }),
            "Masters Degree": yup.object().when("qualifications", {
                is: (qualifications) => qualifications?.includes("Masters Degree"),
                then: (schema) =>
                    schema.shape({
                        instituteName: yup.string()
                            .required("Institute Name is required field")
                            .min(2, "Institute Name must be at least 2 characters"),

                        startDate: yup.date()
                            .nullable()
                            .required("Start Date is required")
                            .typeError("Start Date must be a valid date")
                            .max(new Date(), "Start Date cannot be in the future"),

                        endDate: yup.date()
                            .nullable()
                            .required("End Date is required")
                            .typeError("End Date must be a valid date"),

                        percentage: yup.number()
                            .required("Percentage is required field")
                            .typeError("Percentage must be a number")
                            .min(0)
                            .max(100),

                        specialization: yup.string()
                            .required("specialization is required field")
                    }),
            }),
        }),
        technicalExpertise: yup.object({
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
        }),
        security: yup.object({
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
                .oneOf([yup.ref('password')], 'Passwords must match'),
        }),
        review: yup.object({
            agreement: yup.boolean()
                .oneOf([true], 'You must agree to terms and conditions to proceed'),
        })

    })
