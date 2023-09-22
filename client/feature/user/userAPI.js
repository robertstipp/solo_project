import axios from "axios";

// const baseURL = "https://fakestoreapi.com";

export const userAPI = {
  getUser: () => {
    return axios.get(`/api/auth/spotify/getUser`);
  }
};
