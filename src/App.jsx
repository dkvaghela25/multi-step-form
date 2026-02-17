import { useState } from "react";
import MultiStepForm from "./components/MultiStepForm";
import '@fontsource-variable/merriweather';
import { Box, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import ThemeSwitch from "./components/ThemeSwitch";

const App = () => {

  const [lightMode, setLightMode] = useState(true)

  const darkTheme = createTheme({
    typography: {
      fontFamily: 'Merriweather Variable, serif',
    },
    palette: {
      mode: lightMode ? 'light' : 'dark',
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ThemeSwitch
          setLightMode={setLightMode}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '50px',
            alignItems: 'center',
            minHeight: '100vh'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Stepper Form using MUI and react hook form
          </Typography>
          <MultiStepForm />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;