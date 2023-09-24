import React from 'react'

import styled from 'styled-components'
import ColoredText from '../typography/ColoredText'



const Welcome = ({message,name}) => {
  return (
      <Text>
        <ColoredText text={message}/>
      </Text>
    
  )
}



const Text = styled.h5`
  font-family: var(--primary-font);
  font-size: 3.5rem;
  background: transparent;
  margin:0
`

export default Welcome