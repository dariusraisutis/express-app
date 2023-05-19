import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const useStyles = {
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        pt: '56.25%',
    },
    cardContent: {
        flexGrow: 1
    },
    button: {
        marginTop: 2,
    },
}

const Home = (): JSX.Element => {
    const { card, cardMedia, cardContent, button } = useStyles;
    const handleShopNowClick = () => {
        // Scroll to the product grid section
       // document.getElementById('productGrid').scrollIntoView({ behavior: 'smooth' });
      };
    return <>
        <Container sx={{ py: 8 }} maxWidth="md">
            <CssBaseline />
            <Box>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    FLexing Tees
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ marginBottom: 2}}>
                    Discover the latest trends and exclusive collections. Find the perfect t-shirt that reflects your style and
                    elevates your wardrobe. Start your fashion journey with us today!
                </Typography>
                <Box sx={{ marginBottom: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleShopNowClick}>
                        Shop Now
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={card}>
                        <CardMedia
                            sx={cardMedia}
                            image="/images/retro.jpg"
                            title="Product 1"
                        />
                        <CardContent sx={cardContent}>
                            <Typography variant="h5" component="h2">
                                Product 1
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Description of Product 1
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={card}>
                        <CardMedia
                            sx={cardMedia}
                            image="/images/cartoon.jpg"
                            title="Product 2"
                        />
                        <CardContent sx={cardContent}>
                            <Typography variant="h5" component="h2">
                                Product 2
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Description of Product 2
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={card}>
                        <CardMedia
                            sx={cardMedia}
                            image="/images/plane.png"
                            title="Product 3"
                        />
                        <CardContent sx={cardContent}>
                            <Typography variant="h5" component="h2">
                                Product 3
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Description of Product 3
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" sx={button}>
                Get Started
            </Button>
        </Container>
    </>;
};

export default Home;