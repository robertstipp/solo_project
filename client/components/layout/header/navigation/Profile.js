import React, {useState} from 'react'

import styled from 'styled-components'

const Profile = () => {
  const [showModal, setShowModal] = useState(false)
  const [hovered, setIsHovered] = useState(false);
  return (
    <Container onClick={()=>showModal(true)}>Me</Container>
  )
}


const Container = styled.div`
  font-size: 1.25rem;
  text-transform: uppercase;
  font-family: var(--primary-font);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100px;
  height: 100px;
  /* border-radius: 50%; */
  border: 1px solid black;
  align-self: center;
  background-color: var(--primary-yellow);
`

export default Profile