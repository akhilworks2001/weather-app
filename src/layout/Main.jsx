import React from 'react';
import { Route, Routes } from 'react-router';

import Home from "../pages/Home";
import Pagenotfound from "../pages/Pagenotfound";
import Weather from '../pages/Weather';

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather/:lat/:lon" element={<Weather />} />

      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  )
}
