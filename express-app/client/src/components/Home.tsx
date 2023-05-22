import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SectionOne from './layout/SectionOne';
import SectionTwo from './layout/SectionTwo';

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
        <Container sx={{ py: 8 }} maxWidth="lg">
            <SectionOne />
            <SectionTwo />
            <CssBaseline />
        </Container>
    </>;
};

export default Home;