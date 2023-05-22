import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SectionOne from './layout/SectionOne';
import SectionTwo from './layout/SectionTwo';

const Home = (): JSX.Element => {
    return <>
        <Container sx={{ py: 8 }} maxWidth="lg">
            <SectionOne />
            <SectionTwo />
            <CssBaseline />
        </Container>
    </>;
};

export default Home;