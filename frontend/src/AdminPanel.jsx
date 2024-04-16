import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/admin/Navbar/Navbar1'
import Admin from './pages/Admin/Admin1'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Admin/>
    </div>
  )
}

export default App