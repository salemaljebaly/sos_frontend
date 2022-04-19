import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import Strings from '../utils/Strings';
import Copyright from './copyrights';
import { red } from '@mui/material/colors';
import AppLogo from './appLogo';


export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>

      <Container component="main" maxWidth="xs" >

        <CssBaseline />
        <Box
        
          sx={{
            backgroundColor: '#f3f2ef',
            padding: 2,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderTop: `4px solid ${red[600]}` ,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <AppLogo imageSize={80} />
          <Typography component="h1" variant="h6">
            
          {Strings.signInButtonText}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={Strings.userName}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={Strings.password}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={Strings.rememberMe}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {Strings.signInButtonText}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {Strings.forgetPassword}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {Strings.dontHaveAccount}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}