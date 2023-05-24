import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const getContent = (step: number): JSX.Element => {
    switch(step){
        case 0: return <></>;
        case 1: return <></>;
        case 2: return <></>;
        default: throw new Error('Unexpected checkout step');
    }
}

const Checkout = (): JSX.Element => {

    const { state } = useLocation();
    const { productId, quantity, total } = state;
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Shipping address', 'Payment details', 'Review your order'];
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep -1);
    }
    return <>
        <Container maxWidth="md">
            <Paper variant="outlined">
                <Typography component="h1" variant="h4" align="center">
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {
                        steps.map((current) => (
                            <Step key={current}>
                                <StepLabel>
                                    {current}
                                </StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
                {activeStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #2001539. We have emailed your order
                            confirmation, and will send you an update when your order has
                            shipped.
                        </Typography>
                    </>
                ) : (
                    <>
                        {getContent(activeStep)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    Back
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    </>;
}

export default Checkout;