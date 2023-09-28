import React, {useEffect} from 'react'

import styled from 'styled-components'
import Track from './track'

const TrackList = ({tracks}) => {
  return (
    <Container>
      <Header>Recent Tracks</Header>
      <List>
      {tracks.length !== 0 && tracks.map((track,index)=>{
        return (
          <li key={index}>
            <Track track={track}></Track>
          </li>
          
        )
      })}
      </List>
      
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