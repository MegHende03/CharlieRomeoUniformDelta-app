import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled, useColorScheme } from '@mui/material/styles';
import ForgotPassword from './components/ForgotPassword';
import AppTheme from './shared-theme/AppTheme';
import ColorModeSelect from './shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon } from './components/CustomIcons';
import logo from '../../assets/noteLogo.svg';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',

  backgroundColor: 'hsl(0, 9%, 15%)',
  border: '1px solid #33cc9966',

  color: 'white',

  boxShadow: '0px 10px 30px rgba(0,0,0,0.5)',

  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(circle at top, hsl(0, 9%, 15%), hsl(0, 18%, 3%))',
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <div className=".mode-dark">
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" sx={{ justifyContent: 'space-between' }}>

          <div className = "logo-title">
            <img className="logo-img" src={logo} alt="Logo" />
              <a
                href="/"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                <h1>notekeeper</h1>
              </a>
          </div>

        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email"
                sx={{
                  color: '#33cc99',
                  }}
                >Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'warning'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',

                    '& fieldset': {
                      borderColor: '#33cc9966',
                    },

                    '&:hover fieldset': {
                      borderColor: '#33cc99',
                    },

                    '&.Mui-focused fieldset': {
                      borderColor: '#ce7a1a',
                      borderWidth: '2px',
                    },

                    '&.Mui-focused': {
                      boxShadow: '0 0 8px rgba(206, 122, 26, 0.5)',
                    },
                  },

                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.5)',
                    opacity: 1,
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password"
                sx={{
                  color: '#33cc99',
                }}
                >Password
                </FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'warning'}
                sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',

                  '& fieldset': {
                    borderColor: '#33cc9966',
                  },

                  '&:hover fieldset': {
                    borderColor: '#33cc99',
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: '#ce7a1a',
                    borderWidth: '2px',
                  },

                  '&.Mui-focused': {
                    boxShadow: '0 0 8px rgba(206, 122, 26, 0.5)',
                  },
                },

                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255,255,255,0.5)',
                  opacity: 1,
                },
              }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
                sx={{
                  backgroundColor: '#ce7a1a',
                  color: 'white',
                  fontWeight: 600,
                }}
            >
              Sign in
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider sx={{ color: 'rgba(255,255,255,0.5)' }}>
            or
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
              sx={{
                borderColor: '#33cc9966',
                color: 'white',

                '&:hover': {
                  borderColor: '#33cc99',
                  backgroundColor: 'rgba(51,204,153,0.08)',
                },
              }}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
              sx={{
              borderColor: '#33cc9966',
              color: 'white',

              '&:hover': {
                borderColor: '#33cc99',
                backgroundColor: 'rgba(51,204,153,0.08)',
              },
            }}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>

    </div>
  );
}
