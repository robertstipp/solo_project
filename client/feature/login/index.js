import React, { useState } from 'react'
import styled, {keyframes} from 'styled-components'

import Sketch from './sketch'
import ColorText from '../../components/typography/ColoredText'
const Login = () => {

  const [isHovered, setIsHovered] = useState(false)
  const [labelText, setLabeledText] = useState("Hover Swarm")

  const handleHover = () => {{
  }}
  return (
    <Container onMouseOver={()=>setIsHovered(true)}>
      <Sketch />
      <ColoredText text={labelText} />
      {isHovered && <ColoredText text="Then Click" />}
    </Container>
  )
}

const ColoredText = ({text}) => {
  const colors = ['#dd0100', '#fac901','#225095'];
  return (
    <Text>
      {text.split("").map((char, index) => (
        <span key={index} style={{color: colors[index % colors.length]}}>
          {char}
        </span>
      ))}
    </Text>
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Text = styled.h5`
  font-family: var(--primary-font);
  font-size: 4.5rem;
  background: transparent;
  margin:0 
`

export default Login