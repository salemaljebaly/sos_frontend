import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {  ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import Strings from "../../utils/Strings";
import Copyright from '../../components/copyrights';
import { red } from "@mui/material/colors";
import AppLogo from "../../components/appLogo";
import { login } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/common/Notification";
import { Severtity } from "../../utils/enum/Severity";

export default function SignIn() {
  // ------------------------------------------------------------------------------- //
  // take state from props 
  const [ notify, setNotify ] = React.useState({
    isOpen : false,
    message : '', 
    type : ''
  })
  // ----------------------------------------------------------------------------------- //
  // dispatch to get and executer function from slices
  const dispatch = useDispatch();
  // ----------------------------------------------------------------------------------- //
  // use to navigate to another components
  const navigate = useNavigate();
  // ----------------------------------------------------------------------------------- //
  // desctruct memebers from user state [ userSlice]
  const { user, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.auth
  );
  // ----------------------------------------------------------------------------------- //
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if ((
        data.get("email")!.toString() == "" ||
        data.get("password")!.toString() == ""
      )
    ) {
      
      setNotify({
        isOpen : true,
        message : Strings.youMustfillData, 
        type : Severtity.WARNING
      })

    } else {

      dispatch(login({
        username: data.get("email")!.toString(),
        password: data.get("password")!.toString(),
      })
    );
    if(isSucces) navigate("/");
    
    if (isError) {
      setNotify({
        isOpen : true,
        message :Strings.unauthorized, 
        type : Severtity.WARNING
      })
      }
    }
    // check if user redux state
  };

  //TODO fix login when navigate to users
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        {console.log(process.env.REACT_APP_GOOGLE_API_KEY)}
          <CssBaseline />
          <Box
            sx={{
              backgroundColor: "#f3f2ef",
              padding: 2,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderTop: `4px solid ${red[600]}`,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <AppLogo imageSize={80} />
            <Typography component="h1" variant="h6">
              {Strings.signInButtonText}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={Strings.rememberMe}
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {Strings.signInButtonText}
              </Button>
              {/* <Grid container>
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
              </Grid> */}
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
