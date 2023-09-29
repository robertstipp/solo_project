import React, {useEffect} from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { getUserDistanceAnalysis } from '../feature/user/userSlice'

import TableRow from '../components/userdistance/TableRow'

const Find = () => {
  const dispatch = useDispatch();
  const {userDistances, loading,error} = useSelector(state=>state.user)
  useEffect(()=>{
    dispatch(getUserDistanceAnalysis());
  },[])

  return (
    <Container>
      <Header>Other Users</Header>
      <TableHeadingRow>
        <Label>Spotify</Label>
        <Label>Acoustic</Label>
        <Label>Dance</Label>
        <Label>Energy</Label>
        <Label>Tempo</Label>
        <Label>Speech</Label>
        <Label>Live</Label>
        <Label>Valence</Label>
        <Label>Instrumental</Label>
        <Label>Mode</Label>
        <Label>Distance</Label>
      </TableHeadingRow>
      {status === 'loading' && <p>Loading...</p>}
      { userDistances.length !== 0 &&
        userDistances.map((user)=>{
          return <TableRow user={user}/>
        })
      }
      
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  font-family : var(--primary-font);
  font-size: 3.5rem;
  align-self: center;
`

const TableHeadingRow = styled.div`
  display: grid;
  grid-template-columns: repeat(11,1fr);
`
const Label = styled.div`
  font-size: 1.5rem;
  font-family: var(--primary-font);
  align-self: center;
  text-align: center;
`

export default Find