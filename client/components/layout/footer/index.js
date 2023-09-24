import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Container>
      <FooterText>Made by Bobby.</FooterText>
    </Container>
    
  )
}

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start
`

const FooterText = styled.div`
  font-family: var(--primary-font);
  font-size: 4.3rem;
`



export default Footer