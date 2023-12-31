import axios from "axios";

// const baseURL = "https://fakestoreapi.com";

export const userAPI = {
  getUser: () => {
    return axios.get(`/api/auth/spotify/getUser`);
  },
  getMe: () => {
    return axios.get(`/api/auth/spotify/getMe`)
  },
  getTopArtists: () => {
    return axios.get(`/api/auth/spotify/getTopArtists`)
  },
  getTopTracks: () => {
    return axios.get(`/api/auth/spotify/getTopTracks`)
  },
  getDailyTracks: () => {
    return axios.get(`/api/auth/spotify/getDailyTracks`)
  },
  getUserProfileAnalysis: () => {
    return axios.get(`/api/auth/spotify/getUserProfileAnalysis`)
  },
  getDistanceAnalysis: () => {
    return axios.get(`/api/auth/spotify/getDistanceAnalysis`)
  }
};
