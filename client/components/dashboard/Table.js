import React from 'react';
import styled from 'styled-components';
const Table = ({data}) => {
  const descriptions = {
    acousticness: 'A confidence measure from 0.0 to 1.0 of whether the track is acoustic.',
    danceability: 'Danceability describes how suitable a track is for dancing.',
    energy: 'Energy represents a perceptual measure of intensity and activity.',
    tempo: 'The overall estimated tempo of a track in beats per minute (BPM).',
    speechiness: 'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value.',
    valence: 'A measure describing the musical positiveness conveyed by a track.',
    instrumentalness: 'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context.',
    mode: 'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived.'


  }
  return (
    <Container>
      {Object.entries(data).map(([label,value])=>{
        return (
            <TableRow>
              <div>
              {label} <span>{value}</span>
              </div>
              <Description>
                {descriptions[label] || "sdf"}
              </Description>
            </TableRow>
        ) 
      })}
    </Container>
    
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  
`

const TableRow = styled.div`
  font-size: 2rem;
  font-family: var(--primary-font);


  span {
    color: var(--primary-red)
  }
`
const Description = styled.div`
  font-size: 1.25rem;
  font-family: var(--secondary-font);
`

export default Table