// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Avatar, Button, TextField, IconButton, InputAdornment } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { login, selectUser } from '../features/userSlice';
// import axios from 'axios';
// import axiosInstance from './axiosInstance';

// function SignIn() {
//     const [password, setPassword] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState("");
//     const [emailError, setEmailError] = useState("");
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const user = useSelector(selectUser);
//     const [error, setError] = useState("");
//     // const baseUrl = process.env.REACT_APP_BASE_URL;
//     // const user = useSelector(selectUser);

//     // useEffect(() => {
//     //     if (user && user.accessToken) {
//     //         navigate("/users");
//     //     }
//     // }, [user, navigate]);

//     const avatarstyle = { backgroundColor: "grey", margin: "20px" };

//     const onChangeEmail = (e) => {
//         setEmail(e.target.value);
//         if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
//             setEmailError("Please Enter Valid Email");
//         } else {
//             setEmailError("");
//         }
//     };

//     const onChangePassword = (e) => {
//         setPassword(e.target.value);
//         if (e.target.value.length < 6) {
//             setPasswordError("Password must be 6 characters");
//         } else {
//             setPasswordError("");
//         }
//     };

//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     let isError = false;
//     //     debugger
//     //     if (!email) {
//     //         setEmailError("Please Enter Email Address");
//     //         isError = true;
//     //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
//     //         setEmailError("Please Enter Valid Email");
//     //         isError = true;
//     //     }

//     //     if (!password) {
//     //         setPasswordError("Please Enter Password");
//     //         isError = true;
//     //     } else if (password.length < 6) {
//     //         setPasswordError("Password must be 6 characters");
//     //         isError = true;
//     //     }
//     //     if (!isError) {
//     //         const addUser = { email, password };

//     //         try {
//     //             const response = await axiosInstance.post("${baseUrl}/signin", addUser, {
//     //                 headers: {
//     //                     'Content-Type': 'application/json',
//     //                     'Authorization': `Bearer ${user.accessToken}`

//     //                 }
//     //             });

//     //             if (response.status === 200) {
//     //                 const { jwtToken, user } = response.data;
//     //                 dispatch(login({ accessToken: jwtToken, user }));
//     //                 toast.success("Login successful");
//     //                 navigate("/users");
//     //             } else {
//     //                 setError(response.data.message || "Login failed. Please try again.");
//     //             }
//     //         } catch (error) {
//     //             console.error("Error submitting form:", error);
//     //             setError("Login failed. Please try again.");
//     //         }
//     //     }
//     // };
//     const handleSubmit = async (e) => {
//         debugger
//         e.preventDefault();
//         let isError = false;

//         if (!email) {
//             setEmailError("Please Enter Email Address");
//             isError = true;
//         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
//             setEmailError("Please Enter Valid Email");
//             isError = true;
//         }

//         if (!password) {
//             setPasswordError("Please Enter Password");
//             isError = true;
//         } else if (password.length < 6) {
//             setPasswordError("Password must be 6 characters");
//             isError = true;
//         }

//         if (!isError) {
//             const addUser = { email, password };

//             try {
//                 const response = await axiosInstance.post(`/signin`, addUser, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         // 'Authorization': `Bearer ${user.accessToken}`
//                     }
//                 });

//                 if (response.status === 200) {
//                     const { jwtToken, user } = response.data;
//                     dispatch(login({ accessToken: jwtToken, user }));
//                     toast.success("Login successful");
//                     navigate("/users");
//                 } else {
//                     console.error("Login failed with status:", response.status);
//                     setError(response.data.message || "Login failed. Please try again.");
//                 }
//             } catch (error) {
//                 console.error("Error submitting form:", error);
//                 setError("Login failed. Please try again.");
//             }
//         }
//     };


//     //     if (!isError) {
//     //         const addUser = { email, password };

//     //         try {
//     //             const response = await fetch("http://localhost:5001/signin", {
//     //                 method: "POST",
//     //                 body: JSON.stringify(addUser),
//     //                 headers: {
//     //                     'Content-Type': 'application/json',
//     //                     'Authorization': `Bearer ${user.accessToken}`

//     //                 }
//     //             });

//     //             const result = await response.json();
//     //             if (!response.ok) {
//     //                 setError(result.message);
//     //             } else {
//     //                 const accessToken = result.jwtToken;
//     //                 const user = result.user;
//     //                 setError("");
//     //                 dispatch(login({ accessToken, user }));
//     //                 console.log("jwt Token:", accessToken);
//     //                 toast.success("Login successfully");
//     //                 navigate("/users");
//     //             }
//     //         } catch (error) {
//     //             console.error("Error submitting form:", error);
//     //         }
//     //     }
//     // };

//     return (
//         <div className='signin'>
//             <form onSubmit={handleSubmit}>
//                 <div align="center">
//                     <div>
//                         <Avatar style={avatarstyle} my-20>
//                             <PersonAddAltTwoToneIcon />
//                         </Avatar>
//                         <h2 style={{ color: "blue" }}>Sign In</h2>
//                     </div>

//                     <div>
//                         <TextField
//                             type="text"
//                             id="email"
//                             name="email"
//                             label="Email"
//                             variant="outlined"
//                             placeholder="Enter Email"
//                             value={email}
//                             onChange={onChangeEmail}
//                             style={{ margin: "10px", width: "400px" }}
//                         />
//                         <span style={{ fontSize: "15px", display: "flex", justifyContent: "left", marginLeft: "510px", color: "red", marginTop: "-10px" }}>
//                             {emailError}
//                         </span>
//                     </div>

//                     <div>
//                         <TextField
//                             type={showPassword ? "text" : "password"}
//                             id="password"
//                             name="password"
//                             label="Password"
//                             variant="outlined"
//                             placeholder="Enter Password"
//                             value={password}
//                             onChange={onChangePassword}
//                             style={{ margin: "10px", width: "400px" }}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             aria-label="toggle password visibility"
//                                             onClick={handleClickShowPassword}
//                                             onMouseDown={handleMouseDownPassword}
//                                         >
//                                             {showPassword ? <Visibility /> : <VisibilityOff />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 )
//                             }}
//                         />
//                         <span style={{ fontSize: "15px", display: "flex", justifyContent: "left", marginLeft: "510px", color: "red", marginTop: "-10px" }}>
//                             {passwordError}
//                         </span>
//                     </div>

//                     {error && <div className="alert alert-danger alert-dismissible fade show" style={{ height: "55px", paddingBottom: "5px", width: "400px", marginTop: "10px" }} role="alert">
//                         <strong>{error}</strong>
//                     </div>}
//                     <div>
//                         <Button type="submit" color="primary" variant="contained" style={{ marginTop: "10px" }}>
//                             Submit
//                         </Button>
//                     </div>
//                     <br />
//                     Don't have an account? <Link to={"/"}>Sign Up</Link>
//                 </div>
//                 <ToastContainer />
//             </form>
//         </div>
//     );
// }

// export default SignIn;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, TextField, IconButton, InputAdornment, Grid, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login, selectUser } from '../features/userSlice';
import axiosInstance from './axiosInstance';

function SignIn() {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const avatarStyle = { backgroundColor: "grey", margin: "20px" };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
            setEmailError("Please Enter Valid Email");
        } else {
            setEmailError("");
        }
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 6) {
            setPasswordError("Password must be 6 characters");
        } else {
            setPasswordError("");
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isError = false;

        if (!email) {
            setEmailError("Please Enter Email Address");
            isError = true;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setEmailError("Please Enter Valid Email");
            isError = true;
        }

        if (!password) {
            setPasswordError("Please Enter Password");
            isError = true;
        } else if (password.length < 6) {
            setPasswordError("Password must be 6 characters");
            isError = true;
        }

        if (!isError) {
            const addUser = { email, password };

            try {
                const response = await axiosInstance.post(`/signin`, addUser, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.status === 200) {
                    const { jwtToken, user } = response.data;
                    dispatch(login({ accessToken: jwtToken, user }));
                    toast.success("Login successful");
                    navigate("/users");
                } else {
                    console.error("Login failed with status:", response.status);
                    setError(response.data.message || "Login failed. Please try again.");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                setError("Login failed. Please try again.");
            }
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={11} sm={8} md={6} lg={4}>
                <form onSubmit={handleSubmit}>
                    <Grid container direction="column" alignItems="center">
                        <Avatar style={avatarStyle}>
                            <PersonAddAltTwoToneIcon />
                        </Avatar>
                        <h2 style={{ color: "blue" }}>Sign In</h2>

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
                            margin="normal"
                            error={!!emailError}
                            helperText={emailError}
                        />

                        <TextField
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            placeholder="Enter Password"
                            value={password}
                            onChange={onChangePassword}
                            fullWidth
                            margin="normal"
                            error={!!passwordError}
                            helperText={passwordError}
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
                                )
                            }}
                        />

                        {error && (
                            <Alert severity="error" style={{ width: '100%', margin: '10px 0' }}>
                                {error}
                            </Alert>
                        )}

                        <Button type="submit" color="primary" variant="contained" fullWidth style={{ marginTop: "10px" }}>
                            Submit
                        </Button>

                        <div style={{ marginTop: "10px" }}>
                            Don't have an account? <Link to="/">Sign Up</Link>
                        </div>
                    </Grid>
                </form>
                <ToastContainer />
            </Grid>
        </Grid>
    );
}

export default SignIn;
