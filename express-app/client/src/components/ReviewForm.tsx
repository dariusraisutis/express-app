import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import { ICheckoutDetails } from "./Checkout";

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const ReviewForm = ({ products, deliveryDetails, paymentDetails }: ICheckoutDetails): JSX.Element => {
  const { nameOnCard, cardNumber, expiryDate } = paymentDetails;
  const { firstName, lastName } = deliveryDetails;
  // const payments = [
  //   { name: 'Card type', detail: 'Visa' },
  //   { name: 'Card holder', detail: `${nameOnCard}` },
  //   { name: 'Card number', detail: `${cardNumber}` },
  //   { name: 'Expiry date', detail: `${expiryDate.getMonth() + 1}/${expiryDate.getFullYear()}` }
  // ];

  const addresses = Object.entries(deliveryDetails)
    .map(([key, value]) => { return value; })
    .filter((current) => { if (String(current).length) return String(current); });

  return <>
    <Typography variant="h6" gutterBottom>
      Order summary
    </Typography>
    <List disablePadding>
      {products.map(({ title, description, price }) => (
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