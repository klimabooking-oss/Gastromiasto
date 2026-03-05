import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import B2CLayout from './layouts/B2CLayout';
import B2BLayout from './layouts/B2BLayout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/b2c/Home';
import Menu from './pages/b2c/Menu';
import Checkout from './pages/b2c/Checkout';

import Dashboard from './pages/b2b/Dashboard';
import Terminal from './pages/b2b/Terminal';
import MenuEditor from './pages/b2b/MenuEditor';
import Zones from './pages/b2b/Zones';
import Finance from './pages/b2b/Finance';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* B2C Routes */}
        <Route path="/home" element={<B2CLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* B2B Routes */}
        <Route path="/b2b" element={<B2BLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="terminal" element={<Terminal />} />
          <Route path="menu-editor" element={<MenuEditor />} />
          <Route path="zones" element={<Zones />} />
          <Route path="finance" element={<Finance />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
