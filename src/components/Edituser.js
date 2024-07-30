// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
// import { Avatar, TextField, Button, selectClasses } from "@mui/material";
// import { selectUser } from "../features/userSlice";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import axiosInstance from "./axiosInstance";
// const EditUser = () => {
//     const avatarStyle = { backgroundColor: "grey", margin: "20px" };
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [nameError, setNameError] = useState("");
//     const [emailError, setEmailError] = useState("");
//     const [error, setError] = useState("");
//     // const [image, setImage] = useState(null);
//     // const [imageError, setImageError] = useState("");
//     const user = useSelector(selectUser);
//     const navigate = useNavigate();
//     const { id } = useParams();
//     // const baseUrl = process.env.REACT_APP_BASE_URL;

//     const onChangeName = (e) => {
//         setName(e.target.value);
//         setNameError("");
//     };

//     const onChangeEmail = (e) => {
//         setEmail(e.target.value);
//         setEmailError("");
//     };

//     // const onChangeImage = (e) => {
//     //     setImage(e.target.files[0]);
//     //     setImageError("");
//     // };
//     // const getSingleUser = async () => {
//     //     try {
//     //         const response = await axios.get(`http://localhost:5001/${id}`, {
//     //             headers: {
//     //                 Authorization: `Bearer ${user.accessToken}`
//     //             }
//     //         });

//     //         if (response.status === 200) {
//     //             const result = response.data;
//     //             setName(result.name);
//     //             setEmail(result.email);
//     //             setImage(result.image);
//     //         } else {
//     //             setError("Failed to fetch user data");
//     //         }
//     //     } catch (err) {
//     //         console.error("Failed to fetch user:", err);
//     //         setError("Failed to fetch user data");
//     //     }
//     // };
//     const getSingleUser = async () => {
//         debugger
//         try {
//             // const response = await axiosInstance.get(`${baseUrl}/${id}`);
//             const response = await axiosInstance.get(`/${id}`, {
//                 headers: {
//                     'Authorization': `Bearer ${user.accessToken}`
//                 },
//             });
//             if (response.status === 200) {
//                 const result = response.data;
//                 setName(result.name);
//                 setEmail(result.email);
//                 // setImage(result.image);
//             } else {
//                 setError("Failed to fetch user data");
//             }
//         } catch (err) {
//             console.error("Failed to fetch user:", err);
//             setError("Failed to fetch user data");
//         }
//     };
//     // const getSingleUser = async () => {
//     //     try {
//     //         const response = await axios.get (`http://localhost:5001/${id}`, {
//     //             headers: {
//     //                 Authorization: `Bearer ${user.accessToken}`
//     //             }
//     //         });

//     //         const result = await response.json();

//     //         if (!response.ok) {
//     //             console.error(result.error);
//     //             setError(result.error);
//     //         } else {
//     //             setError("");
//     //             setName(result.name);
//     //             setEmail(result.email);
//     //             setImage(result.image);
//     //         }
//     //     } catch (err) {
//     //         console.error("Failed to fetch user:", err);
//     //         setError("Failed to fetch user data");
//     //     }
//     // };


//     const handleUpdate = async (e) => {
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
//         // if (!image) {
//         //     setImageError("Please Select Image");
//         //     isError = true;
//         // }
//         if (!isError) {
//             const formData = new FormData();
//             formData.append("name", name);
//             formData.append("email", email);
//             // formData.append("image", image);

//             try {
//                 // const response = await axiosInstance.patch(`${baseUrl}/${id}`, formData);

//                 const response = await axiosInstance.patch(`/update/${id}`, formData, {
//                     headers: {
//                         'Authorization': `Bearer ${user.accessToken}`
//                     },
//                 });
//                 if (response.status === 200) {
//                     navigate("/users");
//                     toast.success("Update Successful");
//                 } else {
//                     toast.error("Failed to update user");
//                 }
//             } catch (err) {
//                 console.error("Error submitting form:", err);
//                 toast.error("Failed to update user");
//             }
//         }

//         // if (!isError) {
//         //     const formData = new FormData();
//         //     formData.append("name", name);
//         //     formData.append("email", email);
//         //     formData.append("image", image);

//         //     try {
//         //         const response = await axios.patch(`http://localhost:5001/${id}`, {
//         //             // method: "PATCH",
//         //             headers: {
//         //                 Authorization: `Bearer ${user.accessToken}`
//         //             },
//         //             body: formData,
//         //         });

//         //         const result = await response.json();
//         //         if (!response.ok) {
//         //             console.error(result.error);
//         //             toast.error(result.message);
//         //         } else {
//         //             setError("");
//         //             navigate("/users");
//         //             toast.success("Update Successful");
//         //         }
//         //     } catch (err) {
//         //         console.error("Error submitting form:", err);
//         //         toast.error("Failed to update user");
//         //     }
//         // }
//     };


//     useEffect(() => {
//         getSingleUser();
//     }, [id]);

//     return (
//         <div>
//             <div align="center">
//                 <div>
//                     <Avatar style={avatarStyle} my-20>
//                         <PersonAddAltTwoToneIcon />
//                     </Avatar>
//                     <h2 style={{ color: "blue" }}>Edit The Data</h2>
//                 </div>

//                 <div>
//                     <TextField
//                         type="text"
//                         id="name"
//                         name="name"
//                         label="Name"
//                         variant="outlined"
//                         placeholder="Enter Name"
//                         value={name}
//                         onChange={onChangeName}
//                         required
//                         style={{ margin: "10px", width: "400px" }}
//                     />
//                     <span
//                         style={{
//                             display: "flex",
//                             justifyContent: "left",
//                             marginLeft: "510px",
//                             color: "red",
//                             marginTop: "-10px",
//                         }}
//                     >
//                         {nameError}
//                     </span>
//                 </div>
//                 <div>
//                     <TextField
//                         type="text"
//                         id="email"
//                         name="email"
//                         label="Email"
//                         variant="outlined"
//                         placeholder="Enter Email"
//                         value={email}
//                         onChange={onChangeEmail}
//                         required
//                         style={{ margin: "10px", width: "400px" }}
//                     />
//                     <span
//                         style={{
//                             display: "flex",
//                             justifyContent: "left",
//                             marginLeft: "510px",
//                             color: "red",
//                             marginTop: "-10px",
//                         }}
//                     >
//                         {emailError}
//                     </span>
//                 </div>
//                 {/* <div className="mb-3">
//                     <input
//                         className="form-control"
//                         type="file"
//                         id="formFile"
//                         onChange={onChangeImage}
//                         style={{ margin: "10px", width: "400px" }}
//                     />
//                     <span
//                         style={{
//                             display: "flex",
//                             justifyContent: "left",
//                             marginLeft: "510px",
//                             color: "red",
//                             marginTop: "-10px",
//                         }}
//                     >
//                         {imageError}
//                     </span>
//                 </div> */}
//                 <Button
//                     type="submit"
//                     color="primary"
//                     onClick={handleUpdate}
//                     variant="contained"
//                     style={{ marginTop: "20px" }}
//                 >
//                     Submit
//                 </Button>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default EditUser;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import { Avatar, TextField, Button, Grid, Alert } from "@mui/material";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import axiosInstance from "./axiosInstance";

const EditUser = () => {
    const avatarStyle = { backgroundColor: "grey", margin: "20px" };
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [error, setError] = useState("");
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const { id } = useParams();

    const onChangeName = (e) => {
        setName(e.target.value);
        setNameError("");
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setEmailError("");
    };

    const getSingleUser = async () => {
        try {
            const response = await axiosInstance.get(`/get/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                },
            });
            if (response.status === 200) {
                const result = response.data;
                setName(result.name);
                setEmail(result.email);
            } else {
                setError("Failed to fetch user data");
            }
        } catch (err) {
            console.error("Failed to fetch user:", err);
            setError("Failed to fetch user data");
        }
    };

    const handleUpdate = async (e) => {
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

        if (!isError) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);

            try {
                const response = await axiosInstance.patch(`/update/${id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`
                    },
                });
                if (response.status === 200) {
                    navigate("/users");
                    toast.success("Update Successful");
                } else {
                    toast.error("Failed to update user");
                }
            } catch (err) {
                console.error("Error submitting form:", err);
                toast.error("Failed to update user");
            }
        }
    };

    useEffect(() => {
        getSingleUser();
    }, [id]);

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={11} sm={8} md={6} lg={4}>
                <form onSubmit={handleUpdate}>
                    <Grid container direction="column" alignItems="center">
                        <Avatar style={avatarStyle}>
                            <PersonAddAltTwoToneIcon />
                        </Avatar>
                        <h2 style={{ color: "blue" }}>Edit The Data</h2>

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
                            margin="normal"
                            error={!!nameError}
                            helperText={nameError}
                        />

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

                        {error && (
                            <Alert severity="error" style={{ width: '100%', margin: '10px 0' }}>
                                {error}
                            </Alert>
                        )}

                        <Button type="submit" color="primary" variant="contained" fullWidth style={{ marginTop: "20px" }}>
                            Submit
                        </Button>
                    </Grid>
                </form>
                <ToastContainer />
            </Grid>
        </Grid>
    );
};

export default EditUser;
