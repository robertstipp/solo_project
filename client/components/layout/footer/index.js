import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterText>Made by Bobby. </FooterText>
  )
}

const FooterText = styled.h5`
  font-family: var(--primary-font);
  font-size: 4.5rem;
`

export default Footer