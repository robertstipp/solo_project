import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom';

import styled from 'styled-components'

import { useDispatch } from 'react-redux';
import Header from './header'
import Footer from './footer'


import {getMe} from '../../feature/user/userSlice'
const Layout = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getMe())
  },[])
  return (
    <Container>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  )
}


const Container = styled.div`
  display: grid;
  /* height: 90vh; */
  width: 100%;
  grid-template-rows: 20vh 70vh 10vh;
`
export default Layout