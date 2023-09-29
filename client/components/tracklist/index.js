import React, {useEffect, useRef} from 'react'

import styled from 'styled-components'
import Track from './track'

const TrackList = ({tracks}) => {
  const audioRef = useRef(null);

  const playPreview = (url) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().catch(error=>{
        console.log(`Error playing audio`, error)
      })
    }
  }

  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0;
    }
  }

  return (
    <Container>
      <Header>Recent Tracks</Header>
      <List>
      {tracks.length !== 0 && tracks.map((track,index)=>{
        return (
          <li key={index} >
            <Track 
              track={track} 
              playTrack = {playPreview}
              stopTrack = {stopPreview}
            ></Track>
          </li>
          
        )
      })}
      </List>
      <audio ref={audioRef}>
        <source src="" type='audio/mpeg' />
      </audio>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
  list-style-type: none;

`

const Header = styled.div`
  font-family: var(--primary-font);
  font-size: 2rem;
  text-align: center;
`
export default TrackList