import React from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux' 

import NavigationList from './navigation/NavigationList'
import Logo from './logo/Logo'
const Header = () => {
  const {userInfo} = useSelector((state)=>state.user)
  return (
    <HeaderContainer>
      <Logo/>
      {userInfo && <NavigationList />}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default Header