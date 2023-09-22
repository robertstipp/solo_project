import React from 'react'
import styled from 'styled-components'

const Logo = () => {
  return (
    <div>
      <LogoText>Sonar</LogoText>

    </div>
  )
}

const LogoText = styled.h1`
  font-family: var(--primary-font);
  font-size: 4.5rem;
`

export default Logo