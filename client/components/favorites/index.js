import React from 'react'
import FavoriteTracks from './favoriteTracks'
import FavoriteGenres from './favoriteGenres'
import FavoriteArtists from './favoriteArtists'
const FavoriteList = ({artists, tracks, genres}) => {
  // console.log(artists)
  return (
    <div>
      <FavoriteTracks tracks={tracks} />
      <hr></hr>
      <FavoriteGenres genres={genres} />
      <hr></hr>
      <FavoriteArtists artists={artists} />
    </div>
  )
}

export default FavoriteList