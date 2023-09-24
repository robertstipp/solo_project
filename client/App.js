import React, { useEffect, useState } from 'react';
import {createRoot} from 'react-dom/client'
import styled from 'styled-components'
import GlobalStyles from './assets/css/GlobalStyles'

import Layout from './components/layout'
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  BrowserRouter,
  Link
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' Component={Layout}>
      <Route index Component={LandingPage}/>
      <Route path='home' Component={Home}/>
      <Route path='profile' Component={Profile}/>
      <Route path='about' Component={About}/>
    </Route>
  )
)


const App = () => {
  return (
    <Container>
      <GlobalStyles />
      <RouterProvider router={router}></RouterProvider>
    </Container>
  )
}


const Container = styled.div`
  max-width: 1500px;
  margin: 1rem 3rem;
  display: grid;
  max-height: 100vh;
  place-items: center;
` 

export default App