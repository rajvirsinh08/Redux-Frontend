// import React, { useEffect, useState } from 'react';
// import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
// import { Avatar, Button, TextField } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../features/userSlice';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
// import axiosInstance from './axiosInstance';

// function SignUp() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [nameError, setNameError] = useState("");
//     const [emailError, setEmailError] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [image, setImage] = useState("");
//     const [imageError, setImageError] = useState('');
//     const navigate = useNavigate();
//     const baseUrl = process.env.REACT_APP_BASE_URL; 

//     // const accessToken = useSelector((state) => state.user.accessToken);

//     // useEffect(() => {
//     //     if (accessToken) {
//     //         navigate("/users");
//     //     }
//     // }, [accessToken, navigate]);

//     const avatarstyle = { backgroundColor: "grey", margin: "20px" };

//     const onChangeName = (e) => {
//         setName(e.target.value);
//         setNameError("");
//         if (!/^[a-zA-Z]+$/.test(name)) {
//             setNameError("Please Enter Valid Name");
//         }
//         else {
//             setNameError("");
//         }
//     };

//     const onChangeEmail = (e) => {

//         setEmail(e.target.value);
//         if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
//             setEmailError("Please Enter Valid Email");

//         }
//         else {
//             setEmailError("");
//         }   
//     };

//     const onChangePassword = (e) => {
//         setPassword(e.target.value);
//         if (password.length < 6) {
//             setPasswordError("Password must be 6 characters");
//         }
//         else {
//             setPasswordError("");

//         }
//     };

//     const dispatch = useDispatch();

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
//         if (!name) {
//             setNameError("Please Enter Name");
//             isError = true;
//         } else if (!/^[a-zA-Z]+$/.test(name)) {
//             setNameError("Please Enter Valid Name");
//             isError = true;
//         }
//         if (!password) {
//             setPasswordError("Please Enter Password");
//             isError = true;
//         } else if (password.length < 6) {
//             setPasswordError("Password must be 6 characters");
//             isError = true;
//         }
//         if (!image) {
//             setImageError("Please Select Image");
//         }
//         if (!isError) {
//             const formData = new FormData();
//             formData.append("name", name);
//             formData.append("email", email);
//             formData.append("password", password);
//             formData.append("image", image);

//             try {
//                 const response = await axiosInstance.post(`${baseUrl}/`, formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });

//                 if (response.status === 201) {  // Check for 201 Created status
//                     const result = response.data;
//                     setName("");
//                     setEmail("");
//                     setPassword("");
//                     setImage(null);
//                     const user = { name, email };
//                     dispatch(login({ user }));
//                     toast.success("Sign up successful");
//                     navigate("/signin");
//                 } else {
//                     const errorData = response.data;
//                     if (errorData.message === "Email already in use") {
//                         setEmailError(errorData.message);
//                     } else {
//                         toast.error(errorData.message || "Failed to sign up. Please try again.");
//                     }
//                 }
//             } catch (error) {
//                 console.error("Error submitting form:", error);
//                 toast.error("Failed to sign up. Please try again.");
//             }
//         }
//     };

//     //     if (!isError) {
//     //         const addUser = { name, email, password, image };
//     //         const formData = new FormData();
//     //         formData.append("name", name);
//     //         formData.append("email", email);
//     //         formData.append("password", password);
//     //         formData.append("image", image);
//     //         // console.log(accessToken);
//     //         try {
//     //             axios.post("http://localhost:5001")
//     //             .then((response) => {
//     //                 console.log(response);
//     //                 // setUserData(response.data.products);
//     //                 // console.log(result);
//     //                 setName("");
//     //                 setEmail("");
//     //                 setPassword("");
//     //                 // const accessToken = "ABC123"; // Mock token
//     //                 const user = { name, email };
//     //                 dispatch(login({ user }));
//     //                 navigate("/signin");
//     //             })
//     //             // const response = await axios.post("http://localhost:5001", {
//     //             //     // method: "POST",
//     //             //     body: formData,
//     //             // });

//     //             // const result = await response.json();
//     //             // if (!response.ok) {
//     //             //     console.error(result.error);
//     //             //     if (result.error === "Email already in use") {
//     //             //         setEmailError(result.error);
//     //             //     } else {
//     //             //         toast.error(result.message);
//     //             //     }
//     //             //     // toast.error(result.error);

//     //             // } 
//     //             // if(response.ok){
//     //             //     console.log(result);
//     //             //     setName("");
//     //             //     setEmail("");
//     //             //     setPassword("");
//     //             //     // const accessToken = "ABC123"; // Mock token
//     //             //     const user = { name, email };
//     //             //     dispatch(login({ user }));
//     //             //     navigate("/signin");
//     //             // }
//     //         } catch (error) {
//     //             console.error("Error submitting form:", error);
//     //         }
//     //     }
//     // };
//     return (
//         <div className='login'>
//             <form onSubmit={handleSubmit}>
//                 <div align="center">
//                     <div>
//                         <Avatar style={avatarstyle} my-20>
//                             <PersonAddAltTwoToneIcon />
//                         </Avatar>
//                         <h2 style={{ color: "blue" }}>Sign Up</h2>
//                     </div>

//                     <div>
//                         <TextField
//                             type="text"
//                             id="name"
//                             name="name"
//                             label="Name"
//                             variant="outlined"
//                             placeholder="Enter Name"
//                             value={name}
//                             onChange={onChangeName}
//                             style={{ margin: "10px", width: "400px" }}
//                         />
//                         <span
//                             style={{
//                                 fontSize: "15px",
//                                 display: "flex",
//                                 justifyContent: "left",
//                                 marginLeft: "510px",
//                                 color: "red",
//                                 marginTop: "-10px",
//                             }}
//                         >
//                             {nameError}
//                         </span>
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
//                         <span
//                             style={{
//                                 fontSize: "15px",
//                                 display: "flex",
//                                 justifyContent: "left",
//                                 marginLeft: "510px",
//                                 color: "red",
//                                 marginTop: "-10px",
//                             }}
//                         >
//                             {emailError}
//                         </span>
//                     </div>

//                     <div>
//                         <TextField
//                             type="password"
//                             id="password"
//                             name="password"
//                             label="Password"
//                             variant="outlined"
//                             placeholder="Enter Password"
//                             value={password}
//                             onChange={onChangePassword}
//                             style={{ margin: "10px", width: "400px" }}
//                         />
//                         <span
//                             style={{
//                                 fontSize: "15px",
//                                 display: "flex",
//                                 justifyContent: "left",
//                                 marginLeft: "510px",
//                                 color: "red",
//                                 marginTop: "-10px",
//                             }}
//                         >
//                             {passwordError}
//                         </span>
//                     </div>
//                     <div className="mb-3">
//                         <input
//                             className="form-control"
//                             type="file"
//                             id="formFile"
//                             onChange={(e) => setImage(e.target.files[0])}
//                             style={{ margin: "10px", width: "400px" }}
//                         />
//                         <span
//                             style={{
//                                 fontSize: "15px",

//                                 display: "flex",
//                                 justifyContent: "left",
//                                 marginLeft: "510px",
//                                 color: "red",
//                                 marginTop: "-10px",
//                             }}
//                         >
//                             {imageError}
//                         </span>
//                     </div>
//                     <Button
//                         type="submit"
//                         color="primary"
//                         variant="contained"
//                         style={{ marginTop: "15px", marginBottom: "15px" }}
//                     >
//                         Submit
//                     </Button><br />
//                     Already have an account? <Link to={"/signin"} >Sign In</Link>
//                 </div>
//                 <ToastContainer />

//             </form>
//         </div>
//     )
// }

// export default SignUp

import React, { useState } from 'react';
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import { Avatar, Button, TextField, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from './axiosInstance';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const onChangeName = (e) => {
        setName(e.target.value);
        setNameError("");
        if (!/^[a-zA-Z]+$/.test(e.target.value)) {
            setNameError("Please Enter Valid Name");
        }
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setEmailError("");
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
            setEmailError("Please Enter Valid Email");
        }
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setPasswordError("");
        if (e.target.value.length < 6) {
            setPasswordError("Password must be 6 characters");
        }
    };

    const dispatch = useDispatch();

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
        if (!name) {
            setNameError("Please Enter Name");
            isError = true;
        } else if (!/^[a-zA-Z]+$/.test(name)) {
            setNameError("Please Enter Valid Name");
            isError = true;
        }
        if (!password) {
            setPasswordError("Please Enter Password");
            isError = true;
        } else if (password.length < 6) {
            setPasswordError("Password must be 6 characters");
            isError = true;
        }
        if (!image) {
            setImageError("Please Select Image");
            isError = true;
        }

        if (!isError) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("image", image);

            try {
                const response = await axiosInstance.post(`${baseUrl}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 201) {
                    const result = response.data;
                    setName("");
                    setEmail("");
                    setPassword("");
                    setImage(null);
                    const user = { name, email };
                    dispatch(login({ user }));
                    toast.success("Sign up successful");
                    navigate("/signin");
                } else {
                    const errorData = response.data;
                    if (errorData.message === "Email already in use") {
                        setEmailError(errorData.message);
                    } else {
                        toast.error(errorData.message || "Failed to sign up. Please try again.");
                    }
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                toast.error("Failed to sign up. Please try again.");
            }
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <div className='login'>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" alignItems="center">
                            <Avatar style={{ backgroundColor: "grey", margin: "20px" }}>
                                <PersonAddAltTwoToneIcon />
                            </Avatar>
                            <Typography variant="h4" style={{ color: "blue" }}>Sign Up</Typography>
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    fullWidth
                                    style={{ margin: "10px 0" }}
                                />
                                {imageError && (
                                    <Typography color="error" variant="body2">
                                        {imageError}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    style={{ marginTop: "10px", marginBottom: "15px" }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" align="center">
                            Already have an account? <Link to="/signin">Sign In</Link>
                        </Typography>
                    </form>
                </div>
                <ToastContainer />
            </Grid>
        </Grid>
    );
}

export default SignUp;
