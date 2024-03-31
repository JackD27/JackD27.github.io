import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useState } from 'react';
import { Container, Grid, Stack} from '@mui/material';
import { projects }from '../../constants';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GitHubIcon from '@mui/icons-material/GitHub';
import ReactGA from 'react-ga4';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const trackingId = "G-FDMQ8XNGRM";
ReactGA.initialize(trackingId);


function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = projects.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  function handleClick(link) {
    ReactGA.event({
      category: 'User',
      action: 'Clicked Link in Post',
      label: link.toString()
    })

    
    window.location.href = link
  }

  return (
    <Box sx={{backgroundColor: '#fafafa', width: '100%', pt: { xs: 7}, pb: { xs: 7}, borderBottom: '1px solid', borderColor: 'divider'}}>
    <Container>
    <Typography variant="h2" borderBottom='2px solid' borderColor='rgb(85, 166, 246)' component="h2" margin={2} align='center' gutterBottom>Projects</Typography>
    <Box sx={{mb: 3}}>
    <Paper elevation={4}>
    <Box sx={{ p: 2, flexGrow: 1}}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={15000}
      >
        {projects.map((step, index) => (
          <div key={step.title}>
            {Math.abs(activeStep - index) <= 2 ? (
            <Grid container spacing={3} >
            <Grid item xs={12} md={8}>
              <Box
                component="img"
                sx={{
                  height: 450,
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.frontPic}
                alt={step.title}
              />
                </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant='h5'>{step.title}</Typography>
                <Typography variant='body1'>{step.headline}</Typography>
                <Typography variant='h5'>Technology</Typography>
                {step.technology.map((tech, i) => (
                    <Typography key={i} variant='body1'>- {tech}</Typography>
                ))}
                <Typography variant='h5'>Links</Typography>
                <Stack direction="row" spacing={2}>
                    {step.websiteLink ? <IconButton size='small' onClick={() => handleClick(step.websiteLink)}><LanguageIcon/></IconButton> : null}
                    {step.gameLink ? <IconButton size='small' onClick={() => handleClick(step.gameLink)}><SportsEsportsIcon/></IconButton> : null}
                    <IconButton size='small' onClick={() => handleClick(step.githubUrl)}><GitHubIcon/></IconButton>
                </Stack>
                </Box>
            </Grid>
            </Grid>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{ ml: 3}}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}  sx={{ mr: 3}}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      </Box>
    </Box>
    </Paper>
    </Box>
    </Container>
    </Box>
  );
}

export default SwipeableTextMobileStepper;