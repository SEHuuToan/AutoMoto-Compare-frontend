import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Model from '../pages/Model';
import Experience from '../pages/Experience';
import ServiceSupport from '../pages/ServiceSupport';
const AppRoutes: React.FC = () => {

  return (
        <Router>
              <Routes>
              <Route path='/login' element={ <Login />} />
                <Route element={<MainLayout />}>
                  <Route path='/' element={ <Home />} />
                  <Route path='/model' element={ <Model />} />
                  <Route path='/experience' element={ <Experience />} />
                  <Route path='/service-support' element={ <ServiceSupport />} />
                </Route>
              </Routes> 
        </Router>
  )
}

export default AppRoutes
