"use client";

import { useDispatch } from "react-redux";
import { getApiConfiguration } from "../redux/features/homeSlice";
import { fetchDataFromApi } from "../utils/api";
import { useEffect } from "react";

const FetchImageUrl = ()=> {

    const dispatch = useDispatch();
    
    const fetch = () => {
        fetchDataFromApi("/configuration").then((res) => {
            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            }
            dispatch(getApiConfiguration(url));
        });
    };
    useEffect(() => {
        fetch()
    }, [])
}

export default FetchImageUrl