import React, { useEffect, useState } from 'react';
import {createRoot} from 'react-dom/client'
import styled from 'styled-components'
import GlobalStyles from './assets/css/GlobalStyles'

import Layout from './components/layout'
import Data from './pages/Data';
import Home from './pages/Home';
import Genres from './pages/Genres';
import LandingPage from './pages/LandingPage';
import Find from './pages/Find';

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
      <Route path='genres' Component={Genres}/>
      <Route path='data' Component={Data}/>
      <Route path='find' Component={Find}/>
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
  /* display: grid; */
  /* max-height: 100vh; */
  /* place-items: center; */
` 

export default App