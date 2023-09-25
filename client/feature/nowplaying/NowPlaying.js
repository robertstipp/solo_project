import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import {useSelector} from 'react-redux'


const NowPlaying = () => {

  
  const {userInfo} = useSelector(state=>state.user)

  const [track, setTrack] = useState("...waiting")

  useEffect(() => {
    if (userInfo !== null) {
      const ws = new WebSocket(`ws://localhost:3000`);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      ws.send(userInfo.id)
    };

    

    ws.onmessage = (message) => {

      setTrack(message.data)
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };

    }
    
  }, [userInfo]);
  return (
    <NowPlayingText>{track}</NowPlayingText>
  )
}

const NowPlayingText = styled.div`
  font-family: var(--primary-font);
  font-size: 4.3rem;
`

export default NowPlaying

