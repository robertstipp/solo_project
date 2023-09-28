import React from 'react'

const FavoriteTrack = ({track}) => {
  console.log(track)
  return (
    <div>{track.name}</div>
  )
}

export default FavoriteTrack