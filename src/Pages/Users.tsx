import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { logout, selectUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axiosInstance from "../components/axiosInstance";
import { Audio } from "react-loader-spinner";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button, Typography, Container, Grid, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
// import debounce from "lodash.debounce";
// import axios from "axios";

interface Task{
  id:string;
  name:string;
  describe:string;
}
interface ApiResponseItem {
  _id: string;
  name: string;
  describe: string;
}
const Users = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [name, setTaskname] = useState("");
  const [describe, setDescribe] = useState("");

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);

  // const [editingTask, setEditingTask] = useState(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleClickOpen = (task:Task|null = null) => {
    setEditingTask(task);
    setIsEditing(!!task);
    setTaskname(task ? task.name : "");
    setDescribe(task ? task.describe : "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskname("");
    setDescribe("");
    setEditingTask(null);
  };

  const handleSubmit = async (e:React.FormEvent) => {
    debugger;
    e.preventDefault();
    const taskData = { name, describe };

    setLoading(true);
    try {
      if (isEditing) {
        await axiosInstance.patch(
          `/task/updatetask/${editingTask?.id}`,
          taskData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        
        toast.success("Task updated successfully");
      } else {
        await axiosInstance.post(`/task/addtask`, taskData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        toast.success("Task added successfully");
      }

      handleClose();
      getData();
    } catch (error) {
      toast.error("Failed to save task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Task Name", width: 225 },
    { field: "describe", headerName: "Description", width: 225 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 16 }}
            onClick={() => handleClickOpen(params.row)}
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

  // const columns = [
  //   { field: "name", headerName: "Task Name", width: 225 },
  //   { field: "describe", headerName: "Description", width: 225 },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     width: 200,
  //     renderCell: (params) => (
  //       <div>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           size="small"
  //           style={{ marginRight: 16 }}
  //           onClick={() => handleClickOpen(params.row)}
  //         >
  //           Edit
  //         </Button>
  //         <Button
  //           variant="contained"
  //           color="error"
  //           size="small"
  //           onClick={() => handleDeleteAlert(params.row.id)}
  //         >
  //           Delete
  //         </Button>
  //       </div>
  //     ),
  //   },
  // ];

  const handleDeleteAlert = (id:string) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure you want to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              setLoading(true);
              await axiosInstance.delete(`/task/deletetask/${id}`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.accessToken}`,
                },
              });
              setError("Deleted successfully");
              setTimeout(() => {
                setError("");
                getData();
              }, 1000);
            } catch (error:any) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  const handleCreateUser = async (e:React.FormEvent) => {
    e.preventDefault();
    confirmAlert({
      title: "Confirm to logout",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axiosInstance.post(
                `users/logout`,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.accessToken}`,
                  },
                }
              );
              dispatch(logout());
              navigate("/signin", { replace: true });
            } catch (error:any) {
              setError(error.message);
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/task/alltask`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      const formattedData = response.data
        .map((item:ApiResponseItem) => ({
          id: item._id,
          name: item.name,
          describe: item.describe,
        }))
        .reverse();
      setData(formattedData);
    } catch (error:any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // const searchUsers = async (query:string) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `http://localhost:5001/api/users/search?query=${query}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${user.accessToken}`,
  //         },
  //       }
  //     );
  //     const formattedData = response.data.map((item) => ({
  //       id: item._id,
  //       Name: item.Name,
  //       describe: item.describe,
  //     }));
  //     setData(formattedData);
  //   } catch (error:any) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const debouncedSearch = useCallback(
  //   debounce((query:string) => {
  //     if (query) {
  //       searchUsers(query);
  //     } else {
  //       getData();
  //     }
  //   }, 500),
  //   []
  // );

  // const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);
  //   debouncedSearch(value);
  // };

  return (
    <Container maxWidth="lg" className="container my-2 text-center">
      {error && <div className="alert alert-danger">{error}</div>}

      <Grid
      role="dashboard"
        container
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
        style={{ marginBottom: "30px", marginTop: "10px" }}
      >
        <Grid item xs={12} md={6}>
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
            // onChange={handleSearchChange}
            InputProps={{ style: { height: "56px" } }}
            aria-label="search task"
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="outlined"
            onClick={() => handleClickOpen()}
            style={{ height: "56px" }}
            size="large"
            fullWidth
            color="info"
            aria-label="add new task"
          >
            Add Task
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEditing ? "Edit Task" : "Add Task"}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="task-name"
                label="Task Name"
                type="text"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => setTaskname(e.target.value)}
                aria-required="true"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="task-describe"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
                aria-required="true"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} aria-label="Cancel">Cancel</Button>
              <Button type="submit" onClick={handleSubmit} aria-label={isEditing ? "Update task" : "Add task"}>
                {isEditing ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        {/* <Grid item xs={12} md={2}>
          <Button
            variant="outlined"
            color="info"
            size="large"
            fullWidth
            style={{ height: "56px" }}
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
        </Grid> */}
        <Grid item xs={12} md={2}>
          <Button
            variant="outlined"
            color="info"
            size="large"
            fullWidth
            style={{ height: "56px" }}
            onClick={handleCreateUser}
            aria-label="Logout"
          >
            Logout
          </Button>
        </Grid>
      </Grid>

      {loading || searching ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Audio height="100" width="100" color="blue" ariaLabel="loading" />
        </Box>
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Users;
