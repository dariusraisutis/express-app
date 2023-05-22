import './App.css';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import Home from './components/Home';
import Header from './components/Header';
import ProductPage from './components/ProductPage';
import ProductContainer from './components/ProductContainer';
import Products from './components/Products';

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
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/home' element={ <Home /> } />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='products' element={ <Products />}>
              <Route path=':id' element={ <ProductPage  />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
