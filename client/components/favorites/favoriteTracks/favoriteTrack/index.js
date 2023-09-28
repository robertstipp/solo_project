import { style } from 'd3'
import React from 'react'

import styled from 'styled-components'

const FavoriteTrack = ({track,index }) => {
  
  const artistString = track.album.artists.map((artist)=>artist.name).join(', ')
  return (
    <Container>
      <Rank>
        {index + 1}
      </Rank>
      <TrackInfo>
        <TrackName>{track.name}</TrackName>
        <ArtistName>{artistString}</ArtistName>
      </TrackInfo>
      
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns  : 5% 95% ;
  gap: .45rem;
  justify-content: center;
  align-items: center;
`
const Rank = styled.div`
  font-family: var(--primary-font);
  font-size: 3rem;
  justify-self: center;
`

const TrackInfo = styled.div`
  font-family: var(--primary-font);
  display: flex;
  flex-direction: column;
`

const TrackName = styled.div`
  font-size: 1.5rem;
`
const ArtistName = styled.div`
  font-size: .75rem;
`


export default FavoriteTrack