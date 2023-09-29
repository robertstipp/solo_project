import React from 'react'
import styled from 'styled-components'

import NavigationItem from './NavigationItem'

export const NavigationList = () => {
  const links = [
    {path: '/home', label: 'home', color: '--primary-red'},
    {path: '/data', label: 'data', color: '--primary-yellow'},
    {path: '/genres', label: 'genres', color: '--primary-blue'},
    {path: '/find', label: 'find', color: '--primary-red'},
  ]
  return (
    <Container>
      {links.map((link, index) => (
          <NavigationItem key={index} index={index} path={link.path} label={link.label} color={link.color}/>
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