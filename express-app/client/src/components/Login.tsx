import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import  Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
const Login = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { currentTarget: { value } } = e;
        e.preventDefault();
        setEmail(value);
    }

    const handleUserPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { currentTarget: { value } } = e;
        e.preventDefault();
        setPassword(value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleForgotPassword = (): void => {

    }
    
    return <>
        <Container maxWidth="xs">
            <Typography variant="h3" gutterBottom align="center">
                Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleUserEmailChange}
                    variant="outlined"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handleUserPasswordChange}
                    variant="outlined"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
                <Link component="button" variant="body2" onClick={handleForgotPassword}>
                    Forgot your password?
                </Link>
            </Box>
        </Container>
    </>;
}

export default Login;