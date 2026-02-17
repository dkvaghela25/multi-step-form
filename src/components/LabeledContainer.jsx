import { Box, Typography } from "@mui/material";

const LabeledContainer = ({label ,children}) => {
    return (
        <>
            <Box
                sx={{
                    mt: 3,
                    position: "relative",
                    border: "1px solid #999",
                    borderRadius: 2,
                    p: 3,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px"
                }}
            >
                <Typography
                    sx={{
                        position: "absolute",
                        top: -10,
                        left: 20,
                        backgroundColor: "white",
                        px: 1,
                        fontSize: 14,
                    }}
                >
                    {label}
                </Typography>
                {children}
            </Box>
        </>
    );
};

export default LabeledContainer;