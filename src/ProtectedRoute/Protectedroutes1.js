import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protectedroutes1 = () => {
  const isUserLogged = window.sessionStorage.getItem('isUserLogged');
  return (isUserLogged) ? <Outlet /> : <Navigate to='/LoginWarning' />
  return (
    <div>Protectedroutes1</div>
  )
}

export default Protectedroutes1