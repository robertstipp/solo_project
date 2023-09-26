import React, {useEffect} from 'react'
import styled from 'styled-components'


import { useDispatch, useSelector } from 'react-redux'
import NowPlaying from '../../../feature/nowplaying/NowPlaying'
import WebPlayback from '../../../feature/webplayback'

import { getUser } from '../../../feature/user/userSlice'

const Footer = () => {
  const {userCredentials} = useSelector(state=>state.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUser())
  },[])
  if (userCredentials !== null){
    console.log(userCredentials)
  }
  return (
    <Container>
      <FooterText>Made by Bobby.</FooterText>
      {/* {userCredentials?.accessToken && <WebPlayback token={userCredentials.accessToken} />} */}
      {/* <NowPlaying /> */}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between
`

const FooterText = styled.div`
  font-family: var(--primary-font);
  font-size: 1.3rem;
`



export default Footer