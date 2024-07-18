import React, { useEffect, useState } from 'react';
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import { Avatar, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';

function Login1() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [image, setImage] = useState("");
    const [imageError, setImageError] = useState('');
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.user.accessToken);

    useEffect(() => {
        if (accessToken) {
            navigate("/users");
        }
    }, [accessToken, navigate]);

    const avatarstyle = { backgroundColor: "grey", margin: "20px" };

    const onChangeName = (e) => {
        setName(e.target.value);
        setNameError("");
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setEmailError("");
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setPasswordError("");
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
        }
        if (!isError) {
            const addUser = { name, email, password, image };
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("image", image);
            console.log(accessToken);
            try {
                const response = await fetch("http://localhost:5001", {
                    method: "POST",
                    body: formData,
                });

                const result = await response.json();
                if (!response.ok) {
                    console.error(result.error);
                } else {
                    console.log(result);
                    setName("");
                    setEmail("");
                    setPassword("");
                    const accessToken = "ABC123"; // Mock token
                    const user = { name, email };
                    dispatch(login({ accessToken, user }));
                    navigate("/users");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    };

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <div align="center">
                    <div>
                        <Avatar style={avatarstyle} my-20>
                            <PersonAddAltTwoToneIcon />
                        </Avatar>
                        <h2 style={{ color: "blue" }}>Enter Data</h2>
                    </div>

                    <div>
                        <TextField
                            type="text"
                            id="name"
                            name="name"
                            label="Name"
                            variant="outlined"
                            placeholder="Enter Name"
                            value={name}
                            onChange={onChangeName}
                            style={{ margin: "10px", width: "400px" }}
                        />
                        <span
                            style={{
                                fontSize: "15px",
                                display: "flex",
                                justifyContent: "left",
                                marginLeft: "510px",
                                color: "red",
                                marginTop: "-10px",
                            }}
                        >
                            {nameError}
                        </span>
                    </div>
                    <div>
                        <TextField
                            type="text"
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            placeholder="Enter Email"
                            value={email}
                            onChange={onChangeEmail}
                            style={{ margin: "10px", width: "400px" }}
                        />
                        <span
                            style={{
                                fontSize: "15px",
                                display: "flex",
                                justifyContent: "left",
                                marginLeft: "510px",
                                color: "red",
                                marginTop: "-10px",
                            }}
                        >
                            {emailError}
                        </span>
                    </div>

                    <div>
                        <TextField
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            placeholder="Enter Password"
                            value={password}
                            onChange={onChangePassword}
                            style={{ margin: "10px", width: "400px" }}
                        />
                        <span
                            style={{
                                fontSize: "15px",
                                display: "flex",
                                justifyContent: "left",
                                marginLeft: "510px",
                                color: "red",
                                marginTop: "-10px",
                            }}
                        >
                            {passwordError}
                        </span>
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            onChange={(e) => setImage(e.target.files[0])}
                            style={{ margin: "10px", width: "400px" }}
                        />
                        <span
                            style={{
                                fontSize: "15px",

                                display: "flex",
                                justifyContent: "left",
                                marginLeft: "510px",
                                color: "red",
                                marginTop: "-10px",
                            }}
                        >
                            {imageError}
                        </span>
                    </div>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        style={{ marginTop: "15px", marginBottom: "15px" }}
                    >
                        Submit
                    </Button><br />
                    <Link to={"/signin"} >Already have an account?</Link>
                </div>
            </form>
        </div>
    );
}

export default Login1;