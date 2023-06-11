import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { ICheckoutDetails } from "./Checkout";
import axios from "axios";
import { IProduct } from "./ProductContainer";

const ReviewForm = ({ products, deliveryDetails, paymentDetails }: ICheckoutDetails): JSX.Element => {
  const { nameOnCard, cardNumber, expiryDate } = paymentDetails;
  const { firstName, lastName } = deliveryDetails;
  const [checkoutProducts, setCheckoutProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const getProducts = async (): Promise<void> => {
      const productPromises = products.map(({ _id }) => {
        return axios.get(`http://localhost:5000/api/products/getbyid/${_id}`);
      });
      
      const productDetails = await Promise.all(productPromises);
      const test = productDetails.map(({ data }) => {
        const { _id, title, description, image, price, category, brand, inStock, stock, discount } = data;
        return { _id, title, description, image, price, category, brand, inStock, stock, discount };
      });

      setCheckoutProducts(test);

    }
  });
  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: `${nameOnCard}` },
    { name: 'Card number', detail: `${cardNumber}` },
    { name: 'Expiry date', detail: `${expiryDate.getMonth() + 1}/${expiryDate.getFullYear()}` }
  ];

  const addresses = Object.entries(deliveryDetails)
    .map(([key, value]) => { return value; })
    .filter((current) => { if (String(current).length) return String(current); });

  return <>
    <Typography variant="h6" gutterBottom>
      Order summary
    </Typography>
    <List disablePadding>
      {checkoutProducts.map(({ title, description, price }) => (
        <ListItem key={title} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={title} secondary={description} />
          <Typography variant="body2">{price}</Typography>
        </ListItem>
      ))}
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {25}
        </Typography>
      </ListItem>
    </List>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Shipping
        </Typography>
        <Typography gutterBottom>{firstName} {lastName}</Typography>
        <Typography gutterBottom>{addresses.join(', ')}</Typography>
      </Grid>
      <Grid item container direction="column" xs={12} sm={6}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Payment details
        </Typography>
        <Grid container>
          {payments.map((payment) => (
            <React.Fragment key={payment.name}>
              <Grid item xs={6}>
                <Typography gutterBottom>{payment.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{payment.detail}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </>;
}

export default ReviewForm;