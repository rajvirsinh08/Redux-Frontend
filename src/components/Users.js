import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";
import axiosInstance from "./axiosInstance";

const Users = () => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(selectUser);
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const handleCreateUser = (e) => {
        e.preventDefault();
        confirmAlert({
            title: 'Confirm to logout',
            message: 'Are you sure?',
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
                    onClick: () => {
                        // toast.info("Logout cancelled");
                    }
                }
            ]
        });
    };
    useEffect(() => {
        getData()
    }, []);
    async function getData() {
        try {
            const response = await axiosInstance.get(`${baseUrl}/get`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.accessToken}`
                },
            });
            setData(response.data);
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    }

    // async function getData() {
    //     debugger
    //     const response = await axios.get("http://localhost:5001/get", {
    //         // method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             'Authorization': `Bearer ${user.accessToken}`
    //         },
    //     });
    //     const result = await response.json();

    //     if (!response.ok) {
    //         console.log(result.error);
    //         setError(result.error);
    //     }
    //     if (response.ok) {
    //         setData(result);
    //     }
    // }
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`${baseUrl}/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.accessToken}`
                },
            });
            setError("Deleted successfully");
            setTimeout(() => {
                setError("");
                getData();
            }, 1000);
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };



    return (
        <div className="container my-2 text-center ">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                <h1
                    className="col-md-10" style={{ textAlign: "left", fontSize: 40, color: "deepskyblue" }}
                >
                    All Data
                </h1>
                <button type="button" style={{ fontSize: 20 }} className="col-md-2 btn btn-outline-info" onClick={handleCreateUser}>Logout</button>
            </div>
            <div className="row">
                {data
                    ?.slice()
                    .reverse()
                    .map((eLe) => (
                        <div
                            key={eLe.id}
                            className="card"
                            style={{ width: "18rem", marginRight: "20px", marginTop: "15px" }}
                        >
                            <img
                                className="card-img-top"
                                src={eLe.image}
                                alt="Card image cap"
                                width="120px"
                                height="150px"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{eLe.name}</h5>
                                <h5 className="card-title">{eLe.email}</h5>
                                <Link
                                    to={`/${eLe._id}`}
                                    style={{ marginRight: "10px" }}
                                    className="btn btn-outline-secondary"
                                >
                                    Edit
                                </Link>
                                <a
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(eLe._id)}
                                >
                                    Delete
                                </a>
                            </div>
                        </div>
                    ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Users;
