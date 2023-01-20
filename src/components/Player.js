import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";

const { AiFillHeart, AiOutlineHeart, BsThreeDots } = icons;
const Player = () => {
  const { curSongId } = useSelector((state) => state.music);
  const [songInfo, setsongInfo] = useState(null);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const response = await apis.getDetailSong(curSongId);
      if (response.data.err === 0) {
        setsongInfo(response.data.data);
      }
      console.log(response);
    };
    fetchDetailSong();
  }, [curSongId]);

  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex-auto flex gap-3  items-center">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <sapn className="font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </sapn>
          <span className="text-gray-500 text-xs">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 pl-3">
          <sapn>
            <AiOutlineHeart size={16} />
          </sapn>
          <sapn>
            <BsThreeDots size={16} />
          </sapn>
        </div>
      </div>
      <div className="w-[40%] flex-auto">Player</div>
      <div className="w-[30%] flex-auto">Volumn</div>
    </div>
  );
};

export default Player;
