import React from 'react'
import styled from 'styled-components'
import NavigationList from './navigation/NavigationList'

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Sonar</h1>
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