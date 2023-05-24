import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export interface IProduct {
    _id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
    brand: string;
    inStock: boolean;
    stock: number;
    discount: number;
}

interface IProductContainerProps {
    products: IProduct[]
}

const useStyles = {
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        pt: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
    button: {
        marginTop: 2,
    },
}

const ProductContainer = (): JSX.Element => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const { card, cardMedia, cardContent, button } = useStyles;

    useEffect(() => {
        const getProducts = async(): Promise<void> => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products/getall');
                const result: IProduct[] = data.map((current: any) => {
                    return current;
                });
                setProducts(result);
            } catch (error) {
                console.error(error);
               throw new Error('Error');
            }
        }
        getProducts();
    }, [setProducts]);

    return <>
        <Grid container spacing={4} sx={{ marginTop: 8 }}>
            {
                products.map(({ _id, title, description, image, price, discount }: IProduct, index: Number) => (
                    <Grid item xs={12} sm={6} md={4} key={index.toString()}>
                        <RouterLink to={`/products/${_id}`} > 
                            <CardActionArea>
                                <Card sx={card}>
                                    <CardMedia
                                        component="img"
                                        sx={cardMedia}
                                        image={`/images/${image}`}
                                        title={title} >
                                    </CardMedia>
                                    <CardContent sx={cardContent}>
                                        <Typography variant="h5" component="h2">
                                            {title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {description}
                                        </Typography>
                                        <Typography>
                                            {`$ ${price}`}
                                        </Typography>
                                        <Typography>
                                            Discount: {discount}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </RouterLink>
                    </Grid>
                ))
            }
        </Grid>
        <Button variant="contained" color="primary" sx={button}>
            Get Started
        </Button>
    </>;
}

export default ProductContainer;