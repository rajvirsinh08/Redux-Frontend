import { useSelector } from 'react-redux';
import './App.css';
import Login1 from './components/Login1';
import Logout1 from './components/Logout1';
import { selectUser } from './features/userSlice';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Users from './components/Users';
import Edituser from './components/Edituser';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
function App() {
  const user = useSelector(selectUser);
  return <BrowserRouter>
    <Routes>
      <Route index path="/" element={<SignUp />} />
      {/* <Route exact path="/users" element={<Users />} /> */}
      <Route exact path='/:id' element={<Edituser />} />
      <Route exact path="/signin" element={<SignIn />} />

      <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>

}
export default App;