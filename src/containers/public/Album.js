import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment/moment";
import { Lists, AudioLoading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions"
import icons from "../../ultis/icons";

const { BsFillPlayFill } = icons
const Album = () => {
  const location = useLocation()
  const { isPlaying } = useSelector((state) => state.music);
  const { title, pid } = useParams();
  const [playlistData, setplaylistData] = useState({});
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid))
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true));
      const response = await apis.apiGetDetailPlaylist(pid);
      dispatch(actions.loading(false))
      if (response?.data.err === 0) {
        setplaylistData(response.data?.data);
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items))
      }
    };
    fetchDetailPlaylist();
  }, [pid]);

  useEffect(() => {
    if(location.state?.playAlbum){
      const randomSong = Math.round(Math.random() * playlistData?.song?.items?.length) - 1
      dispatch(actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId))
      dispatch(actions.play(true))
    }
  }, [pid, playlistData])
  return (
    <div className="flex gap-8 w-full h-full px-[59px] mb-40 relative">
      <div className="flex-none w-1/4 border border-red-500 flex flex-col items-center gap-2">
        <div className="w-full relative">
          <img
            src={playlistData?.thumbnailM}
            className={`${isPlaying ? 'rounded-full animate-rotate-center' : 'rounded-md animate-rotate-center-pause'} w-full object-contain shadow-md`}
          />
          <div className={`${isPlaying && 'hover:rounded-full'} absolute left-0 right-0 top-0 bottom-0 hover:bg-overplay-30 cursor-pointer text-white flex items-center justify-center`}>
            <span className="p-2 border border-white rounded-full">
               { isPlaying ? <AudioLoading /> : <BsFillPlayFill  size={30}/>}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-[18px] font-bold text-gray-800 text-center">
            {playlistData?.title}
          </h3>
          <span className="flex gap-2 items-center text-gray-500 text-[13px]">
            <span>Cập nhật:</span>
            <span>
              {moment
                .unix(playlistData?.contentLastUpdate)
                .format("DD/MM/YYYY")}
            </span>
          </span>
          <span className="flex gap-2 text-center items-center justify-center text-gray-500 text-[13px]">
            {playlistData?.artistsNames}
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-[13px]">{`${playlistData?.like} người yêu thích`}</span>
        </div>
      </div>
        <div className="flex-auto border border-blue-500">
          <span className="text-sm">
            <span className="text-gray-600">Lời tựa </span>
            <span>{playlistData?.sortDescription}</span>
          </span>
          <Lists
            totalDuration={playlistData?.song?.totalDuration}
          />
        </div>
    </div>
  );
};

export default Album;
