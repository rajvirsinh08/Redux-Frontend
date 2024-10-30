import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { selectUser } from 'store/userSlice';
import PrivateRoute from 'components/PrivateRoute';
import Users from 'Pages/Users';
import SignIn from 'Pages/SignIn';
import Not_found from 'Pages/Not_found';
import 'App.css';
import SignUp from 'Pages/SignUp';

function App() {
  const user = useSelector(selectUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Not_found />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
