import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axiosInstance from "./axiosInstance";
import { Audio } from 'react-loader-spinner';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from "@mui/system";
import { Button, Typography, Container, Grid, TextField, Fab } from "@mui/material";
import debounce from 'lodash.debounce';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';

const Users = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const columns = [
        { field: 'name', headerName: 'Name', sortable: false, width: 225, editable: false },
        { field: 'email', headerName: 'Email', sortable: false, width: 225, editable: false },
        { field: 'contact', headerName: 'Contact No', sortable: false, width: 225, editable: false },
        { field: 'city', headerName: 'City', sortable: false, width: 225, editable: false },


        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: 16 }}
                        onClick={() => navigate(`/edituser/${params.row.id}`)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteAlert(params.row.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const handleDeleteAlert = (id) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this data?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            setLoading(true);
                            await axiosInstance.delete(`/delete/${id}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                    'Authorization': `Bearer ${user.accessToken}`
                                },
                            });
                            setLoading(false);
                            setError("Deleted successfully");
                            setTimeout(() => {
                                setError("");
                                getData();
                            }, 1000);
                        } catch (error) {
                            setLoading(false);
                            setError(error.message);
                            console.log(error);
                        }
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    const handleCreateUser = (e) => {
        e.preventDefault();
        confirmAlert({
            title: 'Confirm to logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(logout());
                        navigate('/signin');
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/get`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.accessToken}`
                },
            });
            setLoading(false);
            const formattedData = response.data.map((item) => ({
                id: item._id,
                name: item.name,
                email: item.email,
                contact:item.contact,
                city:item.city,
            }));
            // Reverse the data to show newest users first
            setData(formattedData.reverse());
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.log(error);
        }
    }

    async function searchUsers(query) {
        try {
            // setSearching(true);
            setLoading(true);
            
            const response = await axios.get(`http://localhost:5001/api/users/search?query=${query}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.accessToken}`
                },
            });
            setLoading(false);
            
            // setSearching(false);
            const formattedData = response.data.map((item) => ({
                id: item._id,
                name: item.name,
                email: item.email,
                contact:item.contact,
                city:item.city,
            }));
            setData(formattedData);
        } catch (error) {
            // setSearching(false);
            setLoading(false);

            setError(error.message);
            console.log(error);
        }
    }

    const debouncedSearch = useCallback(debounce((query) => {
        if (query) {
            searchUsers(query);
        } else {
            getData();
        }
    }, 500), []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    return (
        <Container maxWidth="lg" className="container my-2 text-center">
            {error && <div className="alert alert-danger">{error}</div>}

            <Grid container spacing={3} alignItems="center" justifyContent="space-between" style={{ marginBottom: "30px", marginTop: "10px" }}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" align="left" color="deepskyblue">
                        All Data
                    </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{ style: { height: '56px' } }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        variant="outlined"
                        color="info"
                        size="large"
                        fullWidth
                        style={{ height: '56px' }}
                        onClick={handleCreateUser}
                    >
                        Logout
                    </Button>
                </Grid>
            </Grid>

            {(loading || searching) ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <Audio
                        height="100"
                        width="100"
                        color='blue'
                        ariaLabel='loading'
                    />
                </Box>
            ) : (
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                </Box>

            )}
            <Fab color="primary" aria-label="add" onClick={() => navigate(`/adduser`)}>
                <AddIcon />
            </Fab>
            <ToastContainer />
        </Container>
    );
};

export default Users;
