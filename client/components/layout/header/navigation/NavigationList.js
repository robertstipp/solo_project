import React from 'react'
import styled from 'styled-components'

import NavigationItem from './NavigationItem'

export const NavigationList = () => {
  const links = [
    {path: '/home', label: 'home', color: '--primary-red'},
    {path: '/about', label: 'about', color: '--primary-yellow'},
    {path: '/profile', label: 'profile', color: '--primary-blue'},
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