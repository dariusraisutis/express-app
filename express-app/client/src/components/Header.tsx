import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Header = (): JSX.Element => {
    return <>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
        </Box>
        <AppBar component="nav">
            <Toolbar>
                <Typography variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { sm: 'block' } }}>
                    Flexing Tees
                </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'start' }}>
                    <Button variant="text" color="inherit" href="/home" size="large">
                        Home
                    </Button>
                    <Button variant="text" color="inherit" href="/proucts" size="large">
                        Products
                    </Button>
                    <Button variant="text" color="inherit" href="/contacts" size="large">
                        Contacts
                    </Button>
                    <Button variant="text" color="inherit" href="/login" size="large">
                        Login
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    </>;
}

export default Header;