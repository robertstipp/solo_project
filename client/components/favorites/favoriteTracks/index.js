import React from 'react'
import FavoriteTrack from './favoriteTrack'
const FavoriteTracks = ({tracks}) => {
  return (
    <div>
      <h1>Favorite Tracks</h1>
      {tracks.map((track,index)=>{
        return <FavoriteTrack track={track} key={index} />
      })}
    </div>
  )
}

export default FavoriteTracks