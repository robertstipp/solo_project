import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import {useSelector} from 'react-redux'


const NowPlaying = () => {

  
  const {userInfo} = useSelector(state=>state.user)

  const [track, setTrack] = useState("...waiting")
  const [trackName, setTrackName] = useState("loading")
  const [imgUrl, setImgUrl] = useState(null)
  const [artistName, setArtistName] = useState(null)

  useEffect(() => {
    if (userInfo !== null) {
      const ws = new WebSocket(`ws://localhost:3000`);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      ws.send(userInfo.id)
    };

    

    ws.onmessage = (message) => {
      const {trackName, imgUrl, artistName} = JSON.parse(message.data)
      console.log(trackName, imgUrl, artistName)
      setTrackName(trackName)
      setImgUrl(imgUrl)
      setArtistName(artistName)
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
    <Container>
    <div>
    <TrackText>{trackName}</TrackText>
    <ArtistText>{artistName}</ArtistText>
    </div>
    
    <img src={imgUrl} alt="" />
    </Container>
    
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;
  justify-content: flex-start;
`

const TrackText = styled.div`
  font-family: var(--primary-font);
  font-size: 1.3rem;
`
const ArtistText = styled.div`
  font-family: var(--primary-font);
  font-size: .75rem;
`

export default NowPlaying

