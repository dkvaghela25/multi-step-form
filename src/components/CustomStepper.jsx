import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';

import InfoIcon from '@mui/icons-material/Info';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PreviewIcon from '@mui/icons-material/Preview';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const ColorConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(95deg, rgb(56,189,248) 0%, rgb(37,99,235) 50%, rgb(30,58,138) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(95deg, rgb(56,189,248) 0%, rgb(37,99,235) 50%, rgb(30,58,138) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorStepIconRoot = styled('div')(({ theme }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          'linear-gradient(136deg, rgb(34,211,238) 0%, rgb(59,130,246) 50%, rgb(67,56,202) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          'linear-gradient(136deg, rgb(34,211,238) 0%, rgb(59,130,246) 50%, rgb(67,56,202) 100%)',
      },
    },
  ],
}));

function ColorStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <InfoIcon />,
    2: <SchoolIcon />,
    3: <LightbulbIcon />,
    4: <SecurityIcon />,
    5: <PreviewIcon />,
  };

  return (
    <ColorStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorStepIconRoot>
  );
}

ColorStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};


export default function CustomStepper({ steps, step, setStep }) {
  return (
    <Stepper
      sx={{
        width: '50vw'
      }}
      alternativeLabel activeStep={step} connector={<ColorConnector />}
    >
      {steps.map((label) => (
        <Step  key={label} >
          <StepLabel sx={{cursor: "pointer"}} onClick={() => setStep(steps.indexOf(label))} StepIconComponent={ColorStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
