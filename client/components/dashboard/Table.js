import React from 'react';
import styled from 'styled-components';
const Table = ({data}) => {
  console.log(Object.entries(data))
  return (
    <Container>
      {Object.entries(data).map(([label,value])=>{
        return (
            <TableRow>
              {label} <span>{value}</span>
            </TableRow>
        ) 
      })}
    </Container>
    
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 80%;
  
`

const TableRow = styled.div`
  font-size: 2.2rem;
  font-family: var(--primary-font);


  span {
    color: var(--primary-red)
  }
`

export default Table