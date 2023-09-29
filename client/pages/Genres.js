import React, {useEffect} from 'react'

import styled from 'styled-components';
import BarChart from '../components/charts/barChart';
import BubbleChart from '../components/charts/bubbleChart';
import {useDispatch, useSelector} from 'react-redux'

import {getMe, getTopGenres, getDailyTracks} from '../feature/user/userSlice'


const Genres = () => {

  const {genres} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  useEffect(()=>{
    if (genres.length === 0) {
      dispatch(getTopGenres())
    }
      // dispatch(getMe())
  },[])
  return (
    <Container>
      <GenreHeader>TOP GENRES</GenreHeader>
    {/* <button onClick={()=>dispatch(getTopGenres())}>Get Top Tracks</button> */}
    {genres.length !== 0  && <BubbleChart />}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
`
const GenreHeader = styled.div`
font-family : var(--primary-font);
font-size: 3.5rem;
align-self: center;
`

export default Genres