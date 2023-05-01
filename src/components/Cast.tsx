import React from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Img } from "./LazyLoadImage";

type Props = {
    data: any,
    loading: boolean,
}

const Cast = ({data, loading}: Props) => {
    const url: any = useSelector((state: RootState) => state.home.url);

  return (
    <div>
        {/* contentwrapper */}
        <div>Top Cast</div>
        {!loading ? (
            <div>
                {data?.map((item: any) => {
                    let imgUrl = item.profile_path
                        ? url.profile + item.profile_path
                        : "";
                    return (
                        <div key={item.id}>
                            <div>
                                <Img src={imgUrl} />
                            </div>
                            <div>{item.name}</div>
                            <div>{item.character}</div>
                        </div>
                    )
                })}
            </div>
        )  : (
            // sk
            <div>
        
            </div>
        )}
    </div>
  )
}

export default Cast