import React, { FormEvent, useRef, useState } from 'react';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';

// MUI components
import {
  Avatar,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  Typography,
  Alert,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useTranslation } from 'react-i18next';
// Internal imports
import { login, selectUser } from 'store/userSlice';
import axiosInstance from '../components/axiosInstance';

import i18n from 'Locales/i18n';
// Styles
const useStyles = makeStyles((theme) => ({
  helperText: {
    position: 'relative',
    left: '-8px', // Adjust this value to move the helper text
  },
}));
function SignIn() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles();

  // Refs for the TextField components to manage focus
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //  // Function to handle keyboard navigation
  const handleKeyDown = (
    event: React.KeyboardEvent<any>,
    refUp: React.RefObject<HTMLInputElement> | null,
    refDown: React.RefObject<HTMLInputElement> | null
  ) => {
    if (event.key === 'ArrowDown' && refDown) {
      event.preventDefault();
      refDown.current?.focus();
    }
    if (event.key === 'ArrowUp' && refUp) {
      event.preventDefault();
      refUp.current?.focus();
    }
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
      setEmailError('Please Enter Valid Email');
    } else {
      setEmailError('');
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError('Password must be 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isError = false;

    if (!email) {
      setEmailError('Please Enter Email Address');
      isError = true;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError('Please Enter Valid Email');
      isError = true;
    }

    if (!password) {
      setPasswordError('Please Enter Password');
      isError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be 6 characters');
      isError = true;
    }

    if (!isError) {
      const addUser = { email, password };
      setLoading(true);

      try {
        const response = await axiosInstance.post(`/users/signin`, addUser, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const { jwtToken, user } = response.data;
          dispatch(login({ accessToken: jwtToken, user }));
          console.log('jwt token', jwtToken);
          toast.success('Login successful');
          navigate('/users', { replace: true });
          setLoading(false);
        } else {
          console.error('Login failed with status:', response.status);
          setError(response.data.message || 'Login failed. Please try again.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setError('Login failed. Please try again.');
        setLoading(false);
      }
    }
  };
  const toggleLanguage = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string | null
  ) => {
    if (newLanguage) {
      i18n.changeLanguage(newLanguage);
    }
  };

  // const toggleLanguage = () => {
  //   if (i18n.language === 'en') {
  //     i18n.changeLanguage('fr');
  //   } else if (i18n.language == 'fr') {
  //     i18n.changeLanguage('en');
  //   }
  // };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <div
          role="form"
          style={{
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <ToggleButtonGroup
              color="primary"
              exclusive
              aria-label="LanguageToggle"
              tabIndex={0}
              onChange={toggleLanguage}
            >
              <ToggleButton value="en">English</ToggleButton>
              <ToggleButton value="fr">French</ToggleButton>
            </ToggleButtonGroup>
            {/* <ToggleButtonGroup
              color="primary"
              exclusive
              aria-label="LanguageToggle"
              tabIndex={0}
              onChange={toggleLanguage}
            >
              <ToggleButton value="en">English</ToggleButton>
              <ToggleButton value="fr">French</ToggleButton>
            </ToggleButtonGroup> */}
            <Grid container direction="column" alignItems="center">
              <Avatar
                style={{ backgroundColor: 'grey', margin: '20px' }}
                aria-label="user avatar"
              >
                <PersonAddAltTwoToneIcon />
              </Avatar>
              <Typography
                variant="h4"
                style={{ color: 'blue', marginBottom: '20px' }}
              >
                {t('title')} {/* Use translation */}
                {/* Sign In */}
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="email"
                  name="email"
                  // label="Email"
                  label={t('email')}
                  variant="outlined"
                  // placeholder="Enter Email"
                  placeholder={t('email')} // Use translation
                  value={email}
                  onChange={onChangeEmail}
                  fullWidth
                  error={!!emailError}
                  helperText={emailError}
                  FormHelperTextProps={{ className: classes.helperText }}
                  aria-describedby="email helper text"
                  inputRef={emailRef}
                  onKeyDown={(e) => handleKeyDown(e, passwordRef, passwordRef)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  label={t('password')}
                  variant="outlined"
                  placeholder={t('password')}
                  value={password}
                  onChange={onChangePassword}
                  fullWidth
                  error={!!passwordError}
                  helperText={passwordError}
                  FormHelperTextProps={{ className: classes.helperText }}
                  aria-describedby="password visibility"
                  inputRef={passwordRef}
                  onKeyDown={(e) => handleKeyDown(e, emailRef, emailRef)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  style={{ marginTop: '10px', marginBottom: '15px' }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : t('submit')}
                  {/* Submit */}
                </Button>
              </Grid>
            </Grid>
            {/* <Typography variant="body2" align="center">
              Don't have an account?{' '}
              <Link to="/" aria-label="Sign Up">
                Sign Up
              </Link>
            </Typography> */}
            <Typography variant="body2" align="center">
              {t('signup')}{' '}
              <Link to="/" aria-label="Sign Up">
                {t('signup')} {/* Use translation */}
              </Link>
            </Typography>
          </form>
        </div>
        <ToastContainer />
      </Grid>
    </Grid>
  );
}

export default SignIn;
