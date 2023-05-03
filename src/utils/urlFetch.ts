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