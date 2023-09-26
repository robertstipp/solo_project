import React from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux'
import NowPlaying from '../../../feature/nowplaying/NowPlaying'
import WebPlayback from '../../webplayback'


const Footer = () => {
  const {userInfo} = useSelector(state=>state.user)
  console.log(userInfo)
  return (
    <Container>
      <FooterText>Made by Bobby.</FooterText>
      <WebPlayback token='BQCf7uLaBt0P_D5wy5r-BooCX7vD6CQnONfBRnZb04uAiLyMcwxjGzpfeDGm7b0R514VKwZxJlaF-cj2gWpoZT8cBH_0NQ6A9JPfSBgbuKFdXY19h-dAQP21dB0eE4oD6ELJ6v1Zag3Fkux3-R0JQzEIkzgF8Ef6mUalmVt1ZmEdKE6-bj1C572sITCEGLKWRcOMChuzANMl1pYP_XAVRjpcysw' />
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