import { useState } from 'react';
import React from 'react'

import styled from 'styled-components';

const Track = ({track, playTrack,stopTrack}) => {
  const {trackName, artist, popularity, img} = track
  const [isHovered, setIsHovered] = useState(false)
  
  const firePopularity = '🔥'.repeat(Math.floor(Number(popularity) / 33)+1)
  const clipString = (string) => string.slice(0,15)+ `${string.length > 15 ? "..." : ""}` 
  
  return (
    <Container
      $hovered={isHovered}
      onMouseEnter={()=>{
        // playTrack(track.preview_url)
        // setIsHovered(true)
      }}
      onMouseOut={()=>{
        // stopTrack()
        // setIsHovered(false)
      }}
    >
      <TrackInfo $hovered={isHovered}>
        <TrackName>{clipString(trackName)} {firePopularity}</TrackName>
        <Artist>{artist}</Artist>
      </TrackInfo>
      {/* <TrackImage>
        <img src={img} alt={artist} />
      </TrackImage> */}
      
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  cursor: pointer;
  /* background-color: var(--primary-blue); */
  background-color: ${({$hovered}) => ($hovered ? 'red': 'white')}
`

const TrackInfo = styled.div`
  justify-self: flex-start;
  width: calc(100%);
  
`
const TrackName = styled.div`
  font-family: var(--primary-font);
  font-size: 1.25rem;
`

const Popularity = styled.div`
  width: 64px;
`

const Artist = styled.div`
  font-family: var(--primary-font);
  font-size: .75rem;
`

const TrackImage = styled.div`
  justify-self: flex-end;
`

export default Track