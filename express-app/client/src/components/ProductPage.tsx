import React, { useEffect, useState } from 'react';
import axios from "axios";
import { IProduct } from './ProductContainer';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';

interface ICheckoutProps {
    productId: string;
    quantity: number;
    total: number;
}

const ProductDetails = ({ _id, title, description, category, price, brand, inStock, stock, discount }: IProduct): JSX.Element => {
    const [quantity, setQuantity] = useState(1);
    const handleQuantityOnChange = (e: SelectChangeEvent<number>): void => {
        e.preventDefault();
        const { target: { value } } = e;
        setQuantity(Number(value));
    }

    const numberOfItemsToPurchaseOption = [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 },
        { name: '6', value: 6 },
        { name: '7', value: 7 },
        { name: '8', value: 8 },
        { name: '9', value: 9 },
        { name: '10', value: 10 }
    ];

    let totalSum = price * quantity;

    return <>
        <Grid container direction="column" sx={{ height: '100%' }}>
            <Box ml={4}>
                <Typography variant="h6" m={2}>
                    {category}
                </Typography>
                <Divider />
                <Typography variant="h4" m={2}>
                    {title}
                </Typography>
                <Typography variant="subtitle1" m={2}>
                    {description}
                </Typography>
                <Typography variant="subtitle2" m={2}>
                    {brand}
                </Typography>
                <Typography m={2}>
                    Price: ${price}
                </Typography>
                <Typography m={2}>
                    In stock: {stock ? 'Yes' : 'No'}
                </Typography>
                <Typography m={2}>
                    Discount: {discount}
                </Typography>
                <FormControl sx={{ m: '2px', minWidth: 100 }}>
                    <InputLabel >Quantity</InputLabel>
                    <Select value={quantity} label="Quantity" onChange={handleQuantityOnChange}>
                        {numberOfItemsToPurchaseOption.map(({ name, value }) => (
                            <MenuItem value={value}>{name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Divider />
                <Typography m={2}>
                    Total Price: ${totalSum}
                </Typography>
            </Box>
            <RouterLink to='/checkout' state={{ productId: _id, quantity, total: totalSum }} >
                <Button variant="contained" color="primary" sx={{ marginTop: 'auto' }} disabled={!inStock}>
                    Purchase
                </Button>
            </RouterLink>
        </Grid>
    </>;
}

interface IProductImageProps {
    image: string;
}

const ProductImage = ({ image }: IProductImageProps): JSX.Element => {
    return <>
        <img src={`/images/${image}`} width='100%' />
    </>;
}

const ProductPage = (): JSX.Element => {
    const { id } = useParams();
    const [product, setProduct] = React.useState<IProduct>(
        {
            _id: '',
            title: '',
            description: '',
            image: '',
            category: '',
            price: 0,
            brand: '',
            inStock: false,
            stock: 0,
            discount: 0
        });
    useEffect(() => {
        const getProduct = async (): Promise<void> => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/getbyid/${id}`);
                const { title, description, image, price, category, brand, inStock, stock, discount } = data;
                setProduct({ title, description, image, price, category, brand, inStock, stock, discount } as IProduct);
            } catch (error) {
                console.log(error);
                throw new Error(`Error getting product by id. ${error}`);
            }
        }
        getProduct();
    }, [setProduct]);

    return <>
        <CssBaseline />
        <Grid container maxWidth="md" sx={{ mt: '100px', ml: 'auto', mr: 'auto' }}>
            <Grid item xs={12} sm={6} >
                <ProductImage {...product} />
            </Grid>
            <Grid item xs={12} sm={6} >
                <ProductDetails {...product} />
            </Grid>
        </Grid>
    </>;
}

export default ProductPage;