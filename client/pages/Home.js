import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Welcome from '../components/welcome'
import TrackList from '../components/tracklist'

import Favorites from '../components/favorites'

import {useDispatch, useSelector} from 'react-redux'

import {getMe, getTopGenres, getDailyTracks, getTopTracks} from '../feature/user/userSlice'

const Home = () => {
  const dispatch = useDispatch();
  const { genres, dailyTracks,topArtists, topTracks, topGenres, status, error } = useSelector(state => state.user);
  
  useEffect(()=>{
    dispatch(getMe())
    dispatch(getDailyTracks())
    dispatch(getTopGenres())
    dispatch(getTopTracks())
  },[])
  return (
    <Container>
      <Column>
        {/* <Welcome message="Welcome to your profile" name='Bobby'/> */}
        <Favorites 
          artists={topArtists}
          tracks={topTracks}
          genres={topGenres}
        />
      </Column>
      <Column>
        {/* <div>
          {genres && genres.map((genre,index)=>{
          return <Genre key={index}>{genre}</Genre>
        })}
        </div> */}
        <div>

        {dailyTracks && <TrackList tracks={dailyTracks}/>}
        {/* {dailyTracks && dailyTracks.map((track,index)=>{  
          return <Track key={index}>{track}, </Track>
          })} */}
        </div>

      </Column>
      {/* <Column>
        <button onClick={()=>dispatch(getMe())}>Get Me</button>
        <button onClick={()=>dispatch(getTopGenres())}>Get Top Genres</button>
      </Column> */}
  
    </Container> 
  )
}

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: flex-start;
  grid-template-columns: 1fr 2fr;
`
const Column = styled.div`

`
const Genre = styled.div`
  display: inline;
`
const Track = styled.div`
  display: inline;
`

export default Home