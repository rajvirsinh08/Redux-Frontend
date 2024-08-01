// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { logout, selectUser } from "../features/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import axios from "axios";
// import axiosInstance from "./axiosInstance";
// import { Audio } from 'react-loader-spinner';
// const Users = () => {
//     const [data, setData] = useState();
//     const [error, setError] = useState();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const user = useSelector(selectUser);
//     // const baseUrl = process.env.REACT_APP_BASE_URL;

//     const handleCreateUser = (e) => {
//         e.preventDefault();
//         confirmAlert({
//             title: 'Confirm to logout',
//             message: 'Are you sure?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: () => {
//                         dispatch(logout());
//                         navigate('/signin');
//                     }
//                 },
//                 {
//                     label: 'No',
//                     onClick: () => {
//                         // toast.info("Logout cancelled");
//                     }
//                 }
//             ]
//         });
//     };
//     useEffect(() => {
//         getData()
//     }, []);
//     async function getData() {
//         try {
//             const response = await axiosInstance.get(`/get`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${user.accessToken}`
//                 },
//             });
//             setData(response.data);
//         } catch (error) {
//             setError(error.message);
//             console.log(error);
//         }
//     }

//     // async function getData() {
//     //     debugger
//     //     const response = await axios.get("http://localhost:5001/get", {
//     //         // method: "GET",
//     //         headers: {
//     //             "Content-Type": "application/json",
//     //             'Authorization': `Bearer ${user.accessToken}`
//     //         },
//     //     });
//     //     const result = await response.json();

//     //     if (!response.ok) {
//     //         console.log(result.error);
//     //         setError(result.error);
//     //     }
//     //     if (response.ok) {
//     //         setData(result);
//     //     }
//     // }
//     const handleDelete = async (id) => {
//         try {
//             await axiosInstance.delete(`/delete/${id}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${user.accessToken}`
//                 },
//             });
//             setError("Deleted successfully");
//             setTimeout(() => {
//                 setError("");
//                 getData();
//             }, 1000);
//         } catch (error) {
//             setError(error.message);
//             console.log(error);
//         }
//     };



//     return (
//         <div className="container my-2 text-center ">
//             {error && <div className="alert alert-danger">{error}</div>}

//             <div className="row">
//                 <h1
//                     className="col-md-10" style={{ textAlign: "left", fontSize: 40, color: "deepskyblue" }}
//                 >
//                     All Data
//                 </h1>
//                 <button type="button" style={{ fontSize: 20 }} className="col-md-2 btn btn-outline-info" onClick={handleCreateUser}>Logout</button>
//             </div>

//             <div className="row">
//                 {data
//                     ?.slice()
//                     .reverse()
//                     .map((eLe) => (
//                         <div
//                             key={eLe.id}
//                             className="card"
//                             style={{ width: "18rem", marginRight: "20px", marginTop: "15px" }}
//                         >
//                             {/* <img
//                                 className="card-img-top"
//                                 src={eLe.image}
//                                 alt="Card image cap"
//                                 width="120px"
//                                 height="150px"
//                             /> */}
//                             <div className="card-body">
//                                 <h5 className="card-title">{eLe.name}</h5>
//                                 <h5 className="card-title">{eLe.email}</h5>
//                                 <Link
//                                     to={`/${eLe._id}`}
//                                     style={{ marginRight: "10px" }}
//                                     className="btn btn-outline-secondary"
//                                 >
//                                     Edit
//                                 </Link>
//                                 <a
//                                     className="btn btn-outline-danger"
//                                     onClick={() => handleDelete(eLe._id)}
//                                 >
//                                     Delete
//                                 </a>
//                             </div>
//                         </div>
//                     ))}
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Users;
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { logout, selectUser } from "../features/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import axiosInstance from "./axiosInstance";
// import { Audio } from 'react-loader-spinner'; // Import spinner

// const Users = () => {
//     const [data, setData] = useState();
//     const [error, setError] = useState();
//     const [loading, setLoading] = useState(false); // Loading state
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const user = useSelector(selectUser);
//     const handleDeleteAlert=(id)=>{

//         confirmAlert({
//             title: 'Confirm to Delete',
//             message: 'Are you sure want to delete this data?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: async() => {
//                         try {
//                             // setLoading(true); // Start loading
//                             await axiosInstance.delete(`/delete/${id}`, {
//                                 headers: {
//                                     "Content-Type": "application/json",
//                                     'Authorization': `Bearer ${user.accessToken}`
//                                 },
//                             });
//                             // setLoading(false); // Stop loading
//                             setError("Deleted successfully");
//                             setTimeout(() => {
//                                 setError("");
//                                 getData();
//                             }, 1000);
//                         } catch (error) {
//                             setLoading(false); // Stop loading in case of error
//                             setError(error.message);
//                             console.log(error);
//                         }
//                 }},
//                 {
//                     label: 'No',
//                     onClick: () => {
//                         getData();
//                     }
//                 }
//             ]
//         });
//     }
//     const handleCreateUser = (e) => {
//         e.preventDefault();
//         confirmAlert({
//             title: 'Confirm to logout',
//             message: 'Are you sure want to logout?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: () => {
//                         dispatch(logout());
//                         navigate('/signin');
//                     }
//                 },
//                 {
//                     label: 'No',
//                     onClick: () => {
//                         // toast.info("Logout cancelled");
//                     }
//                 }
//             ]
//         });
//     };

//     useEffect(() => {
//         getData();
//     }, []);

//     async function getData() {
//         try {
//             setLoading(true); // Start loading
//             const response = await axiosInstance.get(`/get`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${user.accessToken}`
//                 },
//             });
//             setLoading(false); // Stop loading
//             setData(response.data);
//         } catch (error) {
//             setLoading(false); // Stop loading in case of error
//             setError(error.message);
//             console.log(error);
//         }
//     }

//     const handleDelete = async (id) => {
//         try {
//             setLoading(true); // Start loading
//             await axiosInstance.delete(`/delete/${id}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${user.accessToken}`
//                 },
//             });
//             setLoading(false); // Stop loading
//             setError("Deleted successfully");
//             setTimeout(() => {
//                 setError("");
//                 getData();
//             }, 1000);
//         } catch (error) {
//             setLoading(false); // Stop loading in case of error
//             setError(error.message);
//             console.log(error);
//         }
//     };

//     return (
//         <div className="container my-2 text-center ">
//             {error && <div className="alert alert-danger">{error}</div>}

//             <div className="row">
//                 <h1
//                     className="col-md-10" style={{ textAlign: "left", fontSize: 40, color: "deepskyblue" }}
//                 >
//                     All Data
//                 </h1>
//                 <button type="button" style={{ fontSize: 20 }} className="col-md-2 btn btn-outline-info" onClick={handleCreateUser}>Logout</button>
//             </div>

//             {loading ? (
//                 <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
//                     <Audio
//                         height="100"
//                         width="100"
//                         color='blue'
//                         ariaLabel='loading'
//                     />
//                 </div>
//             ) : (
//                 <div className="row">
//                     {data
//                         ?.slice()
//                         .reverse()
//                         .map((eLe) => (
//                             <div
//                                 key={eLe.id}
//                                 className="card"
//                                 style={{ width: "18rem", marginRight: "20px", marginTop: "15px" }}
//                             >
//                                 {/* <img
//                                     className="card-img-top"
//                                     src={eLe.image}
//                                     alt="Card image cap"
//                                     width="120px"
//                                     height="150px"
//                                 /> */}
//                                 <div className="card-body">
//                                     <h5 className="card-title">{eLe.name}</h5>
//                                     <h5 className="card-title">{eLe.email}</h5>
//                                     <Link
//                                         to={`/edituser/${eLe._id}`}
//                                         style={{ marginRight: "10px" }}
//                                         className="btn btn-outline-secondary"
//                                     >
//                                         Edit
//                                     </Link>
//                                     <a
//                                         className="btn btn-outline-danger"
//                                         onClick={() => handleDeleteAlert(eLe._id)}
//                                     >
//                                         Delete
//                                     </a>
//                                 </div>
//                             </div>
//                         ))}
//                 </div>
//             )}
//             <ToastContainer />
//         </div>
//     );
// };      

// export default Users;
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { logout, selectUser } from "../features/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import axiosInstance from "./axiosInstance";
// import { Audio } from 'react-loader-spinner'; // Import spinner
// import { DataGrid } from '@mui/x-data-grid';
// import { Box } from "@mui/system";


// const Users = () => {
//     const [data, setData] = useState();
//     const [error, setError] = useState();
//     const [loading, setLoading] = useState(false); // Loading state
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const user = useSelector(selectUser);
//     const columns = [
//         { field: 'id', headerName: 'ID', width: 90 },
//         {
//             field: 'userName',
//             headerName: 'Name',
//             width: 150,
//             editable: true,
//         },
//         {
//             field: 'userEmail',
//             headerName: 'Email',
//             width: 150,
//             editable: true,
//         },
//         {
//             field: 'buttons',
//             headerName: 'Actions',
//             type: 'button',
//             width: 220,
//             editable: false,
//         },
//         // {
//         //   field: 'fullName',
//         //   headerName: 'Full name',
//         //   description: 'This column has a value getter and is not sortable.',
//         //   sortable: false,
//         //   width: 160,
//         //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//         // },
//     ];
//     const rows = [
//         { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
//         { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//         { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//         { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//         { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//         { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//         { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//         { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//         { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//       ];
//     const handleDeleteAlert = (id) => {

//         confirmAlert({
//             title: 'Confirm to Delete',
//             message: 'Are you sure want to delete this data?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: async () => {
//                         try {
//                             // setLoading(true); // Start loading
//                             await axiosInstance.delete(`/delete/${id}`, {
//                                 headers: {
//                                     "Content-Type": "application/json",
//                                     'Authorization': `Bearer ${user.accessToken}`
//                                 },
//                             });
//                             // setLoading(false); // Stop loading
//                             setError("Deleted successfully");
//                             setTimeout(() => {
//                                 setError("");
//                                 getData();
//                             }, 1000);
//                         } catch (error) {
//                             setLoading(false); // Stop loading in case of error
//                             setError(error.message);
//                             console.log(error);
//                         }
//                     }
//                 },
//                 {
//                     label: 'No',
//                     onClick: () => {
//                         getData();
//                     }
//                 }
//             ]
//         });
//     }
//     const handleCreateUser = (e) => {
//         e.preventDefault();
//         confirmAlert({
//             title: 'Confirm to logout',
//             message: 'Are you sure want to logout?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: () => {
//                         dispatch(logout());
//                         navigate('/signin');
//                     }
//                 },
//                 {
//                     label: 'No',
//                     onClick: () => {
//                         // toast.info("Logout cancelled");
//                     }
//                 }
//             ]
//         });
//     };

//     useEffect(() => {
//         getData();
//     }, []);

//     async function getData() {
//         try {
//             setLoading(true); // Start loading
//             const response = await axiosInstance.get(`/get`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${user.accessToken}`
//                 },
//             });
//             setLoading(false); // Stop loading
//             setData(response.data);
//         } catch (error) {
//             setLoading(false); // Stop loading in case of error
//             setError(error.message);
//             console.log(error);
//         }
//     }

//     const handleDelete = async (id) => {
//         try {
//             setLoading(true); // Start loading
//             await axiosInstance.delete(`/delete/${id}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${user.accessToken}`
//                 },
//             });
//             setLoading(false); // Stop loading
//             setError("Deleted successfully");
//             setTimeout(() => {
//                 setError("");
//                 getData();
//             }, 1000);
//         } catch (error) {
//             setLoading(false); // Stop loading in case of error
//             setError(error.message);
//             console.log(error);
//         }
//     };

//     return (
//         <div className="container my-2 text-center ">
//             {error && <div className="alert alert-danger">{error}</div>}

//             <div className="row">
//                 <h1
//                     className="col-md-10" style={{ textAlign: "left", fontSize: 40, color: "deepskyblue" }}
//                 >
//                     All Data
//                 </h1>
//                 <button type="button" style={{ fontSize: 20 }} className="col-md-2 btn btn-outline-info" onClick={handleCreateUser}>Logout</button>
//             </div>

//             {loading ? (
//                 <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
//                     <Audio
//                         height="100"
//                         width="100"
//                         color='blue'
//                         ariaLabel='loading'
//                     />
//                 </div>
//             ) : (
//                 <Box sx={{ height: 400, width: '100%' }}>
//                     <DataGrid
//                         rows={rows}
//                         columns={columns}
//                         initialState={{
//                             pagination: {
//                                 paginationModel: {
//                                     pageSize: 5,
//                                 },
//                             },
//                         }}
//                         pageSizeOptions={[5]}
//                         checkboxSelection
//                         disableRowSelectionOnClick
//                     />
//                 </Box>
//                 // <div className="row">
                    // {data
                    //     ?.slice()
                    //     .reverse()
//                 //         .map((eLe) => (
//                 //             <div
//                 //                 key={eLe.id}
//                 //                 className="card"
//                 //                 style={{ width: "18rem", marginRight: "20px", marginTop: "15px" }}
//                 //             >
//                 //                 {/* <img
//                 //                     className="card-img-top"
//                 //                     src={eLe.image}
//                 //                     alt="Card image cap"
//                 //                     width="120px"
//                 //                     height="150px"
//                 //                 /> */}
//                 //                 <div className="card-body">
//                 //                     <h5 className="card-title">{eLe.name}</h5>
//                 //                     <h5 className="card-title">{eLe.email}</h5>
//                 //                     <Link
//                 //                         to={`/edituser/${eLe._id}`}
//                 //                         style={{ marginRight: "10px" }}
//                 //                         className="btn btn-outline-secondary"
//                 //                     >
//                 //                         Edit
//                 //                     </Link>
//                 //                     <a
//                 //                         className="btn btn-outline-danger"
//                 //                         onClick={() => handleDeleteAlert(eLe._id)}
//                 //                     >
//                 //                         Delete
//                 //                     </a>
//                 //                 </div>
//                 //             </div>
//                 //         ))}
//                 // </div>
//             )}
//             <ToastContainer />
//         </div>
//     );
// };

// export default Users;
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { logout, selectUser } from "../features/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import axiosInstance from "./axiosInstance";
// import { Audio } from 'react-loader-spinner';
// import { DataGrid } from '@mui/x-data-grid';
// import { Box } from "@mui/system";
// import { Button } from "@mui/material";

// const Users = () => {
//     const [data, setData] = useState([]);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const user = useSelector(selectUser);

//     const columns = [
//         // { field: 'id', headerName: 'ID', width: 90 },
//         { field: 'name', headerName: 'Name',sortable: false, width: 450, editable: false },
//         { field: 'email', headerName: 'Email',sortable: false, width: 450, editable: false },
//         {
//             field: 'actions',
//             headerName: 'Actions',
//             width: 200,
//             sortable: false,
//             renderCell: (params) => {
//                 return (
//                     <div>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             size="small"
//                             style={{ marginRight: 16 }}
//                             onClick={() => navigate(`/edituser/${params.row.id}`)}
//                         >
//                             Edit
//                         </Button>
//                         <Button
//                             variant="contained"
//                             color="secondary"
//                             size="small"
//                             onClick={() => handleDeleteAlert(params.row.id)}
//                         >
//                             Delete
//                         </Button>
//                     </div>
//                 );
//             },
//         },
//     ];

//     const handleDeleteAlert = (id) => {
//         confirmAlert({
//             title: 'Confirm to Delete',
//             message: 'Are you sure want to delete this data?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: async () => {
//                         try {
//                             setLoading(true);
//                             await axiosInstance.delete(`/delete/${id}`, {
//                                 headers: {
//                                     "Content-Type": "application/json",
//                                     'Authorization': `Bearer ${user.accessToken}`
//                                 },
//                             });
//                             setLoading(false);
//                             setError("Deleted successfully");
//                             setTimeout(() => {
//                                 setError("");
//                                 getData();
//                             }, 1000);
//                         } catch (error) {
//                             setLoading(false);
//                             setError(error.message);
//                             console.log(error);
//                         }
//                     }
//                 },
//                 {
//                     label: 'No',
//                 }
//             ]
//         });
//     };

//     const handleCreateUser = (e) => {
//         e.preventDefault();
//         confirmAlert({
//             title: 'Confirm to logout',
//             message: 'Are you sure want to logout?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: () => {
//                         dispatch(logout());
//                         navigate('/signin');
//                     }
//                 },
//                 {
//                     label: 'No',
//                 }
//             ]
//         });
//     };

//     useEffect(() => {
//         getData();
//     }, []);

//     async function getData() {
//         try {
//             setLoading(true);
//             const response = await axiosInstance.get(`/get`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${user.accessToken}`
//                 },
//             });
//             setLoading(false);
//             const formattedData = response.data.map((item, index) => ({
//                 id: item._id,
//                 name: item.name,
//                 email: item.email,
//             }));
//             setData(formattedData);
//         } catch (error) {
//             setLoading(false);
//             setError(error.message);
//             console.log(error);
//         }
//     }

//     return (
//         <div className="container my-2 text-center ">
//             {error && <div className="alert alert-danger">{error}</div>}

//             <div className="row" style={{marginBottom:"50px"}}>
//                 <h1
//                     className="col-md-10" style={{ textAlign: "left", fontSize: 40, color: "deepskyblue" }}
//                 >
//                     All Data
//                 </h1>
//                 <button type="button" style={{ fontSize: 20 }} className="col-md-2 btn btn-outline-info" onClick={handleCreateUser}>Logout</button>
//             </div>

//             {loading ? (
//                 <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
//                     <Audio
//                         height="100"
//                         width="100"
//                         color='blue'
//                         ariaLabel='loading'
//                     />
//                 </div>
//             ) : (
//                 <Box sx={{ height: 400, width: '100%' }}>
//                     <DataGrid
//                         rows={data}
//                         columns={columns}
//                         initialState={{
//                             pagination: {
//                                 paginationModel: {
//                                     pageSize: 5,
//                                 },
//                             },
//                         }}
//                         pageSizeOptions={[5]}
//                         // checkboxSelection
//                         disableRowSelectionOnClick
//                     />
//                 </Box>
//             )}
//             <ToastContainer />
//         </div>
//     );
// };

// export default Users;
import React, { useState, useEffect } from "react";
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
import { Button } from "@mui/material";

const Users = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const columns = [
        { field: 'name', headerName: 'Name', sortable: false, width: 450, editable: false },
        { field: 'email', headerName: 'Email', sortable: false, width: 450, editable: false },
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
            message: 'Are you sure want to delete this data?',
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
            message: 'Are you sure want to logout?',
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
            }));
            // Reverse the data to show newest users first
            setData(formattedData.reverse());
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.log(error);
        }
    }

    return (
        <div className="container my-2 text-center ">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row" style={{ marginBottom: "50px",marginTop:"20px" }}>
                <h1
                    className="col-md-10" style={{ textAlign: "left", fontSize: 40, color: "deepskyblue" }}
                >
                    All Data
                </h1>
                <button type="button" style={{ fontSize: 20 }} className="col-md-2 btn btn-outline-info" onClick={handleCreateUser}>Logout</button>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                    <Audio
                        height="100"
                        width="100"
                        color='blue'
                        ariaLabel='loading'
                    />
                </div>
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
            <ToastContainer />
        </div>
    );
};

export default Users;
