import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IPaymentDetails } from "./Checkout";
import { useState } from "react";

interface IPaymentFormProps {
    liftUpStateCallBack: (paymentDetails: IPaymentDetails) => void;
}

const PaymentForm = ({ liftUpStateCallBack }: IPaymentFormProps): JSX.Element => {
    const [formData, setFormData] = useState<IPaymentDetails>({
        cardNumber: 0,
        nameOnCard: '',
        expiryDate: new Date(),
        cvv: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>  {
        e.preventDefault();
        const { currentTarget: {  name, value} } = e;
        setFormData({...formData, [name]: value});
        liftUpStateCallBack(formData);
    }

    return <>
        <Typography variant="h6" gutterBottom>
            Payment method
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    id="nameOnCard"
                    name="nameOnCard"
                    label="Name on card"
                    fullWidth
                    autoComplete="cc-name"
                    variant="standard"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    id="cardNumber"
                    name="cardNumber"
                    label="Card number"
                    fullWidth
                    autoComplete="cc-number"
                    variant="standard"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    id="expiryDate"
                    label="Expiry date"
                    fullWidth
                    autoComplete="cc-exp"
                    variant="standard"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    id="cvv"
                    label="CVV"
                    helperText="Last three digits on signature strip"
                    fullWidth
                    autoComplete="cc-csc"
                    variant="standard"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                    label="Remember credit card details for next time"
                />
            </Grid>
        </Grid>
    </>;
}

export default PaymentForm;