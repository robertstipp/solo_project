import React from 'react'
import styled from 'styled-components'
const FavoriteArtist = ({artist ,index}) => {
  
  

    return (
    <Container>
      <Rank>
        {index + 1}
      </Rank>
      <Genre>
        {artist.name}
      </Genre>

    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns  : 5% 95% ;
  justify-content: center;
  align-items: center;
  gap: .45rem;
`
const Rank = styled.div`
  font-family: var(--primary-font);
  font-size: 3rem;
  justify-self: center;
`
const Genre = styled.div`
  font-family: var(--primary-font);
  font-size: 1.5rem;
  align-self: center;
`
export default FavoriteArtist