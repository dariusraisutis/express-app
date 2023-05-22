import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const SectionOne = (): JSX.Element => {
    const handleShopNowClick = () => {

    }

    return <>
        <Grid container component="main" sx={{ marginTop: 8}}>
        <CssBaseline />
            <Grid item xs={12} sm={8} md={5} >
                <Box sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ marginBottom: 2 }}>
                        Discover the latest trends and exclusive collections. Find the perfect t-shirt that reflects your style and
                        elevates your wardrobe. Start your fashion journey with us today!
                    </Typography>
                    <Box sx={{ marginBottom: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleShopNowClick}>
                            Shop Now
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={false} sm={4} md={6} sx={{
                background: 'url(/images/elephantrm.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }} />
        </Grid>
    </>;
}

export default SectionOne;