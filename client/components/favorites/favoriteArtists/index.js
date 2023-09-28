import React from 'react'
import styled from 'styled-components'
import FavoriteArtist from './favoriteArtist'

const FavoriteArtists = ({artists}) => {
  return (
    <Container>
      <Header>Favorite Genres</Header>
      {artists.map((artist,index)=>{
      return <FavoriteArtist key={index} artist={artist} index={index}/>
    })}
    </Container>
    
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
`
const Header = styled.div`
  font-family: var(--primary-font);
  font-size: 1.5rem;
  text-align: center;
  padding-bottom: 1rem;
  padding-top: 1rem;
`

export default FavoriteArtists