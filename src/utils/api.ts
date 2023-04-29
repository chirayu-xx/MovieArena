import axios from "axios";

const BASE_URL= "https://api.themoviedb.org/3";

const TMDB_TOKEN= process.env.NEXT_TMDB_TOKEN;
const apiKey = process.env.NEXT_PUBLIC_API_KEY; 


const headers = {
Authorization: "bearer " + 
TMDB_TOKEN,
};

export const fetchDataFromApi = async (url: string, params?: string) => {
    try {
    const fetchUrl = `${BASE_URL}${url}?api_key=${apiKey}`
    const { data } = await axios.get(fetchUrl, {
        headers,
        params,
    })
    return data;
} catch (err) {
    console.log(err);
    return err;
}
} 