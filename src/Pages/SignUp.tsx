import React, {
  useEffect,
  useState,
  FormEvent,
  ChangeEvent,
  useRef,
} from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { PersonAddAltTwoTone as PersonAddAltTwoToneIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from 'store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'App.css';
import axiosInstance from 'components/axiosInstance';

const useStyles = makeStyles((theme) => ({
  helperText: {
    position: 'relative',
    left: '-8px', // Adjust this value to move the helper text
  },
}));

function SignUp() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [contact, setContact] = useState('');
  const [contactnoError, setContactnoError] = useState('');

  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [dob, setDob] = useState(dayjs('2006-01-01'));

  const libraries = ['places'];
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const accessToken = user ? user.accessToken : null;
  const classes = useStyles();

  // Refs for the TextField components to manage focus
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const contactRef = useRef(null);
  const cityRef = useRef(null);
  const passwordRef = useRef(null);
  const dobRef = useRef(null);
  //  const handleKeyDown = (
  //   event: React.KeyboardEvent<any>,
  // ref: React.RefObject<HTMLInputElement>) => {
  //    if (event.key === "ArrowDown") {
  //      event.preventDefault();
  //      ref.current?.focus();
  //    }
  //    if (event.key === "ArrowUp") {
  //      event.preventDefault();
  //      ref.current?.focus();
  //    }
  //  };

  useEffect(() => {}, [accessToken, navigate]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError('');
    if (!/^[a-zA-Z]+$/.test(e.target.value)) {
      setNameError('Please Enter Valid Name');
    }
  };

  const onChangeContactno = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
    setContactnoError('');
    if (
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(e.target.value)
    ) {
      setContactnoError('');
    } else {
      setContactnoError('Please Enter Valid Contact No');
    }
  };
  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setCityError('');
    if (!/^[a-zA-Z]+$/.test(e.target.value)) {
      setCityError('Please Enter Valid City');
    }
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
      setEmailError('Please Enter Valid Email');
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
    if (e.target.value.length < 6) {
      setPasswordError('Password must be 6 characters');
    }
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    let isError = false;

    if (!email) {
      setEmailError('Please Enter Email Address');
      isError = true;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError('Please Enter Valid Email');
      isError = true;
    }
    if (!name) {
      setNameError('Please Enter Name');
      isError = true;
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      setNameError('Please Enter Valid Name');
      isError = true;
    }
    if (!password) {
      setPasswordError('Please Enter Password');
      isError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be 6 characters');
      isError = true;
    }
    if (!city) {
      setCityError('Please Enter City');
      isError = true;
    }
    if (!contact) {
      setContactnoError('Please Enter Contact No');
      isError = true;
    }
    if (!isError) {
      const formattedDob = dob ? dob.format('DD-MM-YYYY') : '';
      const addUser1 = {
        name,
        email,
        contact,
        dob: formattedDob,
        city,
        password,
      };
      setLoading(true);

      try {
        const response = await axiosInstance.post(`/users/nm`, addUser1, {
          headers: {
            // 'Content-Type': 'multipart/form-data'
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          // const result = response.data;
          setName('');
          setEmail('');
          setCity('');
          // setDob("");
          setDob(dayjs('01-01-2006'));
          setContact('');
          setPassword('');
          const user = {
            name,
            email,
            contact,
            dob: dob.format('DD-MM-YYYY'),
            city,
          };
          dispatch(login({ user }));
          toast.success('Sign up successful');
          navigate('/signin', { replace: true });
          setLoading(false);
        } else {
          const errorData = response.data;
          if (errorData.message === 'Email already in use') {
            setEmailError(errorData.message);
          } else {
            toast.error(
              errorData.message || 'Failed to sign up. Please try again.'
            );
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Failed to sign up. Please try again.');
        setLoading(false);
      }
    }
  };
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
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event); // Trigger form submission on Enter
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', fontFamily: 'Arima' }}
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
            <Grid container direction="column" alignItems="center">
              <Avatar style={{ backgroundColor: 'grey', margin: '20px' }}>
                <PersonAddAltTwoToneIcon />
              </Avatar>
              <Typography
                aria-label="signup title"
                variant="h4"
                style={{
                  color: 'blue',
                  marginBottom: '20px',
                  fontFamily: 'Arima',
                }}
              >
                Sign Up
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  placeholder="Enter Name"
                  value={name}
                  onChange={onChangeName}
                  fullWidth
                  error={!!nameError}
                  helperText={nameError}
                  FormHelperTextProps={{ className: classes.helperText }}
                  aria-describedby="name helper text"
                  style={{ fontFamily: 'Arima' }}
                  inputRef={nameRef}
                  onKeyDown={(e) => handleKeyDown(e, passwordRef, emailRef)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Enter Email"
                  value={email}
                  onChange={onChangeEmail}
                  fullWidth
                  error={!!emailError}
                  helperText={emailError}
                  FormHelperTextProps={{ className: classes.helperText }}
                  aria-describedby="email helper text"
                  style={{ fontFamily: 'Arima' }}
                  inputRef={emailRef}
                  onKeyDown={(e) => handleKeyDown(e, nameRef, contactRef)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="contact"
                  name="contact"
                  label="Contact No"
                  variant="outlined"
                  placeholder="Enter Contact No"
                  value={contact}
                  onChange={onChangeContactno}
                  fullWidth
                  error={!!contactnoError}
                  helperText={contactnoError}
                  FormHelperTextProps={{ className: classes.helperText }}
                  aria-describedby="contact helper text"
                  style={{ fontFamily: 'Arima' }}
                  inputRef={contactRef}
                  onKeyDown={(e) => handleKeyDown(e, emailRef, cityRef)}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: '-10px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="Date of Birth"
                      sx={{ width: '100% ' }}
                      value={dob}
                      minDate={dayjs('1900-01-01')}
                      maxDate={dayjs('2006-01-01')}
                      views={['day', 'month', 'year']}
                      aria-describedby="dob helper text"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="city"
                  name="city"
                  label="City"
                  variant="outlined"
                  placeholder="Enter City"
                  value={city}
                  onChange={onChangeCity}
                  fullWidth
                  error={!!cityError}
                  helperText={cityError}
                  FormHelperTextProps={{ className: classes.helperText }}
                  aria-describedby="city helper text"
                  style={{ fontFamily: 'Arima' }}
                  inputRef={cityRef}
                  onKeyDown={(e) => handleKeyDown(e, contactRef, passwordRef)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  placeholder="Enter Password"
                  value={password}
                  onChange={onChangePassword}
                  fullWidth
                  error={!!passwordError}
                  helperText={passwordError}
                  FormHelperTextProps={{ className: classes.helperText }}
                  aria-describedby="password helper text"
                  inputRef={passwordRef}
                  onKeyDown={(e) => handleKeyDown(e, cityRef, nameRef)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  style={{ marginTop: '10px', marginBottom: '15px' }}
                  disabled={loading}
                  aria-controls="submit new user"
                >
                  {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              align="center"
              style={{ fontFamily: 'Arima' }}
            >
              Already have an account?{' '}
              <Link to="/signin" style={{ fontFamily: 'Arima' }}>
                Sign In
              </Link>
            </Typography>
          </form>
        </div>
        <ToastContainer />
      </Grid>
    </Grid>
  );
}

export default SignUp;
