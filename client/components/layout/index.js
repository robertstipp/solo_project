import React from 'react'
import {Outlet} from 'react-router-dom';

import styled from 'styled-components'

import Header from './header'
import Footer from './footer'

const Layout = () => {
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
  height: 90vh;
  width: 100%;
  grid-template-rows: 20% 60% 20%;
`
export default Layout