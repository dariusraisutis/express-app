import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ReviewForm from "./ReviewForm";
import { IProduct } from "./ProductContainer";



const getContent = (step: number): JSX.Element => {
    switch (step) {
        case 0: return <AddressForm />;
        case 1: return <PaymentForm />;
        case 2: return <ReviewForm />;
        default: throw new Error('Unexpected checkout step');
    }
}

interface IDeliveryDetails {
    firstName: string;
    secondName: string;
    addressline: string;
    city: string;
    region: string;
    zipCode: string;
    country: string;
}

interface IPaymentDetails {
    nameOnCard: string;
    cardNumber: number;
    expiryDate: Date;
    cvv: number;
}

interface ICheckoutDetails {
    products: IProduct[];
    deliveryDetails: IDeliveryDetails;
    paymentDetails: IPaymentDetails;

}

const Checkout = (): JSX.Element => {
    const props: ICheckoutDetails = {
        products: [
            {
                _id: '',
                title: '',
                description: '',
                category: '',
                price: 0,
                brand: '',
                image: '',
                inStock: false,
                stock: 0,
                discount: 0
            }
        ],
        deliveryDetails: {
            firstName: '',
            secondName: '',
            addressline: '',
            city: '',
            region: '',
            zipCode: '',
            country: '',
        },
        paymentDetails: {
            nameOnCard: '',
            cardNumber: 0,
            expiryDate: new Date(),
            cvv: 0
        }
    };

    const { state } = useLocation();
    const { productId, quantity, total } = state;
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutDetails, setCheckoutDetails] = useState<ICheckoutDetails>(props);
    const steps = ['Shipping address', 'Payment details', 'Review your order'];
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }
    return <>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
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