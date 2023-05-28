import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { IDeliveryDetails } from "./Checkout";
import { useState } from "react";

// interface IDeliveryDetails {
//     firstName: string;
//     secondName: string;
//     addressline: string;
//     city: string;
//     region: string;
//     zipCode: string;
//     country: string;
// }

interface IAddressFormProps {
    liftUpStateCallBack: (deliveryDetails: IDeliveryDetails) => void;
}

const AddressForm = ({ liftUpStateCallBack }: IAddressFormProps): JSX.Element => {
    const [formData, setFormData] = useState<IDeliveryDetails>({
        firstName: '',
        secondName: '',
        addressline: '',
        city: '',
        region: '',
        zipCode: '',
        country: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>  {
        e.preventDefault();
        const { currentTarget: {  name, value} } = e;
        setFormData({...formData, [name]: value});
        liftUpStateCallBack(formData);
    }

    return <>
        <Typography variant="h6" gutterBottom>
            Shipping address
        </Typography>
        <Grid container component={'form'} spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    onChange={handleChange}>
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="address1"
                    name="addressLine"
                    label="Address line 1"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="standard"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="standard"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="region"
                    name="region"
                    label="State/Province/Region"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="zipCode"
                    name="zipCode"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="standard"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                    label="Use this address for payment details"
                />
            </Grid>
        </Grid>
    </>;
}

export default AddressForm;