import { Box, Card, CardContent, Typography, Button, Stack } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
const ThankYouPage = () => {

    return (
        <Box
            sx={{
                // minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Box
                sx={{
                    maxWidth: 500,
                    width: "100%",
                    textAlign: "center"
                }}
            >
                <CardContent>
                    <CheckCircleRoundedIcon
                        sx={{ fontSize: 80, color: "success.main", mb: 2 }}
                    />

                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Thank You!
                    </Typography>

                    <Typography variant="body1" color="text.secondary" mb={3}>
                        Your form has been successfully submitted.
                        We appreciate your time and effort.
                    </Typography>

                </CardContent>
            </Box>
        </Box>
    );
};

export default ThankYouPage;
