import React from 'react'

import styled, {css} from 'styled-components'

const TableRow = ({user}) => {
  const {
    displayName,
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
      <DisplayName>{displayName}</DisplayName>
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
const valueMixin = css`
  font-family: 'roboto';
  text-align: center;
`

const TableValue = styled.div`
  ${valueMixin}
  font-size: 2rem;
  font-family: 'roboto';
  color: ${({$value}) => {
    if ($value === 0) return 'black'
    if ($value < 0) return 'red'
    if ($value > 0) return 'green'
  }};
  /* width: ${({$hover}) => ($hover ? '0px' : '100px')}; */
`
const DisplayName = styled.div`
  ${valueMixin}
`
export default TableRow