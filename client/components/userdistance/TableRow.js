import React from 'react'

import styled from 'styled-components'

const TableRow = ({user}) => {
  const {
    spotifyId,
    deldanceability,
    deltempo,
    delacousticness,
    delenergy,
    delspeechiness,
    delvalence,
    delinstrumentalness,
    delliveness,
    delmode,
    distance,
  } = user
  const roundTwo = (number) => Math.floor(number*100) / 100
  return (
    <TableRowContainer>
      <TableValue>{spotifyId.slice(-4)}</TableValue>
      <TableValue $value={delacousticness}>{roundTwo(delacousticness)}</TableValue>
      <TableValue $value={deldanceability}>{roundTwo(deldanceability)}</TableValue>
      <TableValue $value={delenergy}>{roundTwo(delenergy)}</TableValue>
      <TableValue $value={deltempo}>{roundTwo(deltempo)}</TableValue>
      <TableValue $value={delspeechiness}>{roundTwo(delspeechiness)}</TableValue>
      <TableValue $value={delvalence}>{roundTwo(delvalence)}</TableValue>
      <TableValue $value={delinstrumentalness}>{roundTwo(delinstrumentalness)}</TableValue>
      <TableValue $value={delliveness}>{roundTwo(delliveness)}</TableValue>
      <TableValue $value={delmode}>{roundTwo(delmode)}</TableValue>
      <TableValue>{roundTwo(distance)}</TableValue>
    </TableRowContainer>
  )
}


const TableRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(11,1fr);
  align-items: center;
  justify-content: center;
`
const TableValue = styled.div`
  font-family: 1rem;
  text-align: center;
  font-size: 2rem;
  font-family: 'roboto';
  color: ${({$value}) => {
    if ($value === 0) return 'black'
    if ($value < 0) return 'red'
    if ($value > 0) return 'green'
  }};
  /* width: ${({$hover}) => ($hover ? '0px' : '100px')}; */
`
export default TableRow