import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";

const ForgotPassword = (): JSX.Element => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const formInput = {
                email: formData.get('email')
            }
            const { data } = await axios.post('http://localhost:5000/api/users/forgotpassword', formInput);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return <>
        <Container maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }} >
                <Typography>
                    Forgot your password?
                </Typography>
                <Typography>
                    Enter your email and click submit
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                >
                </TextField>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
            </Box>
        </Container>
    </>;
}

export default ForgotPassword;