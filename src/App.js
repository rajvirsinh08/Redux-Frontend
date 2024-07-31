import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { selectUser } from './features/userSlice';
import PrivateRoute from './components/PrivateRoute';
import Users from './components/Users';
import Edituser from './components/Edituser';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Not_found from './components/Not_found';
import './App.css';

function App() {
  const user = useSelector(selectUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<SignUp />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        <Route exact path="/edituser/:id" element={<Edituser />} />
        <Route path="*" element={<Not_found />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
