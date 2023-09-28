import React from 'react'

import styled from 'styled-components'
import FavoriteTrack from './favoriteTrack'
const FavoriteTracks = ({tracks}) => {
  return (
    <Container>
      <Header>Favorite Tracks</Header>
      {tracks.map((track,index)=>{
        return <FavoriteTrack track={track} index={index} key={index} />
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: .25rem;
  /* border: 1px solid black; */
`
const Header = styled.div`
  font-family: var(--primary-font);
  font-size: 1.5rem;
  text-align: center;
  padding-bottom: 1rem;
  padding-top: 1rem;
`

export default FavoriteTracks