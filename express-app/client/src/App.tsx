import './App.css';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import Home from './components/Home';
import Header from './components/Header';

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/home' element={ <Home /> } />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
