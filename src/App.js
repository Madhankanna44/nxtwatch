// App.js

import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NotFound from './components/NotFound'
import LoginForm from './components/LoginForm'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App
