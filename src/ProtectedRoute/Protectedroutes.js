import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protectedroutes = () => {
  const isUserLogged = window.sessionStorage.getItem('isUserLogged')
  return (isUserLogged) ? <Outlet /> : <Navigate to='/PageNotFound' />
}

export default Protectedroutes;