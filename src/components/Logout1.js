import React from 'react'
import "./Logout.css"
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../features/userSlice';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
function Logout1() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logout());
        navigate('/')
    }
    return (
        <div className='logout'>

            <h1>Welcome  <span className='user_name'>{user.name}</span><br />
                <span className='user_name'>{user.email}</span><br />
                <Button className='logout_button' type="submit"
                    color="primary"
                    variant="contained"
                    style={{ marginTop: "15px" }} onClick={(e) => handleLogout(e)}> Logout</Button>
            </h1>

        </div>
    )
}

export default Logout1