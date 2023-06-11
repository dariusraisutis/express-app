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
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ReviewForm from "./ReviewForm";
import { IProduct } from "./ProductContainer";
import axios from "axios";

export interface IDeliveryDetails {
    userId: string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    region: string;
    zipCode: string;
    country: string;
}

export interface IPaymentDetails {
    nameOnCard: string;
    cardNumber: number;
    expiryDate: Date;
    cvv: number;
}

export interface ICheckoutDetails {
    products: IOrderProduct[];
    deliveryDetails: IDeliveryDetails;
    paymentDetails: IPaymentDetails;

}

interface IOrderProduct {
    _id: string;
    quantity: number;
}

interface IOrderDeliveryAddress {
    street: string;
    city: string;
    region: string;
    country: string;
    zipCode: string;
}

export interface IOrderDto {
    user: string;
    items: IOrderProduct[];
    deliveryAddress: IOrderDeliveryAddress;
    status: string;
    isDelivered: boolean;
    totalPrice: number;
    createdAt: Date; 
}

const Checkout = (): JSX.Element => {
    const defaultState: ICheckoutDetails = {
        products: [
            {
                _id: '',
                quantity: 0
            }
        ],
        deliveryDetails: {
            userId: '',
            firstName: '',
            lastName: '',
            street: '',
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
    // const { products, totalPrice } = state;
    const [activeStep, setActiveStep] = useState(0);
    const [shippingDetails, setShippingDetails] = useState<IDeliveryDetails>(
        {
            userId: '',
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            region: '',
            zipCode: '',
            country: ''
        }
    );
    const [paymentDetails, setPaymentDetails] = useState<IPaymentDetails>(
        {
            nameOnCard: '',
            cardNumber: 0,
            expiryDate: new Date(),
            cvv: 0
        }
    );
    const [products, setProducts] = useState<IOrderProduct[]>([]);


    const [checkoutDetails, setCheckoutDetails] = useState<ICheckoutDetails>(defaultState);
    const steps = ['Shipping address', 'Payment details', 'Review your order'];

    useEffect(() => {
        const { products } = state;
        setProducts(products);
    }, [setProducts]);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    const addressFormLiftUpStateCallBack = (inputDeliveryDetails: IDeliveryDetails) => {
        setShippingDetails(inputDeliveryDetails);
    }

    const paymentFormLiftUpStateCallBack = (inputPaymentDetails: IPaymentDetails) => {
        setPaymentDetails(inputPaymentDetails);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // TODO: add services for products, users, orders..
            const { city, region, street: addressline, country, zipCode } = shippingDetails;
            const deliveryAddress: IOrderDeliveryAddress = {
                city,
                region,
                zipCode,
                country,
                street: addressline
            };

            const orderDto: IOrderDto = {
                user: '64609e781e11ea6d10e961f2',
                items: products,
                deliveryAddress,
                status: 'Pending',
                isDelivered: false,
                createdAt: new Date(),
                totalPrice: 25
            };
            console.log(orderDto)
            const result = await axios.post('http://localhost:5000/api/orders/create', orderDto);
            console.log(result);
            
        } catch (error) {
            throw new Error(`Error when placing order. ${error}`);
        }
    }

    let isLastStep = activeStep === steps.length - 1;
    return <>
        <Container component="form" maxWidth="sm" sx={{ mb: 4 }} onSubmit={handleSubmit}>
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
                        {
                            activeStep === 0
                             ? <AddressForm liftUpStateCallBack={addressFormLiftUpStateCallBack}/>
                             : activeStep === 1
                                ? <PaymentForm liftUpStateCallBack={paymentFormLiftUpStateCallBack} />
                                : <ReviewForm {...checkoutDetails} />
                        }
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
                                type={isLastStep ? 'submit': 'button'}
                            >
                                {isLastStep ? 'Place order' : 'Next'}
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    </>;
}

export default Checkout;