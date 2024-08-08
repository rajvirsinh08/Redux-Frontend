import React, { useEffect, useState } from "react";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import { Avatar, Button, TextField, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "./axiosInstance";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  helperText: {
    position: "relative",
    left: "-8px", // Adjust this value to move the helper text
  },
}));
function Addusersfromfab() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [contact, setContact] = useState("");
  const [contactnoError, setContactnoError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  // const accessToken = user ? user.accessToken : null;
  const classes = useStyles();

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
  const onChangeContactno = (e) => {
    setContact(e.target.value);
    setContactnoError("");
    if (
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(e.target.value)
    ) {
      setContactnoError("");
    } else {
      setContactnoError("Please Enter Valid Contact No");
    }
  };
  const onChangeCity = (e) => {
    setCity(e.target.value);
    setCityError("");
    if (!/^[a-zA-Z]+$/.test(e.target.value)) {
      setCityError("Please Enter Valid City");
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
    if (!city) {
      setCityError("Please Enter City");
      isError = true;
    }
    if (!contact) {
      setContactnoError("Please Enter Contact No");
      isError = true;
    }

    if (!isError) {
      const addUser2 = { name, email, contact, city, password };

      try {
        const response = await axiosInstance.post(`/nm`, addUser2, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          const result = response.data;
          setName("");
          setEmail("");
          setCity("");
          setContact("");
          setPassword("");
          // Only update the Redux state if the user is adding another user
          // const user = { name, email };
          // dispatch(login({ user }));
          toast.success("User added successfully");
          navigate("/users", { replace: true });
        } else {
          const errorData = response.data;
          if (errorData.message === "Email already in use") {
            setEmailError(errorData.message);
          } else {
            toast.error(
              errorData.message || "Failed to add user. Please try again."
            );
          }
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to add user. Please try again.");
      }
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" alignItems="center">
              <Avatar style={{ backgroundColor: "grey", margin: "20px" }}>
                <PersonAddAltTwoToneIcon />
              </Avatar>
              <Typography
                variant="h4"
                style={{ color: "blue", marginBottom: "20px" }}
              >
                Add User
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
                />
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
                />
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
          </form>
        </div>
        <ToastContainer />
      </Grid>
    </Grid>
  );
}

export default Addusersfromfab;
