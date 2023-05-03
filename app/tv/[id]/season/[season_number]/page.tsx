"use client";
import useFetch from '@/hooks/useFetch';
import SeasonBanner from '@/src/components/SeasonList/SeasonBanner';
import { getApiConfiguration } from '@/src/redux/features/homeSlice';
import { fetchImageUrl } from '@/src/utils/urlFetch';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';



type Props = {}

const Seasonpage = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchImageData = async () => {
      const url = await fetchImageUrl();
      dispatch(getApiConfiguration(url));
    };
    fetchImageData();
  }, []);
  const {id, season_number} = useParams();
  const { data, loading } = useFetch(`/tv/${id}/season/${season_number}`);
  console.log(data);
  return (
    <div className = 'min-h-screen'>
        <SeasonBanner loading = {loading} data = {data} />
    </div>
  )
}

export default Seasonpage