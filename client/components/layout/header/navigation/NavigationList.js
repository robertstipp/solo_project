import React from 'react'
import styled from 'styled-components'

import NavigationItem from './NavigationItem'

export const NavigationList = () => {
  const links = [
    {path: '/home', label: 'home', color: '#dd0100'},
    {path: '/about', label: 'about', color: '#fac901'},
    {path: '/profile', label: 'profile', color: '#225095'},
  ]
  return (
    <Container>
      {links.map((link, index) => (
          <NavigationItem key={index} path={link.path} label={link.label} color={link.color}/>
        )
      )}
    </Container>
  )
}

const Container = styled.ul`
  display: flex;
  gap: 10px;
`

export default NavigationList