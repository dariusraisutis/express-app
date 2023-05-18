import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

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
    return <>
        <Container sx={{ py: 8 }} maxWidth="md">
            <CssBaseline />
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