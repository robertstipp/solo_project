import React from 'react'
import styled from 'styled-components'

import NavigationList from './navigation/NavigationList'
import Logo from './logo/Logo'
const Header = () => {
  return (
    <HeaderContainer>
      <Logo/>
      <NavigationList />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default Header