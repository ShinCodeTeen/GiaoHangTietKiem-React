import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ShopLogin from './pages/LoginPage/ShopLogin/index';
import ShipLogin from './pages/LoginPage/ShipLogin/index';
import AdminLogin from './pages/LoginPage/AdminLogin/index';
import ShopDH from './pages/ShipHome';
import LocalPage from './pages/LoginPage/Local';
import { appRoutes } from './routes';
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true'); 

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    sessionStorage.setItem('isLoggedIn', status.toString()); 
  };
  const navigate = useNavigate()

  const changeRoute =(urlRoute)=>{
      navigate(urlRoute)
  }
  return (
    <div className="app">
    
        <Routes>
          <Route path="/" element={<LocalPage/>} />
          <Route path="/shop_login" element={<ShopLogin onLogin={handleLogin} />} />
          <Route path="/ship_login" element={<ShipLogin onLogin={handleLogin} />} />
          <Route path="/admin_login" element={<AdminLogin onLogin={handleLogin} />} />
          {appRoutes.map((route, index)=>{
              const Layout = route.layout;
              const Page = route.component;
              return <Route key={index} path={route.path} element={
              <ProtectedRoute isLoggedIn={isLoggedIn}> 
                <Layout changeRoute={changeRoute}> 
                  <Page  changeRoute={changeRoute} /> 
                </Layout> 
              </ProtectedRoute>
              }/>
          })}
          
        </Routes>
    
    </div>
  );
}

export default App; 