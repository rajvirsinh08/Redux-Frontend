import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import { Avatar, TextField, Button, Grid, Alert, Typography } from "@mui/material";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import axiosInstance from "./axiosInstance";

const EditUser = () => {
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
            // const formData = new FormData();
            // formData.append("name", name);
            // formData.append("email", email);
            const editUser1 = { name, email };


            try {
                const response = await axiosInstance.patch(`/update/${id}`, editUser1, {
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
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <form onSubmit={handleUpdate}>
                        <Grid container direction="column" alignItems="center">
                            <Avatar style={{ backgroundColor: "grey", margin: "20px" }}>
                                <PersonAddAltTwoToneIcon />
                            </Avatar>
                            <Typography variant="h4" style={{ color: "blue", marginBottom: "20px" }}>Edit The Data</Typography>
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
                                    style={{ marginTop: "10px", marginBottom: "15px" }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <ToastContainer />
            </Grid>
        </Grid>
    );
};

export default EditUser;
