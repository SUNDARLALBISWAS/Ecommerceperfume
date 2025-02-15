import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Header from '../Layout/Header/Header';
import Home from '../Home/Home';
import About from '../About/About';
import Register from '../Component/Register/Register';
import Login from '../Component/Login/Login';
import Profile from '../Component/Profile/Profile';
import AllProduct from '../AllProduct/AllProduct';
import AdminDashboard from '../Admin/AdminDashboard';
import AddProduct from '../Admin/AddProduct/AddProduct';
import AddtoCart from '../AllProduct/Product/AddtoCart/AddtoCart';
import Product from '../AllProduct/Product/Product';
import Contact from '../Contact/Contact';
import Videopage from '../Video/Videopage';
import Footer from '../Layout/Footer/Footer';
import Editproduct from '../Admin/AddProduct/Editproduct/Editproduct';
import PageNotFound from '../PNF/PageNotFound';
import Protectedroutes from '../ProtectedRoute/Protectedroutes';
import LoginWarning from '../Warning/LoginWarning';
import Protectedroutes1 from '../ProtectedRoute/Protectedroutes1';

const Routing = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Video' element={<Videopage />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route element={<Protectedroutes />}>
          <Route path='/Profile/:id' element={<Profile />} />
        </Route>
        <Route element={<Protectedroutes1 />}>
          <Route path='/AddtoCart' element={<AddtoCart />} />
        <Route />
        </Route>
        <Route path='/AllProduct' element={<AllProduct />} />
        <Route path='/Singleproduct/:id' element={<Product />} />
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/AddProduct' element={<AddProduct />} />
        <Route path='/Editpage/:id' element={<Editproduct />} />
        <Route path='/Footer' element={<Footer />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/LoginWarning' element={<LoginWarning />} />
      </Routes>
    </Router>
  )
}

export default Routing