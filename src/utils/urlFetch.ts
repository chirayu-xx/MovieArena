
import { getGenres } from "../redux/features/homeSlice";
import { fetchDataFromApi } from "./api";

export const fetchImageUrl = async () => {
    const res = await fetchDataFromApi("/configuration");
    const url = {
      backdrop: res.images.secure_base_url + "original",
      poster: res.images.secure_base_url + "original",
      profile: res.images.secure_base_url + "original",
    };
    return url;
  };


  export const fetchGenres = async () => {
      let promises: Array<Object> = []
      let endpoints = ['tv', 'movie']
      let allGenres: any = {}
      endpoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`))
      })
      const data = await Promise.all(promises);
      //@ts-ignore
      data.map(({ genres }) => {
        return genres.map((item: any) => (allGenres[item.id] = item))
      })
     return allGenres
  }