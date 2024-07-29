import axios from "axios";

const BASE_URL= "https://api.themoviedb.org/3";

const TMDB_TOKEN= process.env.NEXT_TMDB_TOKEN;


const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const searchDataFromApi = async (url: string, params?: any) => {
    // console.log(params)
    try {

    const fetchUrl = `${BASE_URL}/${url}`
    console.log(url);
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